package com.timetable_api.dto.response;

public class ProgramResponse {

    private Long id;
    private String name;
    private String code;
    private Long departmentId;
    private String departmentName;

    public ProgramResponse() {
    }

    public ProgramResponse(
            Long id,
            String name,
            String code,
            Long departmentId,
            String departmentName) {

        this.id = id;
        this.name = name;
        this.code = code;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
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

    public void setCode(String code) {
        this.code = code;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}