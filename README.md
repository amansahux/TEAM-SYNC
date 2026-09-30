# TEAM SYNC

> **TEAM SYNC** is a personal MERN-stack employee management and team
> collaboration project.\
> It is **not a SaaS product**. The project is built as a practical
> full-stack application to demonstrate authentication, role-based
> authorization, employee management, departments, real-time
> communication, task management, file attachments, and modern React
> state/server-state architecture.

# 🔑 Demo Credentials

> These credentials are intentionally documented because TEAM SYNC is a
> **personal project/demo application**, not a production SaaS system.

### Admin

``` text
Email:    aman@gmail.com
Password: 12345678
Role:     admin
```

### Employee

``` text
Email:    smriti@gmail.com
Password: 12345678
Role:     employee
```

------------------------------------------------------------------------

## 📌 Project Overview

TEAM SYNC is an internal employee collaboration and management platform
with two primary roles:

-   **Admin**
-   **Employee**

The Admin manages the organization, employees, departments, and tasks.

Employees have a personal workspace where they can view their assigned
tasks, update task status, communicate through real-time channels, and
manage their own profile/security settings.

The application follows a clear separation between:

``` text
Frontend
    ↓
React Feature Modules
    ↓
REST APIs + Socket.IO
    ↓
Express Backend
    ↓
Controllers → Services → Models
    ↓
MongoDB
```

------------------------------------------------------------------------

# 🏗️ High-Level Architecture

``` mermaid
flowchart TB
    U[User / Browser]

    subgraph FE["Frontend - React"]
        APP[App Shell]
        AUTH[Auth Module]
        ADMIN[Admin Module]
        EMP[Employee Module]
        CHAT[Chats Module]
        SETTINGS[Settings]
        SHARED[Shared Layer]
    end

    subgraph BE["Backend - Node.js + Express"]
        ROUTES[Routes]
        MW[Middlewares]
        CTRL[Controllers]
        SERVICE[Services]
        MODEL[Mongoose Models]
        SOCKET[Socket.IO Layer]
        VALIDATE[Validators]
        CONFIG[Config / Storage]
    end

    DB[(MongoDB)]
    STORAGE[(File Storage)]

    U --> APP
    APP --> AUTH
    APP --> ADMIN
    APP --> EMP
    APP --> CHAT
    APP --> SETTINGS
    APP --> SHARED

    AUTH -->|REST / HTTP| ROUTES
    ADMIN -->|REST / HTTP| ROUTES
    EMP -->|REST / HTTP| ROUTES
    CHAT -->|REST / HTTP| ROUTES
    CHAT -->|WebSocket| SOCKET
    SETTINGS -->|REST / HTTP| ROUTES

    ROUTES --> MW
    MW --> VALIDATE
    MW --> CTRL
    CTRL --> SERVICE
    SERVICE --> MODEL
    MODEL --> DB

    SOCKET --> SERVICE
    CHAT -->|File Upload| STORAGE
    ROUTES --> CONFIG
```

------------------------------------------------------------------------

# 🔄 Complete End-to-End Request Flow

A normal authenticated REST request follows:

``` text
User Action
    ↓
React Component
    ↓
Feature Hook / Mutation
    ↓
API Function
    ↓
Axios Instance
    ↓
Express Route
    ↓
Authentication Middleware
    ↓
Role Authorization Middleware (when required)
    ↓
Validation Middleware (when required)
    ↓
Controller
    ↓
Service Layer
    ↓
Mongoose Model
    ↓
MongoDB
    ↓
Service
    ↓
Controller
    ↓
HTTP Response
    ↓
TanStack Query Cache Update / Refetch
    ↓
React UI Update
```

For real-time chat:

``` text
User types message
    ↓
React Chat UI
    ↓
Socket.IO Client
    ↓
message:send
    ↓
Socket Authentication
    ↓
Channel / Role Authorization
    ↓
Chat Socket Handler
    ↓
Message Model
    ↓
MongoDB
    ↓
message:new
    ↓
Socket.IO Channel Room
    ↓
Connected Clients in That Channel
    ↓
TanStack Query Cache Update
    ↓
Chat UI
```

------------------------------------------------------------------------

# 🧱 Technology Stack

## Frontend

