package com.timetable_api.service;

import com.timetable_api.entity.Subject;
import com.timetable_api.repository.SubjectRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import com.timetable_api.dto.request.SubjectRequest;
import com.timetable_api.entity.Department;
import com.timetable_api.repository.DepartmentRepository;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final DepartmentRepository departmentRepository;

    public SubjectService(
            SubjectRepository subjectRepository,
            DepartmentRepository departmentRepository) {
        this.subjectRepository = subjectRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Subject not found with id: " + id));
    }

    public Subject createSubject(SubjectRequest request) {
        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));

        Subject subject = new Subject();
        subject.setName(request.getName());
        subject.setCode(request.getCode());
        subject.setWeeklyHours(request.getWeeklyHours());
        subject.setDepartment(department);

        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, SubjectRequest request) {
        Subject existingSubject = getSubjectById(id);

        Department department = departmentRepository
                .findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found with id: "
                                        + request.getDepartmentId()));

        existingSubject.setName(request.getName());
        existingSubject.setCode(request.getCode());
        existingSubject.setWeeklyHours(request.getWeeklyHours());
        existingSubject.setDepartment(department);

        return subjectRepository.save(existingSubject);
    }

    public void deleteSubject(Long id) {
        Subject subject = getSubjectById(id);
        subjectRepository.delete(subject);
    }
}