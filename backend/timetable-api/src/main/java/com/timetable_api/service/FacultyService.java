package com.timetable_api.service;

import com.timetable_api.entity.Faculty;
import com.timetable_api.repository.FacultyRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.FacultyRequest;
import com.timetable_api.entity.Department;
import com.timetable_api.repository.DepartmentRepository;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final DepartmentRepository departmentRepository;

    public FacultyService(
            FacultyRepository facultyRepository,
            DepartmentRepository departmentRepository) {
        this.facultyRepository = facultyRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Faculty not found with id: " + id));
    }

   
public Faculty createFaculty(FacultyRequest request) {

    if (facultyRepository.existsByEmail(request.getEmail())) {
        throw new IllegalArgumentException(
                "Faculty email is already registered: "
                        + request.getEmail());
    }

    if (facultyRepository.existsByEmployeeCode(
            request.getEmployeeCode())) {
        throw new IllegalArgumentException(
                "Employee code is already registered: "
                        + request.getEmployeeCode());
    }

    Department department = departmentRepository
            .findById(request.getDepartmentId())
            .orElseThrow(() ->
                    new RuntimeException(
                            "Department not found with id: "
                                    + request.getDepartmentId()));

    Faculty faculty = new Faculty();
    faculty.setName(request.getName());
    faculty.setEmployeeCode(request.getEmployeeCode());
    faculty.setEmail(request.getEmail());
    faculty.setDepartment(department);

    return facultyRepository.save(faculty);
}



   
public Faculty updateFaculty(Long id, FacultyRequest request) {

    Faculty existingFaculty = getFacultyById(id);

    if (facultyRepository.existsByEmailAndIdNot(
            request.getEmail(), id)) {
        throw new IllegalArgumentException(
                "Faculty email is already registered: "
                        + request.getEmail());
    }

    if (facultyRepository.existsByEmployeeCodeAndIdNot(
            request.getEmployeeCode(), id)) {
        throw new IllegalArgumentException(
                "Employee code is already registered: "
                        + request.getEmployeeCode());
    }

    Department department = departmentRepository
            .findById(request.getDepartmentId())
            .orElseThrow(() ->
                    new RuntimeException(
                            "Department not found with id: "
                                    + request.getDepartmentId()));

    existingFaculty.setName(request.getName());
    existingFaculty.setEmployeeCode(request.getEmployeeCode());
    existingFaculty.setEmail(request.getEmail());
    existingFaculty.setDepartment(department);

    return facultyRepository.save(existingFaculty);
}



    public void deleteFaculty(Long id) {
        Faculty faculty = getFacultyById(id);
        facultyRepository.delete(faculty);
    }
}