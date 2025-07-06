**Tech Stack ที่ใช้**
•	ใช้ภาษา Vue.js ในการพัฒนา Front-End
•	ใช้ JavaScript และ CSS ปกติ (ไม่ใช้ Framework เพิ่มเติม)
•	จำลองข้อมูลผู้ใช้ (Mockup Users) สำหรับระบบ Login
•	จัดเก็บข้อมูลทั้งหมดใน Local Storage

**โครงสร้าง Project**
pages/
├── Dashboard.vue            # หน้า Dashboard แสดงบอร์ดทั้งหมดของผู้ใช้
│   └── BoardCard.vue        # การ์ดของแต่ละบอร์ด: ชื่อ, สมาชิก, Invite/Edit/Delete
│        └── InviteMemberModal.vue # Modal สำหรับเชิญสมาชิกเข้าบอร์ดจาก Dashboard
│
├── BoardView.vue            # หน้าแสดงรายละเอียดของบอร์ด (container หลัก)
│   ├── BoardHeader.vue      # แสดงชื่อบอร์ด, ปุ่ม Invite, ปุ่ม Back
│   │   └── InviteMemberModal.vue # Modal สำหรับเชิญสมาชิก (เปิดจากปุ่ม Invite)
│   ├── ColumnList.vue       # แสดงลิสต์ของ Column แนวนอน 
│   │   └── ColumnCard.vue   # แสดงคอลัมน์แต่ละอัน (To Do, Doing, Done)
│   │       └── TaskCard.vue     # แสดงแต่ละ Task (ชื่อ, tag, assignee, ปุ่มลบ/แก้ไข)
│   └── TaskModal.vue        # Modal สำหรับสร้าง/แก้ไข Task
│
├── Login.vue                # หน้าเข้าสู่ระบบ
└── Register.vue             # หน้าลงทะเบียน

layouts/
└── Layout.vue               # Layout หลักของระบบ
    └── Header.vue           # Header หลักของเว็บไซต์ เช่น โลโก้, ปุ่ม logout

components/
├── InviteMemberModal.vue    # Modal สำหรับเลือกผู้ใช้เพื่อ invite เข้า board
├── BoardCard.vue            # (ใช้ใน Dashboard) แสดงการ์ดของบอร์ด
├── BoardHeader.vue          # (ใช้ใน BoardView) แสดงหัวบอร์ด + ปุ่มเชิญสมาชิก
├── ColumnList.vue           # แสดง list ของ Column แนวนอน
├── ColumnCard.vue           # ใช้แสดงแต่ละคอลัมน์
├── TaskCard.vue             # ใช้แสดงแต่ละ Task
├── TaskModal.vue            # Modal สำหรับจัดการ Task
└── Header.vue               # Header หลักของเว็บ (อยู่ใน Layout.vue)
