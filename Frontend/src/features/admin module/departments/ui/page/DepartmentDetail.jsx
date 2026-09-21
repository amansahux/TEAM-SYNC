import React from "react";
import { useParams } from "react-router";
import { useDepartmentDetail } from "../../hooks/useDepartment";
import DetailBreadcrumb from "../components/Depaartment Detail/DetailBreadcrumb";
import DetailHeader from "../components/Depaartment Detail/DetailHeader";
import DetailMetricsGrid from "../components/Depaartment Detail/DetailMetricsGrid";
import DetailFilterBar from "../components/Depaartment Detail/DetailFilterBar";
import DetailEmployeeList from "../components/Depaartment Detail/DetailEmployeeList";
import UpdateEmployeeModal from "../../../employees/ui/components/employee/UpdateEmployeeModal";

const DepartmentDetail = () => {
  const { department: paramDept } = useParams();
  const activeDeptName = paramDept || "developer";

  // All business logic, filtering, query state & handlers reside in the hook layer
  const {
    metrics,
    filteredEmployees,
    totalEmployeesCount,
    activeEmployeesCount,
    inactiveEmployees,
    theme,
    isLoading,
    isError,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    handleClearFilters,
    handleRetry,
    handleExport,
    editModalOpen,
    editingEmployee,
    handleCloseEditModal,
  } = useDepartmentDetail(activeDeptName);

  return (
    <div className="min-h-screen space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Breadcrumb navigation */}
      <DetailBreadcrumb departmentName={activeDeptName} />

      {/* 2. Main Header */}
      <DetailHeader
        departmentName={activeDeptName}
        theme={theme}
        totalEmployeesCount={totalEmployeesCount}
        onExport={() => handleExport(filteredEmployees)}
      />

      {/* 3. Metrics Summary Grid */}
      <DetailMetricsGrid metrics={metrics} theme={theme} />

      {/* 4. Filter & Search Controls */}
      <DetailFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalCount={totalEmployeesCount}
        activeCount={activeEmployeesCount}
        inactiveCount={inactiveEmployees?.length || 0}
        filteredCount={filteredEmployees?.length || 0}
        onClearFilters={handleClearFilters}
      />

      {/* 5. Department Personnel Cards Grid */}
      <DetailEmployeeList
        employees={filteredEmployees}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={handleRetry}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* 6. Edit Employee Modal */}
      {editModalOpen && (
        <UpdateEmployeeModal
          isOpen={editModalOpen}
          onClose={handleCloseEditModal}
          emp={editingEmployee}
        />
      )}
    </div>
  );
};

export default DepartmentDetail;