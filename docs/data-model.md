Data Model Documentation

ระบบ Library Management System ประกอบด้วย 3 โมเดลหลัก

- Book
- Member
- Borrow

---

# 1. Book Model

ใช้เก็บข้อมูลหนังสือในระบบ

| Field | Type | Description |
|------|------|-------------|
id | number | รหัสหนังสือ |
title | string | ชื่อหนังสือ |
author | string | ผู้เขียน |
isbn | string | รหัส ISBN |
status | enum | สถานะของหนังสือ |

Enum ของ status


AVAILABLE
BORROWED


---

# 2. Member Model

ใช้เก็บข้อมูลสมาชิกที่สามารถยืมหนังสือได้

| Field | Type | Description |
|------|------|-------------|
id | number | รหัสสมาชิก |
name | string | ชื่อสมาชิก |
email | string | อีเมลสมาชิก |

---

# 3. Borrow Model

ใช้เก็บข้อมูลการยืมหนังสือ

| Field | Type | Description |
|------|------|-------------|
id | number | รหัสรายการยืม |
bookId | number | id ของหนังสือ |
memberId | number | id ของสมาชิก |
borrowedAt | Date | วันที่ยืม |
returnedAt | Date / null | วันที่คืน |

---

# Relationship

ความสัมพันธ์ของข้อมูลในระบบ


Member (1) ---- (N) Borrow (N) ---- (1) Book


หมายความว่า

- สมาชิก 1 คนสามารถยืมหนังสือได้หลายครั้ง
- หนังสือ 1 เล่มสามารถถูกยืมหลายครั้ง (แต่ไม่พร้อมกัน)

---

# Storage

ระบบใช้ **JSON File Storage**

ไฟล์ข้อมูล


storage/
├ books.json
├ members.json
└ borrows.json


ข้อมูลทั้งหมดจะถูกอ่านและเขียนผ่าน `FileStorage utility`