package com.timetable_api.controller;

import com.timetable_api.dto.request.DepartmentRequest;
import com.timetable_api.dto.response.DepartmentResponse;
import com.timetable_api.entity.Department;
import com.timetable_api.mapper.DepartmentMapper;
import com.timetable_api.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments() {

        List<DepartmentResponse> response =
                departmentService.getAllDepartments()
                        .stream()
                        .map(DepartmentMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(
            @PathVariable Long id) {

        Department department =
                departmentService.getDepartmentById(id);

        return ResponseEntity.ok(
                DepartmentMapper.toResponse(department)
        );
    }

    @PostMapping
    public ResponseEntity<DepartmentResponse> createDepartment(
            @RequestBody DepartmentRequest request) {

        Department department =
                DepartmentMapper.toEntity(request);

        Department createdDepartment =
                departmentService.createDepartment(department);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(DepartmentMapper.toResponse(createdDepartment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponse> updateDepartment(
            @PathVariable Long id,
            @RequestBody DepartmentRequest request) {

        Department department =
                DepartmentMapper.toEntity(request);

        Department updatedDepartment =
                departmentService.updateDepartment(id, department);

        return ResponseEntity.ok(
                DepartmentMapper.toResponse(updatedDepartment)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(
            @PathVariable Long id) {

        departmentService.deleteDepartment(id);

        return ResponseEntity.noContent().build();
    }
}