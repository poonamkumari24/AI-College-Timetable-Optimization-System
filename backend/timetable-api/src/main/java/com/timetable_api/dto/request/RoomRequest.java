package com.timetable_api.dto.request;

public class RoomRequest {

    private String name;
    private Integer capacity;
    private Boolean lab;
    private Long departmentId;

    public RoomRequest() {
    }

    public String getName() {
        return name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Boolean getLab() {
        return lab;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public void setLab(Boolean lab) {
        this.lab = lab;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}