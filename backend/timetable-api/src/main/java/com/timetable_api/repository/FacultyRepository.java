  package com.timetable_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.timetable_api.entity.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    boolean existsByEmail(String email);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByEmployeeCodeAndIdNot(String employeeCode, Long id);
}
