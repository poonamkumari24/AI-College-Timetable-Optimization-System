package com.timetable_api.dto.response;

public class TimeSlotResponse {

    private Long id;
    private String dayOfWeek;
    private Integer periodNumber;
    private String startTime;
    private String endTime;

    public TimeSlotResponse() {
    }

    public TimeSlotResponse(
            Long id,
            String dayOfWeek,
            Integer periodNumber,
            String startTime,
            String endTime) {

        this.id = id;
        this.dayOfWeek = dayOfWeek;
        this.periodNumber = periodNumber;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getId() {
        return id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public Integer getPeriodNumber() {
        return periodNumber;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public void setPeriodNumber(Integer periodNumber) {
        this.periodNumber = periodNumber;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}