-   React
-   React Router
-   Tailwind CSS
-   TanStack Query
-   Redux
-   Axios
-   Socket.IO Client
-   React Hook Form
-   Zod / validation utilities where applicable

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   Cookie-based authentication
-   Socket.IO
-   Multer
-   bcrypt
-   Custom middleware architecture

## Storage / Infrastructure

-   File upload abstraction through the backend
-   Configurable external storage
-   Environment variables for secrets and service configuration

------------------------------------------------------------------------

# 📁 Repository Structure

``` text
TEAM SYNC/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js
│   │   │   ├── database.js
│   │   │   └── storage.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── admin.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── employee.task.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── multer.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   ├── task.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   └── employee.task.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── admin.service.js
│   │   │   ├── auth.service.js
│   │   │   ├── chat.service.js
│   │   │   ├── employee.task.service.js
│   │   │   └── task.service.js
│   │   │
│   │   ├── socket/
│   │   │   └── chat.socket.js
│   │   │
│   │   ├── utils/
│   │   │   ├── AppError.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── SanitizeParam.js
│   │   │   └── token.js
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.validators.js
│   │   │   └── task.validator.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   └── .env.example
│
└── Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── config/
    │   │   ├── constants/
    │   │   ├── Layout/
    │   │   ├── projectedRoutes/
    │   │   ├── routes/
    │   │   ├── App.css
    │   │   └── app.store.jsx
    │   │
    │   ├── features/
    │   │   ├── admin module/
    │   │   │   ├── dashboard/
    │   │   │   │   ├── apis/
    │   │   │   │   ├── hooks/
    │   │   │   │   ├── state/
    │   │   │   │   └── ui/
    │   │   │   │
    │   │   │   ├── departments/
    │   │   │   │   ├── apis/
    │   │   │   │   ├── hooks/
    │   │   │   │   ├── state/
    │   │   │   │   └── ui/
    │   │   │   │
    │   │   │   ├── employees/
    │   │   │   │   ├── apis/
    │   │   │   │   ├── hooks/
    │   │   │   │   ├── state/
    │   │   │   │   └── ui/
    │   │   │   │
    │   │   │   └── tasks/
    │   │   │
    │   │   ├── auth/
    │   │   │   ├── apis/
    │   │   │   ├── components/
    │   │   │   ├── hooks/
    │   │   │   ├── pages/
    │   │   │   └── state/
    │   │   │
    │   │   ├── chats/
    │   │   │   ├── apis/
    │   │   │   ├── constants/
    │   │   │   ├── hooks/
    │   │   │   ├── socket/
    │   │   │   ├── state/
    │   │   │   ├── ui/
    │   │   │   └── utils/
    │   │   │
    │   │   ├── employee module/
    │   │   │   ├── dashboard/
    │   │   │   ├── MyTask/
    │   │   │   └── settings/
    │   │   │
    │   │   └── shared/
    │   │       ├── apis/
    │   │       ├── hooks/
    │   │       ├── state/
    │   │       └── UI/
    │   │
    │   └── main.jsx
    │
    ├── public/
    └── package.json
```

------------------------------------------------------------------------

# 🔐 Authentication Architecture

TEAM SYNC uses JWT-based authentication with cookies.

### Login flow

``` mermaid
sequenceDiagram
    participant User
    participant React
    participant API
    participant Auth as Auth Middleware
    participant DB as MongoDB

    User->>React: Enter email + password
    React->>API: POST /api/auth/login
    API->>API: Validate request
    API->>DB: Find user
    DB-->>API: User
    API->>API: Verify password
    API->>API: Generate JWT
    API-->>React: Set authentication cookie
    React->>API: GET /api/auth/me
    API->>Auth: Verify JWT
    Auth->>DB: Find user
    DB-->>Auth: User
    Auth-->>React: Current user
    React->>React: Restore authenticated state
```

### Authentication responsibilities

-   Login validates credentials.
-   Passwords are not stored as plain text.
-   JWT is used for authenticated requests.
-   Authentication middleware verifies the token.
-   The middleware loads the user and attaches the authenticated user to
    the request.
-   Protected frontend routes prevent unauthorized navigation.
-   Backend authorization remains the final security boundary.

------------------------------------------------------------------------

# 👥 Roles and Permissions

## Admin

Admin can:

