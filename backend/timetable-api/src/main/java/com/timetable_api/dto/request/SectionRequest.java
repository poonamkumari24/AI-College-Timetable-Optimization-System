package com.timetable_api.dto.request;

public class SectionRequest {

    private String name;
    private Long semesterId;

    public SectionRequest() {
    }

    public String getName() {
        return name;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }
}