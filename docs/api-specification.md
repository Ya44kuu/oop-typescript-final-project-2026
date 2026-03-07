API Specification

เอกสารนี้อธิบายรายละเอียดของ REST API สำหรับระบบ Library Management System

## Base URL


http://localhost:3000


---

# Standard Response Format

ทุก API จะตอบกลับในรูปแบบเดียวกัน


{
"success": boolean,
"message": string,
"data": object | array | null
}


---

# 1. Book API

## GET /books

ดึงข้อมูลหนังสือทั้งหมด

Response


{
"success": true,
"message": "Books retrieved successfully",
"data": [
{
"id": 1,
"title": "Clean Code",
"author": "Robert C. Martin",
"isbn": "ISBN-001",
"status": "AVAILABLE"
}
]
}


---

## GET /books/:id

ดึงข้อมูลหนังสือตาม id

---

## POST /books

เพิ่มหนังสือใหม่

Request Body


{
"title": "Clean Code",
"author": "Robert C. Martin",
"isbn": "ISBN-001"
}


---

## PATCH /books/:id

อัปเดตข้อมูลหนังสือ

---

## DELETE /books/:id

ลบหนังสือ

---

# 2. Member API

## GET /members

ดึงข้อมูลสมาชิกทั้งหมด

---

## GET /members/:id

ดึงข้อมูลสมาชิกตาม id

---

## POST /members

เพิ่มสมาชิกใหม่

Request Body


{
"name": "John Doe",
"email": "john@example.com
"
}


---

## PATCH /members/:id

อัปเดตข้อมูลสมาชิก

---

## DELETE /members/:id

ลบสมาชิก

---

# 3. Borrow API

## GET /borrows

ดึงรายการการยืมทั้งหมด

---

## GET /borrows/:id

ดึงข้อมูลการยืมตาม id

---

## POST /borrows

สร้างรายการยืมหนังสือ

Request Body


{
"bookId": 1,
"memberId": 2
}


Response


{
"success": true,
"message": "Book borrowed successfully",
"data": {
"id": 1,
"bookId": 1,
"memberId": 2,
"borrowedAt": "2026-03-07",
"returnedAt": null
}
}


---

## PATCH /borrows/:id/return

คืนหนังสือ

---

## DELETE /borrows/:id

ลบรายการยืม