-   View dashboard
-   Add employees
-   View all employees
-   Edit employees
-   Enable/disable employee status
-   Delete employees
-   View departments
-   View department details
-   View all tasks
-   Create tasks
-   Update tasks
-   Delete tasks
-   Assign tasks to employees
-   Manage organization-level information
-   Access announcements in chat

## Employee

Employee can:

-   View employee dashboard
-   View assigned tasks
-   Open task details
-   Update own task status
-   Use chat channels
-   Upload chat attachments
-   Delete messages according to message permissions
-   Update profile name
-   Upload avatar
-   Reset/change password
-   Manage personal settings

------------------------------------------------------------------------

# 🛡️ Authorization Model

Authorization is enforced on the backend.

Example:

``` js
router.get(
  "/get-all-employee",
  authenticate,
  authorizeRoles("admin"),
  getAllEmployee
);
```

The request must pass:

``` text
Request
  ↓
authenticate
  ↓
Is JWT valid?
  ↓
Does user exist?
  ↓
authorizeRoles("admin")
  ↓
Is user an admin?
  ↓
Controller
```

This prevents a user from bypassing frontend restrictions simply by
manually calling an API.

------------------------------------------------------------------------



⚠️ **Production note:** Never commit real production credentials into a
public repository. These credentials are included here only because this
README is specifically documenting the personal/demo project.

------------------------------------------------------------------------

# 🧑‍💼 Admin Module

The Admin module contains the organization-level management features.

``` text
Admin
│
├── Dashboard
│
├── Departments
│   ├── Department List
│   └── Department Detail
│
├── Employees
│   ├── All Employees
│   ├── Add Employee
│   ├── Edit Employee
│   ├── Toggle Status
│   └── Delete Employee
│
└── Tasks
    ├── All Tasks
    ├── Create Task
    ├── Update Task
    └── Delete Task
```

------------------------------------------------------------------------

# 🏢 Departments

Current department structure:

``` text
common
developer
designer
manager
marketer
```

Admin can retrieve:

``` http
GET /api/admin/department
```

and a specific department:

``` http
GET /api/admin/department/:department
```

Both endpoints require:

``` text
authenticate
+
admin authorization
```

------------------------------------------------------------------------

# 👨‍💻 Employee Management

Admin employee endpoints:

  ----------------------------------------------------------------------------------------
  Method            Endpoint                           Purpose           Access
  ----------------- ---------------------------------- ----------------- -----------------
  POST              `/api/admin/add-employee`          Create employee   Admin

  GET               `/api/admin/get-all-employee`      Get employees     Admin

  PUT               `/api/admin/update-employee/:id`   Edit employee     Admin

  PUT               `/api/admin/toggle-status/:id`     Enable/disable    Admin
                                                       employee          

  DELETE            `/api/admin/delete-employee/:id`   Delete employee   Admin
  ----------------------------------------------------------------------------------------

### Add employee flow

``` text
Admin opens Add Employee
        ↓
Form validation
        ↓
POST /admin/add-employee
        ↓
validate(addEmployeeSchema)
        ↓
authenticate
        ↓
authorizeRoles("admin")
        ↓
addEmployee controller
        ↓
employee service
        ↓
User model
        ↓
MongoDB
        ↓
Success response
        ↓
TanStack Query invalidates employee data
        ↓
Employee list refreshes
```

------------------------------------------------------------------------

# 📋 Task Management

TEAM SYNC uses a different task experience for Admins and Employees.

## Admin Task Flow

``` text
Admin
  ↓
All Tasks
  ↓
Create Task
  ↓
Select Employee
  ↓
Set Title
  ↓
Add Description
  ↓
Set Priority
  ↓
Set Due Date
  ↓
Create Task
  ↓
MongoDB
  ↓
Employee sees task in My Tasks
```

## Employee Task Flow

``` text
Employee
   ↓
My Tasks
   ↓
Open assigned task
   ↓
Read task details
   ↓
Update status
   ↓
PUT /api/employee/task/:id
   ↓
Backend verifies assignment
   ↓
Task updated
```

### Admin task endpoints

  Method   Endpoint                       Purpose
  -------- ------------------------------ ---------------
  GET      `/api/admin/tasks`             Get all tasks
  POST     `/api/admin/create-task`       Create task
  PUT      `/api/admin/update-task/:id`   Update task
  DELETE   `/api/admin/delete-task/:id`   Delete task

