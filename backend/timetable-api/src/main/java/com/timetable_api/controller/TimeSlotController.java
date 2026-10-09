package com.timetable_api.controller;

import com.timetable_api.entity.TimeSlot;
import com.timetable_api.service.TimeSlotService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.timetable_api.dto.request.TimeSlotRequest;
import com.timetable_api.dto.response.TimeSlotResponse;

@RestController
@RequestMapping("/api/time-slots")
@CrossOrigin(origins = "http://localhost:5173")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    @GetMapping
    public ResponseEntity<List<TimeSlotResponse>> getAllTimeSlots() {
        return ResponseEntity.ok(timeSlotService.getAllTimeSlots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeSlotResponse> getTimeSlotById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(timeSlotService.getTimeSlotById(id));
    }

    @PostMapping
    public ResponseEntity<TimeSlotResponse> createTimeSlot(
            @RequestBody TimeSlotRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(timeSlotService.createTimeSlot(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeSlotResponse> updateTimeSlot(
            @PathVariable Long id,
            @RequestBody TimeSlotRequest request
    ) {
        return ResponseEntity.ok(
                timeSlotService.updateTimeSlot(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
        timeSlotService.deleteTimeSlot(id);
        return ResponseEntity.noContent().build();
    }
}