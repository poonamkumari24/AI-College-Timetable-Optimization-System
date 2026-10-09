package com.timetable_api.controller;

import com.timetable_api.dto.request.ProgramRequest;
import com.timetable_api.dto.response.ProgramResponse;
import com.timetable_api.entity.Program;
import com.timetable_api.mapper.ProgramMapper;
import com.timetable_api.service.ProgramService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "http://localhost:5173")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public ResponseEntity<List<ProgramResponse>> getAllPrograms() {

        List<ProgramResponse> response =
                programService.getAllPrograms()
                        .stream()
                        .map(ProgramMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgramById(
            @PathVariable Long id) {

        Program program = programService.getProgramById(id);

        return ResponseEntity.ok(
                ProgramMapper.toResponse(program)
        );
    }

    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @RequestBody ProgramRequest request) {

        Program createdProgram =
                programService.createProgram(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ProgramMapper.toResponse(createdProgram));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgramResponse> updateProgram(
            @PathVariable Long id,
            @RequestBody ProgramRequest request) {

        Program updatedProgram =
                programService.updateProgram(id, request);

        return ResponseEntity.ok(
                ProgramMapper.toResponse(updatedProgram)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(
            @PathVariable Long id) {

        programService.deleteProgram(id);

        return ResponseEntity.noContent().build();
    }
}