### Employee task endpoints

  Method   Endpoint                   Purpose
  -------- -------------------------- --------------------
  GET      `/api/employee/tasks`      Get assigned tasks
  GET      `/api/employee/task/:id`   Get task details
  PUT      `/api/employee/task/:id`   Update task status

------------------------------------------------------------------------

# 🔒 Task Authorization

An employee must not be able to update another employee's task.

Conceptually:

``` text
Employee requests:
PUT /employee/task/:id

        ↓

authenticate
        ↓
authorizeRoles("employee")
        ↓
Find task
        ↓
Does task.assignedTo === req.user._id ?
        ↓
       YES
        ↓
Update status
```

If the task belongs to another employee, the operation must be rejected.

This is important because frontend filtering is not sufficient for
authorization.

------------------------------------------------------------------------

# 💬 Real-Time Chat Architecture

TEAM SYNC uses:

``` text
REST API
+
Socket.IO
```

REST is responsible for persistent/history-oriented operations.

Socket.IO handles real-time communication.

### Chat architecture

``` mermaid
flowchart LR
    A[User A] --> C[Socket.IO Client]
    B[User B] --> D[Socket.IO Client]

    C --> S[Socket.IO Server]
    D --> S

    S --> R1[General Room]
    S --> R2[Department Room]
    S --> R3[Announcements Room]

    S --> M[(Message Model)]
    M --> DB[(MongoDB)]
```

------------------------------------------------------------------------

# 📡 Chat Channels

The application supports organization/team communication through
channels such as:

``` text
general
announcements
developers
designers
managers
marketers
```

The exact available channels can be controlled from the frontend
constants/configuration and backend authorization rules.

------------------------------------------------------------------------

# 🔌 Socket Events

Core socket events include:

``` text
join:channel
leave:channel
message:send
message:new
message:error
disconnect
```

### Joining a channel

``` js
socket.emit("join:channel", channel);
```

### Leaving a channel

``` js
socket.emit("leave:channel", channel);
```

### Sending a message

``` js
socket.emit("message:send", {
  content,
  channel,
  attachments,
});
```

### Receiving a message

``` js
socket.on("message:new", (message) => {
  // update TanStack Query cache
});
```

------------------------------------------------------------------------

# 🛡️ Socket Authentication

Socket connections are authenticated using the authentication cookie.

The backend:

``` text
Socket connection
      ↓
Read accessToken cookie
      ↓
Verify JWT
      ↓
Find User
      ↓
Attach user to socket
      ↓
Allow connection
```

Conceptually:

``` js
socket.user = user;
```

This allows socket handlers to know who is sending the message without
trusting user identity from the frontend payload.

------------------------------------------------------------------------

# 📎 Chat File Upload Flow

Actual files are uploaded through HTTP rather than being sent directly
through Socket.IO.

``` mermaid
sequenceDiagram
    participant U as User
    participant R as React
    participant API as Upload API
    participant S as Storage
    participant WS as Socket.IO
    participant DB as MongoDB

    U->>R: Select file
    R->>API: POST /chat/upload
    API->>S: Upload file
    S-->>API: File URL + metadata
    API-->>R: Attachment metadata

    R->>WS: message:send
    WS->>DB: Save message + attachment metadata
    WS-->>R: message:new
```

This architecture avoids sending large binary payloads through the
WebSocket connection.

------------------------------------------------------------------------

# 📤 Chat Upload Endpoint

``` http
POST /api/chat/upload
```

Middleware:

``` text
authenticate
→
multer
→
uploadFileController
```

The frontend sends:

``` text
multipart/form-data
```

with:

``` text
files
channel
```

The resulting file metadata is then included with the Socket.IO message.

------------------------------------------------------------------------

# 🗑️ Message Management

Chat provides message deletion through:

``` http
DELETE /api/chat/delete/:id
```

The backend should enforce message ownership/admin permissions.

A recommended UX is to preserve the message record and mark its content
as deleted rather than physically removing the message from the
conversation history.

------------------------------------------------------------------------

# ⚙️ Settings

The settings area is available to users for personal account management.

Current account operations include:

``` text
Profile
├── Update name
└── Upload avatar

Security
└── Reset/change password

Appearance
└── Light / Dark preferences
```

### Settings endpoints

