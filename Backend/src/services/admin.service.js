import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import AppError from "../utils/AppError.js";
import { sanitizeParam } from "../utils/SanitizeParam.js";

export const addEmployeeService = async (employeeData) => {
  const existingUser = await User.findOne({ email: employeeData.email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }

  const user = new User(employeeData);
  await user.save();

  return {
    user: user.toSafeObject(),
  };
};


export const getAllEmployeeService = async ({
  page = 1,
  limit = 10,
  search = "",
  department = "",
  status = "",
} = {}) => {
  const skip = (page - 1) * limit;

  const cleanSearch = sanitizeParam(search);
  const cleanDepartment = sanitizeParam(department).toLowerCase();
  const cleanStatus = sanitizeParam(status).toLowerCase();

  // Base query for employee role
  const query = { role: "employee" };

  // Filter by department (developer, designer, manager, marketer, common)
  // Ignore if "all", "all departments", or empty
  if (
    cleanDepartment &&
    cleanDepartment !== "all" &&
    cleanDepartment !== "all departments"
  ) {
    query.department = cleanDepartment;
  }

  // Filter by status (active, inactive)
  // Ignore if "all", "status: all", or empty
  if (
    cleanStatus &&
    cleanStatus !== "all" &&
    cleanStatus !== "status: all"
  ) {
    query.status = cleanStatus;
  }

  // Search by name or email
  if (cleanSearch) {
    const searchRegex = new RegExp(cleanSearch, "i");
    query.$or = [{ name: searchRegex }, { email: searchRegex }];
  }
  // Compute twoWeeksAgo upfront (synchronous)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const totalStart = performance.now();

  // Run all DB queries in parallel via Promise.all
  const [employees, totalEmployees, activeEmployees, newEmployees] =
    await Promise.all([
      (async () => {
        const start = performance.now();
        const result = await User.find(query).skip(skip).limit(limit);
        console.log(`⏱ Find employees: ${(performance.now() - start).toFixed(2)} ms`);
        return result;
      })(),
      (async () => {
        const start = performance.now();
        const result = await User.countDocuments(query);
        console.log(`⏱ Count total employees: ${(performance.now() - start).toFixed(2)} ms`);
        return result;
      })(),
      (async () => {
        const start = performance.now();
        const result = await User.countDocuments({ role: "employee", status: "active" });
        console.log(`⏱ Count active employees: ${(performance.now() - start).toFixed(2)} ms`);
        return result;
      })(),
      (async () => {
        const start = performance.now();
        const result = await User.countDocuments({
          role: "employee",
          createdAt: { $gte: twoWeeksAgo },
        });
        console.log(`⏱ Count new employees: ${(performance.now() - start).toFixed(2)} ms`);
        return result;
      })(),
    ]);

  const inactiveEmployees = totalEmployees - activeEmployees;

  console.log(`⏱ Total (Promise.all): ${(performance.now() - totalStart).toFixed(2)} ms`);

  return {
    employees,
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    newEmployees,
    totalPages: Math.ceil(totalEmployees / limit) || 1,
    currentPage: page,
  };
};
export const editEmployeeService = async (employeeId, employeeData) => {
  const updatedEmployee = await User.findByIdAndUpdate(employeeId, employeeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployee) {
    throw new AppError("Employee not found", 404);
  }

  return {
    employee: updatedEmployee.toSafeObject(),
  };
};
export const deleteEmployeeService = async (employeeId) => {
  const deleted = await User.findByIdAndDelete(employeeId);
  if (!deleted) {
    throw new AppError("Employee not found", 404);
  }

  return true;
};
export const MarkActiveInactiveService = async (employeeId, status) => {
  const updatedEmployee = await User.findByIdAndUpdate(employeeId, { status }, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployee) {
    throw new AppError("Employee not found", 404);
  }

  return {
    employee: updatedEmployee.toSafeObject(),
  };
}

export const getDepartmentService = async () => {
  const departmentsMeta = [
    {
      id: "common",
      name: "Common",
      path: "/DEPARTMENTS/COMMON",
      cluster: "CLUSTER ALPHA",
      description:
        "Cross-functional baseline operations, general staff alignment, and shared organizational resources.",
      icon: "Network",
      theme: "slate",
    },
    {
      id: "developer",
      name: "Developer",
      path: "/DEPARTMENTS/DEVELOPER",
      cluster: "PRIMARY ENGINEERING",
      description:
        "Software engineering, cloud infrastructure, security pipelines, and platform architecture.",
      icon: "Terminal",
      theme: "emerald",
    },
    {
      id: "designer",
      name: "Designer",
      path: "/DEPARTMENTS/DESIGNER",
      cluster: "CREATIVE SUITE",
      description:
        "Product design systems, UI/UX architecture, design research, and visual brand identity.",
      icon: "Palette",
      theme: "amber",
    },
    {
      id: "manager",
      name: "Manager",
      path: "/DEPARTMENTS/MANAGER",
      cluster: "LEADERSHIP NODE",
      description:
        "Operational leadership, resource planning, executive alignment, and performance governance.",
      icon: "Building2",
      theme: "indigo",
    },
    {
      id: "marketer",
      name: "Marketer",
      path: "/DEPARTMENTS/MARKETER",
      cluster: "OUTREACH DIVISION",
      description:
        "Growth strategy, brand communications, market positioning, and enterprise outreach.",
      icon: "Megaphone",
      theme: "orange",
    },
  ];

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Run aggregation + newThisMonth in parallel (2 queries instead of 4)
  const [aggregation, newThisMonth] = await Promise.all([
    User.aggregate([
      { $match: { role: "employee" } },
      {
        $group: {
          _id: { department: "$department", status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]),
    User.countDocuments({
      role: "employee",
      createdAt: { $gte: startOfMonth },
    }),
  ]);

  // Derive totalEmployees & activeEmployees from the aggregation (no extra queries)
  let totalEmployees = 0;
  let activeEmployees = 0;
  aggregation.forEach((item) => {
    totalEmployees += item.count;
    if ((item._id.status || "").toLowerCase() === "active") {
      activeEmployees += item.count;
    }
  });

  const departmentCounts = {};
  departmentsMeta.forEach((dept) => {
    departmentCounts[dept.id] = { total: 0, active: 0 };
  });

  aggregation.forEach((item) => {
    const dept = (item._id.department || "").toLowerCase();
    const status = (item._id.status || "").toLowerCase();
    if (departmentCounts[dept]) {
      departmentCounts[dept].total += item.count;
      if (status === "active") {
        departmentCounts[dept].active += item.count;
      }
    }
  });

  const departments = departmentsMeta.map((dept) => {
    const counts = departmentCounts[dept.id] || { total: 0, active: 0 };
    const onlineRatio =
      counts.total > 0 ? Math.round((counts.active / counts.total) * 100) : 0;
    return {
      ...dept,
      membersCount: counts.total,
      activeCount: counts.active,
      onlineRatio: `${onlineRatio}%`,
      onlineRatioNumber: onlineRatio,
      staffAllocationRatio: `${counts.active} / ${counts.total}`,
    };
  });

  const activeRate =
    totalEmployees > 0
      ? ((activeEmployees / totalEmployees) * 100).toFixed(1)
      : "0.0";
  const configuredUnits = departments.length;
  const averageTeamSize =
    configuredUnits > 0
      ? (totalEmployees / configuredUnits).toFixed(1)
      : "0.0";

  return {
    metrics: {
      totalEmployees,
      newThisMonth,
      activeEmployees,
      activeRate: `${activeRate}%`,
      configuredUnits,
      averageTeamSize,
    },
    departments,
  };
};

export const GetDepartmentDetailService = async (department) => {
  const employees = await User.find({ department: department });
  const totalEmployees = employees.length;

  // Single pass instead of two separate .filter() iterations
  let activeEmployees = 0;
  let inactiveEmployees = 0;
  for (const employee of employees) {
    if (employee.status === "active") activeEmployees++;
    else if (employee.status === "inactive") inactiveEmployees++;
  }

  const activeRate = totalEmployees > 0 ? ((activeEmployees / totalEmployees) * 100).toFixed(1) : "0.0";
  const configuredUnits = employees.length;
  const averageTeamSize = configuredUnits > 0 ? (totalEmployees / configuredUnits).toFixed(1) : "0.0";
  return {
    metrics: {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      activeRate,
      configuredUnits,
      averageTeamSize,
    },
    employees,
  };
};

export const getAllTaskService = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
  assignedTo = "",
} = {}) => {
  const skip = (page - 1) * limit;

  const cleanSearch = sanitizeParam(search);
  const cleanStatus = sanitizeParam(status).toLowerCase();
  const cleanPriority = sanitizeParam(priority).toLowerCase();
  const cleanAssignedTo = sanitizeParam(assignedTo);

  const query = {};

  if (cleanStatus && cleanStatus !== "all" && cleanStatus !== "status: all") {
    query.status = cleanStatus;
  }

  if (cleanPriority && cleanPriority !== "all" && cleanPriority !== "priority: all") {
    query.priority = cleanPriority;
  }

  if (cleanAssignedTo && cleanAssignedTo !== "all") {
    query.assignedTo = cleanAssignedTo;
  }

  if (cleanSearch) {
    const searchRegex = new RegExp(cleanSearch, "i");
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  // Run all queries in parallel (2 DB calls instead of 5)
  const [tasks, totalTasks, statusMetrics] = await Promise.all([
    Task.find(query)
      .populate("assignedTo", "name email avatar department role")
      .populate("assignedBy", "name email avatar role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
    // Single aggregate replaces 3 separate countDocuments
    Task.aggregate([
      { $match: { status: { $in: ["todo", "in-progress", "completed"] } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  // Build metrics from aggregation result
  const metricsMap = {};
  statusMetrics.forEach((item) => { metricsMap[item._id] = item.count; });

  return {
    tasks,
    totalTasks,
    metrics: {
      todo: metricsMap["todo"] || 0,
      inProgress: metricsMap["in-progress"] || 0,
      completed: metricsMap["completed"] || 0,
    },
    totalPages: Math.ceil(totalTasks / limit) || 1,
    currentPage: page,
  };
};

export const createTaskService = async (taskData, adminId) => {
  const { title, description, assignedTo, priority, dueDate } = taskData;

  if (!title) {
    throw new AppError("Task title is required", 400);
  }

  if (!assignedTo) {
    throw new AppError("Assigned employee is required", 400);
  }

  // exists() is lighter than findById — returns only _id or null
  const employeeExists = await User.exists({ _id: assignedTo });
  if (!employeeExists) {
    throw new AppError("Assigned employee not found", 404);
  }

  const newTask = await Task.create({
    title,
    description: description || "",
    assignedTo,
    assignedBy: adminId,
    priority: priority || "medium",
    dueDate: dueDate || null,
  });

  // Populate on the created doc instead of re-querying by _id
  await newTask.populate("assignedTo", "name email avatar department role");
  await newTask.populate("assignedBy", "name email avatar role");

  return newTask;
};

export const updateTaskService = async (taskId, updateData) => {
  // Validate assignedTo exists if provided (lightweight exists check)
  if (updateData.assignedTo) {
    const employeeExists = await User.exists({ _id: updateData.assignedTo });
    if (!employeeExists) {
      throw new AppError("Assigned employee not found", 404);
    }
  }

  // findByIdAndUpdate returns null if not found — no need for separate findById
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("assignedTo", "name email avatar department role")
    .populate("assignedBy", "name email avatar role");

  if (!updatedTask) {
    throw new AppError("Task not found", 404);
  }

  return updatedTask;
};

export const deleteTaskService = async (taskId) => {
  const deleted = await Task.findByIdAndDelete(taskId);
  if (!deleted) {
    throw new AppError("Task not found", 404);
  }

  return { message: "Task deleted successfully" };
};