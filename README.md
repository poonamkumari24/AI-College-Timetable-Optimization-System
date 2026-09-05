# AI-Assisted College Timetable Optimization & Scheduling System

A web-based college timetable optimization system that combines Java Spring Boot, MySQL, Python FastAPI, Google OR-Tools CP-SAT, AI-assisted natural-language interaction, and data analytics.

## Project Objective

The system automatically generates and optimizes college timetables while considering faculty availability, room availability, student/section conflicts, laboratory requirements, working hours, and timetable preferences.

## Architecture

Spring Boot
→ MySQL

Spring Boot
↕ REST API
FastAPI
→ OR-Tools CP-SAT
→ AI/LLM Layer

Analytics
→ Python/Pandas

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Spring Security
- Maven

### Database
- MySQL

### Optimization
- Python
- FastAPI
- Google OR-Tools
- CP-SAT

### AI
- LLM API
- Structured output
- Natural-language timetable commands

### Analytics
- Python
- Pandas
- NumPy
- Matplotlib

### Frontend
- Thymeleaf
- Bootstrap

## Team

| Member | Responsibility |
|---|---|
| Member 1 | Java/Spring Boot & Application |
| Member 2 | AI & Optimization |
| Member 3 | Data Analytics |

## Repository Structure

```text
backend/                 Spring Boot application
optimization-service/    FastAPI + OR-Tools
analytics/                Data analysis
frontend/                 UI
database/                 Database scripts
data/                     Sample data and templates
docs/                     Project documentation
postman/                  API collections

# Branch strategy

Use:

```text
main
│
└── develop
     │
     ├── feature/backend-...
     ├── feature/optimization-...
     └── feature/analytics-...