package com.timetable_api.dto.response;

public class RoomResponse {

    private Long id;
    private String name;
    private Integer capacity;
    private Boolean lab;
    private Long departmentId;
    private String departmentName;

    public RoomResponse() {
    }

    public RoomResponse(
            Long id,
            String name,
            Integer capacity,
            Boolean lab,
            Long departmentId,
            String departmentName) {

        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.lab = lab;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    public Long getId() {
        return id;
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

    public String getDepartmentName() {
        return departmentName;
    }

    public void setId(Long id) {
        this.id = id;
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

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}