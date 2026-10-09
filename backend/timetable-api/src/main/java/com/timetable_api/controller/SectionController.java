package com.timetable_api.controller;

import com.timetable_api.entity.Section;
import com.timetable_api.service.SectionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.timetable_api.dto.request.SectionRequest;
import com.timetable_api.dto.response.SectionResponse;
import com.timetable_api.mapper.SectionMapper;

@RestController
@RequestMapping("/api/sections")
@CrossOrigin(origins = "http://localhost:5173")
public class SectionController {

    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public ResponseEntity<List<SectionResponse>> getAllSections() {

        List<SectionResponse> response =
                sectionService.getAllSections()
                        .stream()
                        .map(SectionMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SectionResponse> getSectionById(
            @PathVariable Long id) {

        Section section =
                sectionService.getSectionById(id);

        return ResponseEntity.ok(
                SectionMapper.toResponse(section)
        );
    }

    @PostMapping
    public ResponseEntity<SectionResponse> createSection(
            @RequestBody SectionRequest request) {

        Section createdSection =
                sectionService.createSection(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(SectionMapper.toResponse(createdSection));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SectionResponse> updateSection(
            @PathVariable Long id,
            @RequestBody SectionRequest request) {

        Section updatedSection =
                sectionService.updateSection(id, request);

        return ResponseEntity.ok(
                SectionMapper.toResponse(updatedSection)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(
            @PathVariable Long id) {

        sectionService.deleteSection(id);

        return ResponseEntity.noContent().build();
    }
}