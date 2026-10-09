package com.timetable_api.dto.request;

public class TimeSlotRequest {

    private String dayOfWeek;
    private Integer periodNumber;
    private String startTime;
    private String endTime;

    public TimeSlotRequest() {
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