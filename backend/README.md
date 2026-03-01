# Dev_Lancr — Freelancer Marketplace

Full-stack freelancer marketplace with **React 19 + Vite** frontend and **Java Spring Boot** backend.

## Quick Start

### Prerequisites
- **Node.js** ≥ 18
- **Java** 17+
- **Maven** 3.8+
- **MySQL** 8.0+

### 1. Database Setup
```bash
mysql -u root -p < backend/src/main/resources/schema.sql
```
Or let Spring Boot auto-create tables (already configured with `ddl-auto=update`).

### 2. Backend
```bash
cd backend
# Update src/main/resources/application.properties with your MySQL credentials
mvn clean install
mvn spring-boot:run
```
Backend runs on **http://localhost:8080**

### 3. Frontend
```bash
# From project root
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

## Default Roles
The `schema.sql` seeds 3 roles: `ROLE_CLIENT`, `ROLE_FREELANCER`, `ROLE_ADMIN`.

To create an admin user, register normally and then manually update the `user_roles` table:
```sql
INSERT INTO user_roles (user_id, role_id) VALUES (<user_id>, 3);
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login → JWT token |
| GET | `/api/users/me` | Yes | Current user profile |
| PUT | `/api/users/freelancer/profile` | Freelancer | Update freelancer profile |
| GET | `/api/projects` | No | Search/list projects |
| POST | `/api/projects` | Client | Create project |
| PUT | `/api/projects/{id}` | Client | Update project |
| DELETE | `/api/projects/{id}` | Client | Delete project |
| POST | `/api/proposals` | Freelancer | Submit proposal |
| GET | `/api/proposals/project/{id}` | Yes | Project proposals |
| POST | `/api/proposals/{id}/accept` | Client | Accept & create contract |
| POST | `/api/milestones` | Client | Create milestone |
| POST | `/api/milestones/{id}/fund` | Client | Fund milestone escrow |
| POST | `/api/milestones/{id}/release` | Client | Release payment |
| GET | `/api/messages/contract/{id}` | Yes | Chat messages |
| POST | `/api/messages` | Yes | Send message |
| POST | `/api/reviews` | Yes | Submit review |
| GET | `/api/wallet` | Yes | Wallet balance |
| POST | `/api/wallet/deposit` | Yes | Add funds |
| GET | `/api/notifications` | Yes | Notifications |
| GET | `/api/admin/analytics` | Admin | Platform stats |
| GET | `/api/admin/users` | Admin | All users |
| GET | `/api/search/projects` | No | Search projects |
| GET | `/api/search/freelancers` | No | Search freelancers |
| GET | `/api/search/skills` | No | All skills |

## Tech Stack

### Frontend
- React 19.2 + Vite 8
- React Router DOM 7
- GSAP 3 (animations)
- Three.js + Spline (3D)
- Vanilla CSS

### Backend
- Java 17 + Spring Boot 3.2
- Spring Security + JWT (jjwt 0.12)
- Spring Data JPA + MySQL
- Lombok + Bean Validation
