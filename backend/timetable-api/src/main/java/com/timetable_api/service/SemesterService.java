package com.timetable_api.service;

import com.timetable_api.dto.request.SemesterRequest;
import com.timetable_api.entity.Program;
import com.timetable_api.entity.Semester;
import com.timetable_api.repository.ProgramRepository;
import com.timetable_api.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;
    private final ProgramRepository programRepository;

    public SemesterService(
            SemesterRepository semesterRepository,
            ProgramRepository programRepository) {

        this.semesterRepository = semesterRepository;
        this.programRepository = programRepository;
    }

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

    public Semester getSemesterById(Long id) {
        return semesterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Semester not found with id: " + id));
    }

    public Semester createSemester(SemesterRequest request) {

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Program not found with id: "
                                        + request.getProgramId()));

        Semester semester = new Semester();

        semester.setSemesterNumber(request.getSemesterNumber());
        semester.setProgram(program);

        return semesterRepository.save(semester);
    }

    public Semester updateSemester(
            Long id,
            SemesterRequest request) {

        Semester existingSemester = getSemesterById(id);

        Program program = programRepository.findById(request.getProgramId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Program not found with id: "
                                        + request.getProgramId()));

        existingSemester.setSemesterNumber(
                request.getSemesterNumber());

        existingSemester.setProgram(program);

        return semesterRepository.save(existingSemester);
    }

    public void deleteSemester(Long id) {

        Semester semester = getSemesterById(id);

        semesterRepository.delete(semester);
    }
}