``` http
PUT /api/auth/reset-password
PUT /api/auth/upload-avtar
PUT /api/auth/update-name
```

All require authentication.

------------------------------------------------------------------------

# 🔗 Authentication API

  -----------------------------------------------------------------------------------
  Method            Endpoint                      Purpose           Auth
  ----------------- ----------------------------- ----------------- -----------------
  POST              `/api/auth/login`             Login             Public

  GET               `/api/auth/me`                Get current user  Required

  GET               `/api/auth/get-accessToken`   Access-token      Depends on
                                                  related auth flow implementation

  POST              `/api/auth/logout`            Logout            Required

  PUT               `/api/auth/reset-password`    Change/reset      Required
                                                  password          

  PUT               `/api/auth/upload-avtar`      Upload avatar     Required

  PUT               `/api/auth/update-name`       Update name       Required
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

# 💬 Chat API

  -----------------------------------------------------------------------------------------
  Method            Endpoint                            Purpose           Auth
  ----------------- ----------------------------------- ----------------- -----------------
  GET               `/api/chat/get-messages`            Get messages      Required

  GET               `/api/chat/get-messages/:channel`   Get channel       Required
                                                        messages          

  POST              `/api/chat/upload`                  Upload            Required
                                                        attachments       

  DELETE            `/api/chat/delete/:id`              Delete message    Required
  -----------------------------------------------------------------------------------------

------------------------------------------------------------------------

# 🧩 Backend Architecture

The backend is intentionally divided into layers.

``` text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
Database
```

## Routes

Routes define:

-   HTTP method
-   URL
-   middleware
-   controller

They should remain thin.

Example:

``` js
router.post(
  "/create-task",
  authenticate,
  authorizeRoles("admin"),
  createTask
);
```

## Controllers

Controllers handle the HTTP layer:

``` text
Request
→
Read params/body/user
→
Call service
→
Return response
```

## Services

Services contain business logic.

Examples:

``` text
admin.service.js
auth.service.js
chat.service.js
employee.task.service.js
task.service.js
```

This keeps controllers from becoming giant business-logic files.

## Models

Mongoose models represent persistent data:

``` text
User
Task
Message
```

## Middleware

Middleware handles cross-cutting concerns:

``` text
Authentication
Authorization
Validation
File Upload
Error Handling
```

------------------------------------------------------------------------

# 🧪 Validation Architecture

Validation is separated from controllers.

Example:

``` js
router.post(
  "/add-employee",
  validate(addEmployeeSchema),
  authenticate,
  authorizeRoles("admin"),
  addEmployee
);
```

This creates a clear pipeline:

``` text
Request
 ↓
Schema validation
 ↓
Authentication
 ↓
Authorization
 ↓
Controller
```

Task validation is also separated into:

``` text
validators/task.validator.js
```

------------------------------------------------------------------------

# 🚨 Error Handling

Utility layer contains:

``` text
AppError.js
asyncHandler.js
```

The goal is to keep error handling consistent.

A typical backend flow is:

``` text
Controller / Service
      ↓
throw AppError(...)
      ↓
Error Middleware
      ↓
HTTP status + message
      ↓
Frontend
```

This avoids exposing internal stack traces to clients.

------------------------------------------------------------------------

# 🖥️ Frontend Architecture

The frontend follows a **feature-based architecture** instead of putting
every component into one global components folder.

Main areas:

``` text
src/
│
├── app/
│
├── features/
│   ├── auth/
│   ├── admin module/
│   ├── employee module/
│   ├── chats/
│   └── shared/
│
└── main.jsx
```

------------------------------------------------------------------------

# 🧩 Feature Module Pattern

Most feature modules follow:

``` text
feature/
├── apis/
├── hooks/
├── state/
└── ui/
```

Meaning:

### `apis/`

Contains API functions.

``` text
HTTP request logic
```

### `hooks/`

Contains feature-specific React hooks.

``` text
useQuery
useMutation
custom feature hooks
```

### `state/`

Contains local/global feature state where needed.

### `ui/`

Contains feature-specific UI components/pages.

This keeps features isolated and easier to maintain.

------------------------------------------------------------------------

# 📦 TanStack Query Architecture

TEAM SYNC uses TanStack Query for server state.

Examples:

``` text
Employees
Tasks
Messages
Department data
```

Typical flow:

