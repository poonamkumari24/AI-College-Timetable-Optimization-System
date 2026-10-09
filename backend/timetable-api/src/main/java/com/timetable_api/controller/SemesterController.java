package com.timetable_api.controller;

import com.timetable_api.dto.request.SemesterRequest;
import com.timetable_api.dto.response.SemesterResponse;
import com.timetable_api.entity.Semester;
import com.timetable_api.mapper.SemesterMapper;
import com.timetable_api.service.SemesterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@CrossOrigin(origins = "http://localhost:5173")
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @GetMapping
    public ResponseEntity<List<SemesterResponse>> getAllSemesters() {

        List<SemesterResponse> response =
                semesterService.getAllSemesters()
                        .stream()
                        .map(SemesterMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SemesterResponse> getSemesterById(
            @PathVariable Long id) {

        Semester semester =
                semesterService.getSemesterById(id);

        return ResponseEntity.ok(
                SemesterMapper.toResponse(semester)
        );
    }

    @PostMapping
    public ResponseEntity<SemesterResponse> createSemester(
            @RequestBody SemesterRequest request) {

        Semester createdSemester =
                semesterService.createSemester(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(SemesterMapper.toResponse(createdSemester));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SemesterResponse> updateSemester(
            @PathVariable Long id,
            @RequestBody SemesterRequest request) {

        Semester updatedSemester =
                semesterService.updateSemester(id, request);

        return ResponseEntity.ok(
                SemesterMapper.toResponse(updatedSemester)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSemester(
            @PathVariable Long id) {

        semesterService.deleteSemester(id);

        return ResponseEntity.noContent().build();
    }
}