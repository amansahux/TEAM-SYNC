import User from "../models/user.model.js";
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

  const employees = await User.find(query)
    .skip(skip)
    .limit(limit);

  const totalEmployees = await User.countDocuments(query);
  const activeEmployees = await User.countDocuments({ role: "employee", status: "active" });
  const inactiveEmployees = totalEmployees - activeEmployees
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const newEmployees = await User.countDocuments({
    role: "employee",
    createdAt: { $gte: twoWeeksAgo },
  });

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
  const existingEmployee = await User.findById(employeeId);
  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  const updatedEmployee = await User.findByIdAndUpdate(employeeId, employeeData, {
    new: true,
    runValidators: true,
  });

  return {
    employee: updatedEmployee.toSafeObject(),
  };
};
export const deleteEmployeeService = async (employeeId) => {
  const existingEmployee = await User.findById(employeeId);
  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  await User.findByIdAndDelete(employeeId);

  return true;
};
export const MarkActiveInactiveService = async (employeeId, status) => {
  const existingEmployee = await User.findById(employeeId);
  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  const updatedEmployee = await User.findByIdAndUpdate(employeeId, { status }, {
    new: true,
    runValidators: true,
  });

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

  const aggregation = await User.aggregate([
    { $match: { role: "employee" } },
    {
      $group: {
        _id: { department: "$department", status: "$status" },
        count: { $sum: 1 },
      },
    },
  ]);

  const totalEmployees = await User.countDocuments({ role: "employee" });
  const activeEmployees = await User.countDocuments({
    role: "employee",
    status: "active",
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const newThisMonth = await User.countDocuments({
    role: "employee",
    createdAt: { $gte: startOfMonth },
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
  const activeEmployees = employees.filter((employee) =>   employee.status === "active").length;
  const inactiveEmployees = employees.filter((employee) => employee.status === "inactive").length;
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

export const getAllTaskService = async () => {
}

export const createTaskService = async () => {

}
export const updateTaskService = async () => {

}
export const deleteTaskService = async () => {

}