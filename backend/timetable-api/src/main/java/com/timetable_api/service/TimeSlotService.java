package com.timetable_api.service;

import com.timetable_api.entity.TimeSlot;
import com.timetable_api.repository.TimeSlotRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.TimeSlotRequest;
import com.timetable_api.dto.response.TimeSlotResponse;
import com.timetable_api.mapper.TimeSlotMapper;

@Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotService(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    public List<TimeSlotResponse> getAllTimeSlots() {
        return timeSlotRepository.findAll()
                .stream()
                .map(TimeSlotMapper::toResponse)
                .toList();
    }

    public TimeSlotResponse getTimeSlotById(Long id) {
        TimeSlot timeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("TimeSlot not found with id: " + id));

        return TimeSlotMapper.toResponse(timeSlot);
    }

    public TimeSlotResponse createTimeSlot(TimeSlotRequest request) {
        TimeSlot timeSlot = new TimeSlot();

        timeSlot.setDayOfWeek(request.getDayOfWeek());
        timeSlot.setPeriodNumber(request.getPeriodNumber());
        timeSlot.setStartTime(request.getStartTime());
        timeSlot.setEndTime(request.getEndTime());

        TimeSlot savedTimeSlot = timeSlotRepository.save(timeSlot);

        return TimeSlotMapper.toResponse(savedTimeSlot);
    }

    public TimeSlotResponse updateTimeSlot(
            Long id,
            TimeSlotRequest request
    ) {
        TimeSlot timeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("TimeSlot not found with id: " + id));

        timeSlot.setDayOfWeek(request.getDayOfWeek());
        timeSlot.setPeriodNumber(request.getPeriodNumber());
        timeSlot.setStartTime(request.getStartTime());
        timeSlot.setEndTime(request.getEndTime());

        TimeSlot updatedTimeSlot = timeSlotRepository.save(timeSlot);

        return TimeSlotMapper.toResponse(updatedTimeSlot);
    }

    public void deleteTimeSlot(Long id) {
        TimeSlot timeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("TimeSlot not found with id: " + id));

        timeSlotRepository.delete(timeSlot);
    }
}