package com.timetable_api.service;

import com.timetable_api.dto.request.ProgramRequest;
import com.timetable_api.entity.Department;
import com.timetable_api.entity.Program;
import com.timetable_api.repository.DepartmentRepository;
import com.timetable_api.repository.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;
    private final DepartmentRepository departmentRepository;

    public ProgramService(
            ProgramRepository programRepository,
            DepartmentRepository departmentRepository) {

        this.programRepository = programRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Program getProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Program not found with id: " + id));
    }

    public Program createProgram(ProgramRequest request) {

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));

        Program program = new Program();

        program.setName(request.getName());
        program.setCode(request.getCode());
        program.setDepartment(department);

        return programRepository.save(program);
    }

    public Program updateProgram(Long id, ProgramRequest request) {

        Program existingProgram = getProgramById(id);

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));

        existingProgram.setName(request.getName());
        existingProgram.setCode(request.getCode());
        existingProgram.setDepartment(department);

        return programRepository.save(existingProgram);
    }

    public void deleteProgram(Long id) {

        Program program = getProgramById(id);

        programRepository.delete(program);
    }
}