``` text
Component
   ↓
Custom Query Hook
   ↓
API Function
   ↓
Axios
   ↓
Backend
```

For mutations:

``` text
User action
   ↓
useMutation
   ↓
API function
   ↓
Backend
   ↓
onSuccess
   ↓
invalidateQueries / setQueryData
   ↓
UI updates
```

Example:

``` js
const mutation = useMutation({
  mutationFn: addEmployee,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["employees"],
    });
  },
});
```

------------------------------------------------------------------------

# 🗃️ Redux vs TanStack Query

The application separates two different types of state.

### TanStack Query

Used for:

``` text
Server state
- Employees
- Tasks
- Messages
- Department data
- API responses
```

### Redux

Used where global client/application state is useful:

``` text
Authentication state
UI/application state
Feature-specific client state
```

The principle is:

``` text
Server owns server data
TanStack Query manages server data

Client owns UI/application state
Redux manages selected global client state
```

------------------------------------------------------------------------

# 🧭 Frontend Navigation Concept

The application separates Admin and Employee experiences.

``` text
Authenticated User
       ↓
     Role
    /    \
 Admin   Employee
   ↓         ↓
Admin       Employee
Dashboard   Dashboard
   ↓         ↓
Employees   My Tasks
Departments Settings
Tasks       Chat
Chat        Settings
```

------------------------------------------------------------------------

# 📊 Admin Dashboard

The Admin dashboard is an organization management overview.

Expected information includes:

``` text
Total Employees
Active Employees
Total Departments
Total Tasks

Task Overview
├── To Do
├── In Progress
└── Completed

Department Overview

Recent Tasks

Recent Employees
```

------------------------------------------------------------------------

# 👤 Employee Dashboard

The Employee dashboard is personal rather than organization-wide.

Expected information includes:

``` text
My Tasks
To Do
In Progress
Completed

Upcoming Deadlines

My Department

Recent Activity

Recent Chat Activity
```

This creates a clear distinction:

``` text
Admin Dashboard
= Organization view

Employee Dashboard
= Personal work view
```

------------------------------------------------------------------------

# 🔄 Complete User Journey

## Admin Journey

``` mermaid
flowchart TD
    A[Admin Login] --> B[Authentication]
    B --> C[Admin Dashboard]

    C --> D[Employee Management]
    C --> E[Department Management]
    C --> F[Task Management]
    C --> G[Chat]
    C --> H[Settings]

    D --> D1[Add Employee]
    D --> D2[Edit Employee]
    D --> D3[Toggle Status]
    D --> D4[Delete Employee]

    E --> E1[Department List]
    E --> E2[Department Detail]

    F --> F1[View All Tasks]
    F --> F2[Create Task]
    F --> F3[Update Task]
    F --> F4[Delete Task]
```

## Employee Journey

``` mermaid
flowchart TD
    A[Employee Login] --> B[Authentication]
    B --> C[Employee Dashboard]

    C --> D[My Tasks]
    C --> E[Chat]
    C --> F[Settings]

    D --> D1[View Assigned Tasks]
    D1 --> D2[Open Task Detail]
    D2 --> D3[Update Task Status]

    E --> E1[Join Channel]
    E1 --> E2[Send Message]
    E2 --> E3[Receive Realtime Message]
    E2 --> E4[Upload Attachment]

    F --> F1[Update Name]
    F --> F2[Upload Avatar]
    F --> F3[Change Password]
```

------------------------------------------------------------------------

# 🗺️ Full System Graph

