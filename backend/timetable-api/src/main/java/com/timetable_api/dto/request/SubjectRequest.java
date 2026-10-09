package com.timetable_api.dto.request;

public class SubjectRequest {

    private String name;
    private String code;
    private Integer weeklyHours;
    private Long departmentId;

    public SubjectRequest() {
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public Integer getWeeklyHours() {
        return weeklyHours;
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

    public void setWeeklyHours(Integer weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}