package com.timetable_api.dto.request;

public class ProgramRequest {

    private String name;
    private String code;
    private Long departmentId;

    public ProgramRequest() {
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

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}