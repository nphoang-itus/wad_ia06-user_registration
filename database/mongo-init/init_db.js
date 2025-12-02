/*
 * MongoDB Initialization Script
 * Mục đích: Tạo cấu trúc Collection (Validation) và Dữ liệu mẫu (Seeding)
 * Cách chạy:
 * 1. Dùng MongoDB Compass: Mở Mongosh (Terminal bên dưới) -> load('path/to/init_db.js')
 * 2. Dùng Terminal: mongosh "mongodb://localhost:27017/ia03_db" < database/init_db.js
 */

// 1. Chọn Database
db = db.getSiblingDB("ia03_db");

// 2. Xóa Collection cũ nếu tồn tại (để chạy lại không bị lỗi trùng)
db.users.drop();

// 3. TẠO CẤU TRÚC (STRUCTURE)
// Trong MongoDB, ta dùng 'validator' để định nghĩa cấu trúc dữ liệu (Schema Validation)
// Điều này tương đương với CREATE TABLE trong SQL
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "createdAt"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^.+@.+$", // Regex kiểm tra email đơn giản
          description: "Email phải là chuỗi và đúng định dạng",
        },
        password: {
          bsonType: "string",
          description: "Mật khẩu đã được mã hóa (Hashed)",
        },
        createdAt: {
          bsonType: "date",
          description: "Ngày tạo tài khoản",
        },
        updatedAt: {
          bsonType: "date",
          description: "Ngày cập nhật",
        },
      },
    },
  },
});

// Tạo Unique Index cho Email (Đảm bảo không trùng email)
db.users.createIndex({ email: 1 }, { unique: true });

print("Đã tạo cấu trúc Collection 'users' với Validation và Index.");

// 4. TẠO DỮ LIỆU MẪU (EXAMPLE DATA)
// Mật khẩu mẫu: "password123"
// Hash này được tạo bởi bcrypt với salt rounds = 10

db.users.insertMany([
  {
    email: "nphoang1@gmail.com",
    password: "$2b$10$d4Ba74pjH1Estd.ZQfKjsehVPsvLqgLnJAxt7dwtYkEAZu.sTOVtK",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  {
    email: "test1@example.com",
    password: "$2b$10$g9jflFuhosLBIjfYs1xlne2fd/VtTpNQ9GsRUzT3SqJhKc5O4/4PS",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  {
    email: "tempo1@example.com",
    password: "$2b$10$2Ays8v9YdrP6oclZBwo8o.59rbsPF7uC2W6XZUAbuPXIvrNa5IA2q",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
]);

print("Đã thêm 2 users mẫu thành công.");
print("   - User 1: nphoang1@gmail.com / Pass: nphoang1");
print("   - User 2: test1@example.com / Pass: test1@ex");
print("   - User 2: tempo1@example.com / Pass: tempo1@e");
