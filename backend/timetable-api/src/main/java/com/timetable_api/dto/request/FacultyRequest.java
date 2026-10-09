package com.timetable_api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FacultyRequest {

    @NotBlank(message = "Faculty name is required.")
    @Size(max = 100, message = "Faculty name cannot exceed 100 characters.")
    private String name;

    @NotBlank(message = "Employee code is required.")
    @Size(max = 50, message = "Employee code cannot exceed 50 characters.")
    private String employeeCode;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    private String email;

    @NotNull(message = "Department ID is required.")
    private Long departmentId;

    public FacultyRequest() {
    }

    public String getName() {
        return name;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public String getEmail() {
        return email;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}
