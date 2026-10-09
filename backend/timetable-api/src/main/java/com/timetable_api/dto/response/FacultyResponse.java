package com.timetable_api.dto.response;

public class FacultyResponse {

    private Long id;
    private String name;
    private String employeeCode;
    private String email;
    private Long departmentId;
    private String departmentName;

    public FacultyResponse() {
    }

    public FacultyResponse(
            Long id,
            String name,
            String employeeCode,
            String email,
            Long departmentId,
            String departmentName) {

        this.id = id;
        this.name = name;
        this.employeeCode = employeeCode;
        this.email = email;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    public Long getId() {
        return id;
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

    public String getDepartmentName() {
        return departmentName;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}