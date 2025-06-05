# Study4 - Website Học Tiếng Anh

**Study4** là một nền tảng học tiếng Anh trực tuyến giúp người học nâng cao vốn từ vựng và kiến thức ngữ pháp thông qua nhiều chức năng tiện ích và thân thiện với người dùng.

## 🛠️ Hướng Dẫn Cài Đặt

### Yêu cầu:
- Node.js >= 18
- Trình quản lý gói **pnpm**

### Cài đặt và chạy dự án:

# Cài đặt các thư viện cần thiết
pnpm i

# Chạy dự án ở cổng (http://localhost:5173/)
pnpm dev

## 🎯 Tính Năng Chính

### 🔐 Xác Thực Người Dùng
- Đăng ký tài khoản mới.
- Đăng nhập.
- Quên mật khẩu.
- Chỉnh sửa thông tin cá nhân (họ tên, giới tính, trình độ...).

---

### 📚 Học Từ Vựng
- **Tra từ điển**: Tìm kiếm từ vựng tiếng Anh với dữ liệu API, bao gồm:
  - Nghĩa tiếng Việt.
  - Hình ảnh minh họa.
  - Phiên âm.
  - Ví dụ sử dụng.
- **Lưu từ vựng**: Người dùng có thể lưu từ mới vào Flashcard để học sau.
- **Flashcard**: Giao diện học từ qua flashcard. Có thể:
  - Lật thẻ để xem nghĩa.
  - Xoá từ đã học khỏi danh sách.
- **Trắc nghiệm từ vựng**: Làm bài kiểm tra từ vựng theo **chủ đề** để ôn tập và kiểm tra kiến thức.

---

### ✍️ Học Ngữ Pháp
- **Lý thuyết ngữ pháp**:
  - Hệ thống kiến thức **12 thì tiếng Anh**.
  - Phân loại các **loại từ** (danh từ, động từ, tính từ...).
- **Bài tập trắc nghiệm ngữ pháp**:
  - Làm bài tập phân loại theo từng loại từ.
  - Chấm điểm và theo dõi tiến độ học.

---

### 📊 Thống Kê Học Tập
- **Từ vựng đã học**:
  - Tính phần trăm số từ đã học trên tổng số từ đã lưu.
- **Bài tập đã làm**:
  - Thống kê số lượng bài tập trắc nghiệm đã hoàn thành.

---

## 🧪 Công Nghệ Sử Dụng

- **React** (v18.3.0): Thư viện JavaScript để xây dựng giao diện người dùng.
- **Vite** (v6.3.5): Công cụ build và phát triển frontend nhanh.
- **TypeScript** (v5.8.3): Ngôn ngữ lập trình có kiểu tĩnh trên nền JavaScript.
- **Ant Design** (v5.25.1) và **@ant-design/icons** (v6.0.0): Bộ thư viện UI components và icon cho React.
- **React Router** (v7.6.0): Thư viện điều hướng cho React.
- **Axios** (v1.9.0): Thư viện HTTP client để gọi API.
- **Day.js** (v1.11.13): Thư viện xử lý thời gian, thay thế nhẹ cho Moment.js.
- **Firebase** (v11.7.3): Nền tảng dịch vụ backend như Authentication, Database, Storage,...
- **Zustand** (v5.0.5): Thư viện quản lý trạng thái React nhẹ và đơn giản.
- **React Query** (@tanstack/react-query v5.79.0): Thư viện quản lý dữ liệu và cache API hiệu quả.

## Công cụ phát triển

- **ESLint** (v9.25.0) và các plugin hỗ trợ: Đảm bảo code sạch và theo chuẩn.
- **TypeScript ESLint**: Kiểm tra lỗi TypeScript.
- **TailwindCSS** (v3.4): Framework CSS tiện lợi để thiết kế giao diện nhanh.
- **PostCSS** và **Autoprefixer**: Xử lý CSS và tự động thêm tiền tố cho trình duyệt.
- **@vitejs/plugin-react**: Plugin hỗ trợ React trong Vite.

---

## 🚀 Mục Tiêu
Giúp người học tiếng Anh tự luyện tập hiệu quả thông qua hệ thống học liệu chất lượng, dễ sử dụng và có khả năng theo dõi tiến độ rõ ràng.

