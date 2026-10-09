package com.timetable_api.controller;

import com.timetable_api.dto.request.TimetableEntryRequest;
import com.timetable_api.dto.response.TimetableEntryResponse;
import com.timetable_api.service.TimetableEntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable-entries")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableEntryController {

    private final TimetableEntryService timetableEntryService;

    public TimetableEntryController(
            TimetableEntryService timetableEntryService
    ) {
        this.timetableEntryService = timetableEntryService;
    }

    @GetMapping
    public ResponseEntity<List<TimetableEntryResponse>> getAllEntries() {
        return ResponseEntity.ok(
                timetableEntryService.getAllEntries()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimetableEntryResponse> getEntryById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                timetableEntryService.getEntryById(id)
        );
    }

    @PostMapping
    public ResponseEntity<TimetableEntryResponse> createEntry(
            @RequestBody TimetableEntryRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(timetableEntryService.createEntry(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimetableEntryResponse> updateEntry(
            @PathVariable Long id,
            @RequestBody TimetableEntryRequest request
    ) {
        return ResponseEntity.ok(
                timetableEntryService.updateEntry(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        timetableEntryService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
}