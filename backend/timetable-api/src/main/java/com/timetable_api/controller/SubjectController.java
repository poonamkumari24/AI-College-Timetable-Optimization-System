
package com.timetable_api.controller;

import com.timetable_api.dto.request.SubjectRequest;
import com.timetable_api.dto.response.SubjectResponse;
import com.timetable_api.entity.Subject;
import com.timetable_api.mapper.SubjectMapper;
import com.timetable_api.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public ResponseEntity<List<SubjectResponse>> getAllSubjects() {
        List<SubjectResponse> response =
                subjectService.getAllSubjects()
                        .stream()
                        .map(SubjectMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> getSubjectById(
            @PathVariable Long id) {
        Subject subject = subjectService.getSubjectById(id);
        return ResponseEntity.ok(SubjectMapper.toResponse(subject));
    }

    @PostMapping
    public ResponseEntity<SubjectResponse> createSubject(
            @RequestBody SubjectRequest request) {
        Subject createdSubject = subjectService.createSubject(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SubjectMapper.toResponse(createdSubject));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectResponse> updateSubject(
            @PathVariable Long id,
            @RequestBody SubjectRequest request) {
        Subject updatedSubject =
                subjectService.updateSubject(id, request);

        return ResponseEntity.ok(SubjectMapper.toResponse(updatedSubject));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}