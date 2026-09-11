export const CHAT_CHANNELS = [
  {
    id: "general",
    name: "general",
    path: "/dashboard/chat",
    aliasPath: "/dashboard/chat/general",
    isPublic: true,
    department: "common",
    badge: "Public Channel",
    subtitle: "General team alignment, updates, and workspace discussions",
    purpose:
      "General enterprise workspace stream for cross-departmental alignment, executive updates, and high-level announcements.",
    pinnedItems: [
      { title: "Q3 Executive Guidelines", meta: "Pinned by Marcus Vance • Sep 01" },
      { title: "Workspace Security Protocol v4", meta: "Pinned by Elena Rostova • Sep 05" },
    ],
    participants: [
      { name: "Aman Sahu", role: "You", tag: "Admin", initials: "AS", active: true },
      { name: "Marcus Vance", role: "Executive Lead", initials: "MV", active: true },
      { name: "Elena Rostova", role: "Design Director", initials: "ER", active: true },
      { name: "David Kim", role: "Away", initials: "DK", active: false },
    ],
  },
  {
    id: "announcements",
    name: "announcements",
    path: "/dashboard/chat/announcements",
    isPublic: true,
    department: "common",
    badge: "Broadcast Channel",
    subtitle: "Official company-wide announcements, policy updates, and broadcast alerts",
    purpose:
      "Dedicated channel for leadership announcements, major company events, milestone celebrations, and urgent workspace broadcasts.",
    pinnedItems: [
      { title: "Annual Town Hall Schedule 2026", meta: "Pinned by HR Team • Sep 10" },
      { title: "New Leave & Holiday Policy v2", meta: "Pinned by Operations • Sep 02" },
    ],
    participants: [
      { name: "Leadership Desk", role: "Announcements Bot", tag: "Broadcast", initials: "LD", active: true },
      { name: "Aman Sahu", role: "Admin", tag: "Admin", initials: "AS", active: true },
      { name: "Sarah Jenkins", role: "HR Operations", initials: "SJ", active: true },
    ],
  },
  {
    id: "managers",
    name: "managers",
    path: "/dashboard/chat/managers",
    isPublic: false,
    department: "manager",
    badge: "Management Dept",
    subtitle: "Resource planning, cross-team syncs, timeline tracking, and leadership strategy",
    purpose:
      "Private workspace for project managers and department leads to coordinate roadmaps, budgets, sprint goals, and resource allocation.",
    pinnedItems: [
      { title: "Q4 Budget & Headcount Review", meta: "Pinned by VP Operations • Sep 08" },
      { title: "Cross-Functional Sprint Velocity Tracker", meta: "Pinned by Lead PM • Sep 04" },
    ],
    participants: [
      { name: "Marcus Vance", role: "Engineering Manager", tag: "Manager", initials: "MV", active: true },
      { name: "Rachel Adams", role: "Product Manager", tag: "Manager", initials: "RA", active: true },
      { name: "Aman Sahu", role: "Admin", tag: "Admin", initials: "AS", active: true },
      { name: "Kevin Patel", role: "Operations Lead", tag: "Manager", initials: "KP", active: true },
    ],
  },
  {
    id: "marketers",
    name: "marketers",
    path: "/dashboard/chat/marketers",
    isPublic: false,
    department: "marketer",
    badge: "Marketing Dept",
    subtitle: "Campaign launches, growth metrics, branding strategy, and content planning",
    purpose:
      "Marketing hub for coordinating outbound campaigns, growth marketing, social schedules, brand assets, and analytics reports.",
    pinnedItems: [
      { title: "Q3 Growth Campaign - Conversion Metrics", meta: "Pinned by Growth Lead • Sep 07" },
      { title: "Product Launch Press Release Draft", meta: "Pinned by Content Lead • Sep 06" },
    ],
    participants: [
      { name: "Chloe Bennett", role: "Marketing Director", tag: "Marketing", initials: "CB", active: true },
      { name: "Sam Wilson", role: "Content Strategist", tag: "Marketing", initials: "SW", active: true },
      { name: "Aman Sahu", role: "Admin", tag: "Admin", initials: "AS", active: true },
      { name: "Jessica Taylor", role: "Growth Marketer", initials: "JT", active: false },
    ],
  },
  {
    id: "developers",
    name: "developers",
    path: "/dashboard/chat/developers",
    isPublic: false,
    department: "developer",
    badge: "Engineering Dept",
    subtitle: "Technical discussions, PR reviews, architecture decisions, and sprint collaboration",
    purpose:
      "Engineering space for sprint syncs, code reviews, architectural decisions, CI/CD pipeline alerts, and API design discussions.",
    pinnedItems: [
      { title: "Production Deployment Checklist v3", meta: "Pinned by Tech Lead • Sep 09" },
      { title: "API Gateway Microservice Migration Docs", meta: "Pinned by Backend Architect • Sep 03" },
    ],
    participants: [
      { name: "Alex Mercer", role: "Full Stack Engineer", tag: "Dev", initials: "AM", active: true },
      { name: "Priya Sharma", role: "Frontend Lead", tag: "Dev", initials: "PS", active: true },
      { name: "Aman Sahu", role: "Admin", tag: "Admin", initials: "AS", active: true },
      { name: "Liam O'Connor", role: "DevOps Engineer", tag: "Dev", initials: "LO", active: true },
    ],
  },
  {
    id: "designers",
    name: "designers",
    path: "/dashboard/chat/designers",
    isPublic: false,
    department: "designer",
    badge: "Design Dept",
    subtitle: "UI/UX design critiques, asset syncs, design system updates, and prototypes",
    purpose:
      "Creative hub for design iterations, user research sharing, Figma prototype critiques, and design system governance.",
    pinnedItems: [
      { title: "Design System 2.0 Figma Token Spec", meta: "Pinned by Design Director • Sep 09" },
      { title: "User Persona Research & Usability Findings", meta: "Pinned by UX Researcher • Sep 01" },
    ],
    participants: [
      { name: "Elena Rostova", role: "Design Director", tag: "Design", initials: "ER", active: true },
      { name: "Maya Lin", role: "UI/UX Designer", tag: "Design", initials: "ML", active: true },
      { name: "Aman Sahu", role: "Admin", tag: "Admin", initials: "AS", active: true },
      { name: "Oliver Queen", role: "Brand Designer", tag: "Design", initials: "OQ", active: false },
    ],
  },
];

export const canAccessChannel = (channel, employee) => {
  if (!channel) return false;
  if (channel.isPublic) return true;

  const user =
    employee?.user ||
    employee?.data?.user ||
    employee?.employee?.user ||
    employee ||
    {};

  const role = (user?.role || "").toLowerCase();
  const department = (user?.department || "").toLowerCase();

  // Admin has access to all channels
  if (role === "admin") return true;

  // Department match
  return channel.department.toLowerCase() === department;
};
