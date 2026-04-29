# 🛡️ Scholar Nexus — High-Integrity Academic Registry

A production-grade, specialized management system for academic record integrity. Built with a high-performance **Spring Boot JDBC** core and a premium **Emerald-Gold React** interface.

## System Architecture

```text
Portal (Client) → Nexus Gatekeeper → Registry Manager → Scholar Vault → PostgreSQL
(React + Framer)   (REST Gateway)    (Orchestration)    (JDBC Access)   (Storage)
```

## Core Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Engine** | Spring Boot 2.7.18 (JDK 8 Compatible) |
| **Data Orchestration** | Spring JDBC (JdbcTemplate) |
| **Database** | PostgreSQL |
| **Frontend Portal** | React 18 + Vite |
| **Styling & Motion** | Tailwind CSS v4 + Framer Motion |
| **UX Enhancements** | Lenis Smooth Scroll + Lucide Icons |

---

## ⚡ Setup & Deployment

### 1. Environment Requirements
- **JDK 8 or higher**
- **PostgreSQL Database Engine**
- **Node.js 18+**

### 2. Vault Provisioning
Execute the following in your SQL client to establish the data vault:
```sql
CREATE DATABASE nexus_db;
```
The table structure (`academic_records`) is automatically provisioned via `schema.sql` on first launch.

### 3. Backend Configuration
Configure your vault credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nexus_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_VAULT_KEY
```

### 4. System Launch
**Backend Node:**
```powershell
.\mvnw.cmd spring-boot:run
```

**Frontend Portal:**
```powershell
cd frontend
npm install
npm run dev
```

---

## 📡 Nexus API Integration

| Objective | Endpoint | Method |
| :--- | :--- | :--- |
| **Fetch Registry** | `/nexus/scholars` | `GET` |
| **Enroll Scholar** | `/nexus/scholars` | `POST` |
| **Retrieve Record** | `/nexus/scholars/{sid}` | `GET` |
| **Modify Record** | `/nexus/scholars/{sid}` | `PUT` |
| **Purge Record** | `/nexus/scholars/{sid}` | `DELETE` |

## Design Philosophy

The **Scholar Nexus** identity focuses on high-integrity academic data storage. 
- **Emerald Palette**: Symbolizes growth and academic stability.
- **Gold Accents**: Represents excellence and system authority.
- **Spring-Based Motion**: Ensures the interface feels alive and responsive.
- **JdbcTemplate Foundation**: Provides raw performance and granular SQL control without ORM overhead.

---

**Developed for the Academic Nexus Initiative.**