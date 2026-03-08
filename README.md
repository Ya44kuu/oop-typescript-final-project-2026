
# OOP Final Project - Library Management System

## 📌 Project Overview

โปรเจคนี้เป็นระบบ Backend REST API สำหรับ **Library Management System** พัฒนาด้วย **NestJS Framework และ TypeScript** โดยเป็นส่วนหนึ่งของ Final Project รายวิชา **Object-Oriented Programming**

ระบบนี้ถูกออกแบบเพื่อจัดการข้อมูลภายในห้องสมุด เช่น หนังสือ สมาชิก และการยืมคืนหนังสือ โดยใช้แนวคิด **Object-Oriented Programming (OOP)** และ **REST API Architecture**

ระบบมีโมดูลหลักดังนี้

* **Book Management** – จัดการข้อมูลหนังสือในระบบ
* **Member Management** – จัดการข้อมูลสมาชิกห้องสมุด
* **Borrow System** – จัดการการยืมและคืนหนังสือ
* **Storage System** – ระบบจัดเก็บข้อมูลแบบ JSON-based database

ระบบนี้ใช้ **Swagger** สำหรับ API Documentation และใช้ไฟล์ JSON จำลองฐานข้อมูล

---

# 👥 Contributors

| Name                  | GitHub           | Student ID |
| --------------------- | ---------------- | ---------- |
| นัฐกิตติ์ กองแก้ว     | NuttakitKongkaew | 68010334   |
| พงศ์พสิฐ ภูมิมักดี    | bananabank555    | 68010730   |
| ศิวาภณ นิติศิษบุญกลาง | gummert66        | 68011077   |
| ศิริศาสตร์ ชำนาญ      | Ya44kuu          | 68011068   |

---

# 🛠 Technology Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **Architecture:** REST API
* **Database:** JSON-based storage
* **API Documentation:** Swagger (OpenAPI)
* **Validation:** class-validator / class-transformer
* **Linting:** ESLint

---

# 🚀 Installation & Running the Project

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run start:dev
```

### 3️⃣ Swagger API Documentation

เปิดเบราว์เซอร์ไปที่

```
http://localhost:3000/api
```

---

# 📁 Project Structure

```text
.
├── docs
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
│
├── src
│   ├── common
│   │   ├── interfaces
│   │   └── utils
│   │
│   ├── modules
│   │   ├── book
|   |   |   └──dto/
│   │   ├── member
|   |   |   └──dto/
│   │   ├── borrow
|   |   |   └──dto/
│   │   └── storage
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test
├── package.json
└── README.md
```

---

# 📚 System Modules

## 📖 Book Module

จัดการข้อมูลหนังสือ เช่น

* เพิ่มหนังสือ
* แก้ไขข้อมูลหนังสือ
* ลบหนังสือ
* ดูรายการหนังสือทั้งหมด

---

## 👤 Member Module

จัดการข้อมูลสมาชิกห้องสมุด

* สมัครสมาชิก
* ดูข้อมูลสมาชิก
* แก้ไขข้อมูลสมาชิก

---

## 🔄 Borrow Module

จัดการการยืมและคืนหนังสือ

* ยืมหนังสือ
* คืนหนังสือ
* ดูประวัติการยืม

---

## 💾 Storage Module

ระบบจัดเก็บข้อมูลแบบ **JSON file storage**

ใช้สำหรับจำลอง database โดยเก็บข้อมูลของ

* Books
* Members
* Borrow records

---

# 📄 Documentation

เอกสารระบบเพิ่มเติมอยู่ในโฟลเดอร์ `docs/`

* **API Specification** – รายละเอียด endpoint ทั้งหมด
* **Data Model** – โครงสร้างข้อมูลของระบบ
* **UML Diagram** – ความสัมพันธ์ของ class ภายในระบบ

---