``` mermaid
flowchart TB

    USER[User]

    USER --> LOGIN[Login]
    LOGIN --> AUTH[JWT + Cookie Authentication]

    AUTH --> ROLE{User Role}

    ROLE -->|Admin| ADMIN_DASH[Admin Dashboard]
    ROLE -->|Employee| EMP_DASH[Employee Dashboard]

    ADMIN_DASH --> EMP[Employee Management]
    ADMIN_DASH --> DEPT[Department Management]
    ADMIN_DASH --> ADMIN_TASK[Task Management]
    ADMIN_DASH --> CHAT[Real-Time Chat]
    ADMIN_DASH --> SETTINGS[Settings]

    EMP_DASH --> MY_TASK[My Tasks]
    EMP_DASH --> CHAT
    EMP_DASH --> SETTINGS

    EMP --> ADD[Add Employee]
    EMP --> EDIT[Edit Employee]
    EMP --> STATUS[Toggle Status]
    EMP --> DELETE[Delete Employee]

    DEPT --> DEPT_LIST[Department List]
    DEPT --> DEPT_DETAIL[Department Detail]

    ADMIN_TASK --> CREATE[Create Task]
    ADMIN_TASK --> UPDATE[Update Task]
    ADMIN_TASK --> REMOVE[Delete Task]
    ADMIN_TASK --> ASSIGN[Assign Employee]

    ASSIGN --> MY_TASK

    MY_TASK --> TASK_DETAIL[Task Detail]
    TASK_DETAIL --> TASK_STATUS[Update Status]

    CHAT --> REST_CHAT[Chat REST API]
    CHAT --> SOCKET[Socket.IO]
    CHAT --> UPLOAD[File Upload]

    SOCKET --> ROOM[Channel Rooms]
    ROOM --> MESSAGE[Message Persistence]

    UPLOAD --> STORAGE[File Storage]

    SETTINGS --> PROFILE[Profile]
    SETTINGS --> SECURITY[Security]
    SETTINGS --> APPEARANCE[Appearance]

    AUTH --> BACKEND[Express Backend]

    BACKEND --> ROUTES[Routes]
    ROUTES --> MIDDLEWARE[Middleware]
    MIDDLEWARE --> CONTROLLERS[Controllers]
    CONTROLLERS --> SERVICES[Services]
    SERVICES --> MODELS[Mongoose Models]
    MODELS --> DB[(MongoDB)]

    SOCKET --> SERVICES
```

------------------------------------------------------------------------

# 🔐 Security Architecture

Important security boundaries:

``` text
Frontend
  ↓
UX-level route protection
  ↓
Backend
  ↓
JWT authentication
  ↓
Role authorization
  ↓
Resource ownership checks
  ↓
Database
```

The frontend should never be treated as the security boundary.

For example:

``` text
Hiding "Delete Employee" button
≠
Securing employee deletion
```

The backend route must still enforce:

``` js
authenticate
authorizeRoles("admin")
```

Similarly, an employee task update must verify that the task actually
belongs to that employee.

------------------------------------------------------------------------

# 🧠 Important Design Principles

TEAM SYNC follows these architectural ideas:

### 1. Feature-based frontend

Features own their API, hooks, state, and UI.

### 2. Layered backend

Routes, controllers, services, and models have separate
responsibilities.

### 3. Backend-first authorization

Frontend permissions improve UX, while backend permissions provide
actual security.

### 4. REST + WebSocket hybrid

REST is used for persistent CRUD/history.

Socket.IO is used for real-time communication.

### 5. Server state separation

TanStack Query handles API/server state instead of putting every API
response into Redux.

### 6. Reusable APIs

Existing employee data can be reused for task assignment rather than
creating unnecessary duplicate APIs.

### 7. Resource ownership

Users should only mutate resources they are authorized to control.

------------------------------------------------------------------------

# 🚀 Local Development

## Backend

``` bash
cd Backend
npm install
npm run dev
```

## Frontend

``` bash
cd Frontend
npm install
npm run dev
```

------------------------------------------------------------------------

# ⚙️ Environment Variables

Create:

``` text
Backend/.env
```

based on:

``` text
Backend/.env.example
```

Typical configuration includes:

``` env
PORT=
MONGO_URI=
JWT_SECRET=
```

Additional storage/email/service configuration should be added according
to the project's `.env.example`.

**Never commit `.env` to Git.**

------------------------------------------------------------------------

# 🧪 Testing the Application Manually

## Test Admin

Login with:

``` text
aman@gmail.com
12345678
```

Then verify:

``` text
✓ Admin dashboard
✓ Employee list
✓ Add employee
✓ Edit employee
✓ Toggle employee status
✓ Department list
✓ Department detail
✓ Task list
✓ Create task
✓ Assign task
✓ Update task
✓ Delete task
✓ Chat
✓ Announcements permissions
✓ Settings
```

## Test Employee

Login with:

``` text
smriti@gmail.com
12345678
```

Then verify:

``` text
✓ Employee dashboard
✓ My Tasks
✓ Task detail
✓ Task status update
✓ Chat
✓ File attachments
✓ Profile update
✓ Avatar upload
✓ Password update
✓ Settings
```

