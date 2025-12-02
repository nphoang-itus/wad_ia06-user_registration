# Bài tập cá nhân IA06: User registration
> Họ tên: Nguyễn Phúc Hoàng
> MSSV: 23120264
> Môn học: Phương pháp Lập trình ứng dụng Web
> Giảng viên: ThS. Nguyễn Huy Khánh

## Deployment

```sh

```

## Hướng dẫn run chương trình

### Requirements

- Node.js (>=18)
- npm (>=9)
- MongoDB (local or Docker)

### 1. Clone the repository

```sh
git clone https://github.com/nphoang-itus/wad_ia06-user_registration.git
cd wad_ia06-user_registration
```

### 2. Start MongoDB (recommended: Docker)

```sh
cd database
docker-compose up -d
```

**Lưu ý:** 
- Khi chạy `docker-compose up -d`, MongoDB sẽ tự động khởi tạo database, collection và seed dữ liệu mẫu bằng script `init_db.js` trong thư mục `database/mongo-init/`.  
- Script này chỉ chạy khi container MongoDB được tạo mới (chưa có dữ liệu), hỗ trợ tạo cấu trúc và user mẫu để test ngay.

### 3. Backend Setup

```sh
cd backend
npm install
cp .env.example .env   # (nếu có .env.example, hoặc tự tạo .env theo mẫu)
# Đảm bảo MONGO_URI và FRONTEND_URL đúng trong .env
npm run start:dev
```

Trước khi thực thi lệnh `npm run start:dev` Nên cấu hình .env cho **docker** và **backend** như sau để đồng bộ:

1. `.env` đặt ở thư mục database, cùng cấp với docker-compose.yml (ví dụ minh hoạ):
    ```
    # database/.env
    MONGO_INITDB_ROOT_USERNAME=root
    MONGO_INITDB_ROOT_PASSWORD=mySuperPasswod123
    ```

2. `.env` đặt ở thư mục backend, cùng cấp với folder `backend/src` (ví dụ minh hoạ):
    ```
    # backend/.env
    MONGO_URI=mongodb://root:mySuperPasswod123@localhost:27017/ia03_db?authSource=admin
    FRONTEND_URL=http://localhost:5173
    ```

**Lưu ý:**  
- Docker sẽ lấy user/pass từ .env trong folder database để tạo MongoDB.
- Backend sẽ dùng đúng user/pass đó trong `MONGO_URI` để kết nối database.
- Đảm bảo tên database (`ia03_db`) trong `MONGO_URI` đúng với mong muốn.  
- Nếu đổi tên user/pass ở `database/.env`, phải đổi tương ứng trong `backend/.env`.


- Backend sẽ chạy ở `http://localhost:3000`

### 4. Frontend Setup

```sh
cd frontend
npm install
cp .env.example .env   # (nếu có .env.example, hoặc tự tạo .env theo mẫu)
# Đảm bảo VITE_API_URL đúng trong .env (thường là http://localhost:5173)
npm run dev
```

- Frontend sẽ chạy ở `http://localhost:5173`

### 5. Truy cập ứng dụng

Mở trình duyệt và vào [http://localhost:5173](http://localhost:5173)

---

**Lưu ý:**  
- Nếu thay đổi cổng hoặc domain, hãy cập nhật lại biến môi trường ở cả frontend và backend cho khớp.
- Để dừng MongoDB:  
  ```sh
  docker-compose down
  ```
- Để tạo mới volumn (xoá database cũ)
  ```sh
  docker-compose down -v
  ```