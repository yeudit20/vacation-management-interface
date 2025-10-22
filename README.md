# 🏖 Vacation Management Interface (Draft)

> **Note:** This README is an initial draft and will be updated as the implementation progresses.

---

## 📋 Overview

This project was developed as part of a recruitment test for a Web Development Internship.  
It implements a complete **Vacation Management System** with two main user roles:

1. **Requester (Employee):** Submits and tracks vacation requests.  
2. **Validator (Manager):** Reviews, approves, or rejects vacation requests.

The project demonstrates full-stack development skills using **Vue.js**, **Node.js (Express)**, and a **relational database** such as PostgreSQL or MySQL.

---

## 🚀 Planned Stack

- **Frontend:** Vue.js, Vue Router, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (or SQLite for local testing) via Sequelize ORM  
- **Version Control:** Git + Bitbucket  
- **Testing:** Jest (basic unit tests)

---

## 🧩 Planned Features

### Requester Interface
- Submit vacation requests (start date, end date, optional reason).  
- View submitted requests and their statuses: *Pending*, *Approved*, *Rejected*.

### Validator Interface
- View all submitted requests.  
- Filter requests by status.  
- Approve or reject requests with optional comments.

---

## 🗄️ Database Structure (Planned)

### **Users Table**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Unique ID |
| name | VARCHAR | Employee name |
| role | ENUM(Requester, Validator) | Defines user type |

### **Vacation Requests Table**
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Unique request ID |
| user_id | INT | Foreign key to `Users` |
| start_date | DATE | Vacation start |
| end_date | DATE | Vacation end |
| reason | TEXT | Optional |
| status | ENUM(Pending, Approved, Rejected) | Current status |
| comments | TEXT | Validator feedback |
| created_at | TIMESTAMP | Creation date |

---

## 🚀 Setup (To Be Finalized)

```bash
# Clone repository
git clone https://bitbucket.org/<your-username>/vacation-management-interface.git
cd vacation-management-interface

# Install dependencies
npm install
cd client
npm install

# Run backend (development)
npm run dev

# Run frontend
cd client
npm run serve
```

---

## 🧠 Development Notes

- Initial setup may use SQLite for speed, then switch to PostgreSQL.
- The architecture will follow RESTful conventions.
- UI/UX will focus on clarity and simplicity.

---

## 🧾 Status

### **🟡 Work in Progress** — Implementation phase pending.
This file will be updated with final architecture, API routes, and setup instructions once development is complete.

---

## 👩‍💻 Author

**Yehudit Shapira**  
Full Stack Developer  
https://github.com/yeudit20