------------------------------------------------------------------------

# 🧪 Authorization Test Cases

A proper manual test should also attempt unauthorized actions.

### Employee attempts Admin API

``` text
Employee
   ↓
POST /admin/create-task
   ↓
authorizeRoles("admin")
   ↓
403 / unauthorized
```

### Employee accesses another employee's task

``` text
Employee A
   ↓
GET /employee/task/<Employee B task>
   ↓
Ownership check
   ↓
Reject
```

### Unauthenticated user

``` text
No JWT
   ↓
Protected endpoint
   ↓
authenticate
   ↓
401 Unauthorized
```

------------------------------------------------------------------------

# 📌 API Permission Summary

  Area                                        Admin   Employee
  ------------------------ ------------------------ ----------
  Login                                          ✅         ✅
  Current User                                   ✅         ✅
  Employee Management                            ✅         ❌
  Department Management                          ✅         ❌
  Create Task                                    ✅         ❌
  Update Any Task                                ✅         ❌
  Delete Task                                    ✅         ❌
  View Own Tasks             Optional/Depends on UI         ✅
  Update Own Task Status                   Optional         ✅
  Real-time Chat                                 ✅         ✅
  Chat Attachments                               ✅         ✅
  Profile Update                                 ✅         ✅
  Avatar Upload                                  ✅         ✅
  Password Update                                ✅         ✅
  Announcements Posting                          ✅         ❌

------------------------------------------------------------------------

# 🧰 Development Philosophy

TEAM SYNC is primarily a learning and portfolio project built to explore
how a real full-stack application can be structured.

The project focuses on practical engineering concepts such as:

``` text
Authentication
Authorization
RBAC
REST APIs
CRUD
Mongoose
MongoDB
React Architecture
Feature-based Architecture
TanStack Query
Redux
Socket.IO
Real-time communication
File uploads
Validation
Error handling
Protected routes
Resource ownership
Responsive UI
```

It is intentionally more than a simple CRUD employee dashboard. The goal
is to understand how the pieces of a modern MERN application communicate
with each other.

------------------------------------------------------------------------

# 📈 Future Expansion Possibilities

Potential future features can be added without changing the core
architecture:

``` text
Notifications
Email notifications
Task comments
Task attachments
Task activity history
Read receipts
Typing indicators
Online/offline presence
Message editing
Advanced search
Audit logs
Analytics
Calendar integration
Team announcements
More granular permissions
Pagination
Advanced filtering
```

The existing feature-based frontend and service-oriented backend provide
a reasonable foundation for these additions.

------------------------------------------------------------------------

# 🧾 Project Status

TEAM SYNC currently includes the major foundation of an internal
employee collaboration system:

``` text
✅ Authentication
✅ JWT + Cookie authentication
✅ Protected routes
✅ Role-based authorization
✅ Admin / Employee roles
✅ Employee management
✅ Department management
✅ Admin dashboard
✅ Employee dashboard
✅ Task creation
✅ Task assignment
✅ Employee task management
✅ Task status updates
✅ Real-time chat
✅ Channel-based communication
✅ Chat file uploads
✅ Message deletion
✅ Profile settings
✅ Avatar upload
✅ Password management
✅ TanStack Query
✅ Redux-based application state
✅ Layered Express backend
✅ Feature-based React frontend
```

------------------------------------------------------------------------

# 👨‍💻 Project Type

**Project:** TEAM SYNC\
**Type:** Personal Full-Stack Project\
**Architecture:** MERN + REST + Socket.IO\
**Primary Roles:** Admin / Employee\
**Purpose:** Learning, portfolio development, and practical full-stack
engineering

------------------------------------------------------------------------

## ⭐ Core Idea

TEAM SYNC connects the entire employee workflow into one application:

``` text
AUTHENTICATE
     ↓
IDENTIFY ROLE
     ↓
OPEN ROLE-SPECIFIC WORKSPACE
     ↓
MANAGE PEOPLE / TEAMS
     ↓
COMMUNICATE IN REAL TIME
     ↓
CREATE & ASSIGN WORK
     ↓
COMPLETE ASSIGNED WORK
     ↓
MANAGE PERSONAL ACCOUNT
```

In short:

> **TEAM SYNC = Employee Management + Team Communication + Task
> Management in one MERN application.**
