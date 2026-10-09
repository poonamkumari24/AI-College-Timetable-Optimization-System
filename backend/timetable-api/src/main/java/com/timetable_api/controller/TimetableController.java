package com.timetable_api.controller;

import com.timetable_api.entity.Timetable;
import com.timetable_api.service.TimetableService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.timetable_api.dto.request.TimetableRequest;
import com.timetable_api.dto.response.TimetableResponse;

@RestController
@RequestMapping("/api/timetables")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping
    public ResponseEntity<List<TimetableResponse>> getAllTimetables() {
        return ResponseEntity.ok(timetableService.getAllTimetables());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimetableResponse> getTimetableById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(timetableService.getTimetableById(id));
    }

    @PostMapping
    public ResponseEntity<TimetableResponse> createTimetable(
            @RequestBody TimetableRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(timetableService.createTimetable(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimetableResponse> updateTimetable(
            @PathVariable Long id,
            @RequestBody TimetableRequest request
    ) {
        return ResponseEntity.ok(
                timetableService.updateTimetable(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
        return ResponseEntity.noContent().build();
    }
}