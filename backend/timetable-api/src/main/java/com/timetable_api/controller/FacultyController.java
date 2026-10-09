package com.timetable_api.controller;

import com.timetable_api.entity.Faculty;
import com.timetable_api.service.FacultyService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.validation.Valid;

import com.timetable_api.dto.request.FacultyRequest;
import com.timetable_api.dto.response.FacultyResponse;
import com.timetable_api.mapper.FacultyMapper;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public ResponseEntity<List<FacultyResponse>> getAllFaculty() {
        List<FacultyResponse> response =
                facultyService.getAllFaculty()
                        .stream()
                        .map(FacultyMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyResponse> getFacultyById(
            @PathVariable Long id) {
        Faculty faculty = facultyService.getFacultyById(id);
        return ResponseEntity.ok(FacultyMapper.toResponse(faculty));
    }

    @PostMapping
    public ResponseEntity<FacultyResponse> createFaculty(
            @Valid @RequestBody FacultyRequest request) {
        Faculty createdFaculty = facultyService.createFaculty(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FacultyMapper.toResponse(createdFaculty));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyResponse> updateFaculty(
            @PathVariable Long id,
            @Valid @RequestBody FacultyRequest request) {
        Faculty updatedFaculty =
                facultyService.updateFaculty(id, request);

        return ResponseEntity.ok(FacultyMapper.toResponse(updatedFaculty));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }
}