package com.timetable_api.dto.response;

public class SectionResponse {

    private Long id;
    private String name;
    private Long semesterId;
    private Integer semesterNumber;

    public SectionResponse() {
    }

    public SectionResponse(
            Long id,
            String name,
            Long semesterId,
            Integer semesterNumber) {

        this.id = id;
        this.name = name;
        this.semesterId = semesterId;
        this.semesterNumber = semesterNumber;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }
}