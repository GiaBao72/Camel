# PROJECT LOG

## 2026-04-18 - P1 Admin Mock (Neumorphism)

### Bắt đầu
- Scope: Tạo bộ trang admin mô phỏng cho Camel theo phong cách TypeUI Neumorphism.
- Mục tiêu P1: admin-login, dashboard, products CRUD mô phỏng bằng localStorage, có guard đăng nhập.
- Ràng buộc: Chưa tích hợp backend/API thật, dữ liệu chỉ mô phỏng để test UI/flow.
- Checklist triển khai:
  1. Tạo CSS/JS chung cho admin (neumorphism token, layout, state).
  2. Tạo trang admin-login.html.
  3. Tạo trang dashboard và products theo đề xuất.
  4. Mở rộng thêm orders/users/settings để hoàn thiện mô phỏng quản trị.
  5. Verify JS syntax + kiểm tra trạng thái git.

### Kết quả P1
- Đã tạo bộ trang admin mock hoàn chỉnh theo style Neumorphism:
  - main/admin-login.html
  - main/admin.html
  - main/admin-products.html
  - main/admin-orders.html
  - main/admin-users.html
  - main/admin-settings.html
- Đã tạo asset dùng chung:
  - main/assets/css/module-css/admin-neumorphism.css
  - main/assets/js/admin-mock.js
- Đã triển khai localStorage data model cho products/orders/users/settings và session login mock.
- Đã có các tính năng mô phỏng chính:
  - Login giả lập + guard truy cập trang admin.
  - Dashboard tổng quan KPI + cảnh báo tồn kho + đơn gần nhất.
  - Product CRUD mô phỏng (thêm, lọc, tìm, đổi trạng thái, xóa).
  - Orders: đổi trạng thái pending/shipping/done/cancelled.
  - Users: thêm user nội bộ mô phỏng.
  - Settings: lưu thông số cấu hình mock.
- Verify kỹ thuật:
  - node --check main/assets/js/admin-mock.js: pass
  - node --check main/assets/js/script.js: pass

## 2026-04-18 - P2 Admin Mock Upgrade (No storefront impact)

### Bắt đầu
- Scope: Nâng cấp bộ admin mock theo hướng giống vận hành thật hơn, vẫn dùng localStorage.
- Ràng buộc bắt buộc:
  - Không chỉnh main/index.html.
  - Không chỉnh main/assets/js/script.js (storefront).
  - Chỉ chỉnh các file admin riêng và asset admin.
- Checklist triển khai:
  1. Products: edit inline, hỗ trợ ảnh (URL), sort và phân trang.
  2. Orders: lọc theo trạng thái, xem detail đơn, export CSV.
  3. Dashboard: thêm chart mô phỏng doanh thu 7 ngày bằng canvas.
  4. Cập nhật UI/UX và state theo style Neumorphism.
  5. Verify syntax + git status + commit/push nhánh Giang.

### Kết quả P2
- Đã nâng cấp Products:
  - Thêm field ảnh sản phẩm (URL).
  - Thêm sort (giá/tồn kho) và phân trang bảng.
  - Thêm luồng edit sản phẩm riêng (chọn edit từ bảng -> cập nhật form -> lưu).
- Đã nâng cấp Orders:
  - Lọc theo trạng thái + tìm theo mã/tên khách.
  - Modal xem chi tiết đơn (items + ghi chú).
  - Export CSV theo bộ lọc hiện tại.
- Đã nâng cấp Dashboard:
  - Thêm biểu đồ doanh thu 7 ngày bằng canvas.
  - Có nút regen dữ liệu mô phỏng.
- Đảm bảo ràng buộc không ảnh hưởng storefront:
  - Không chỉnh main/index.html.
  - Không chỉnh main/assets/js/script.js.
  - Chỉ chỉnh file admin và asset admin.
- Verify kỹ thuật:
  - node --check main/assets/js/admin-mock.js: pass
  - node --check main/assets/js/script.js: pass

## 2026-04-18 - P3 Admin Typography Readability

### Bắt đầu
- Scope: Đổi font trang admin sang kiểu cơ bản, dễ nhìn, trung tính.
- Ràng buộc: Chỉ chỉnh style admin, không đụng storefront.
- Checklist:
  1. Đổi font-family global của admin sang sans-serif dễ đọc.
  2. Giữ nguyên layout/chức năng.
  3. Verify syntax JS và trạng thái git.

### Kết quả P3
- Đã đổi toàn bộ font admin sang Inter/Segoe UI/Roboto/Arial (sans-serif dễ đọc).
- Đã cập nhật link Google Font trên các trang admin*.html.
- Không thay đổi layout/chức năng, chỉ đổi typography.
- Verify kỹ thuật:
  - node --check main/assets/js/admin-mock.js: pass
  - node --check main/assets/js/script.js: pass

## 2026-04-18 - P4 Việt hóa toàn bộ trang Admin

### Bắt đầu
- Scope: Việt hóa toàn bộ giao diện admin (login/dashboard/products/orders/users/settings) và text hiển thị từ JS.
- Ràng buộc: Không đụng storefront; chỉ đổi text/nhãn hiển thị, giữ nguyên logic.
- Checklist:
  1. Việt hóa title, menu, heading, label, button trên toàn bộ admin*.html.
  2. Việt hóa text động trong admin-mock.js (badge trạng thái, role, thông báo, metadata).
  3. Giữ value kỹ thuật (active/inactive/pending...) cho logic, chỉ đổi phần hiển thị.
  4. Verify syntax và trạng thái git.

### Kết quả P4
- Đã Việt hóa toàn bộ menu điều hướng admin: Tổng quan, Sản phẩm, Đơn hàng, Người dùng, Cài đặt.
- Đã Việt hóa title/meta/nhãn/nút trên tất cả trang admin:
  - admin-login.html
  - admin.html
  - admin-products.html
  - admin-orders.html
  - admin-users.html
  - admin-settings.html
- Đã Việt hóa text động trong main/assets/js/admin-mock.js:
  - Map hiển thị trạng thái: active/inactive/pending/shipping/done/cancelled -> tiếng Việt.
  - Map hiển thị vai trò: owner/manager/staff -> tiếng Việt.
  - Đổi nhãn nút động: Sửa, Đổi trạng thái, Chi tiết.
  - Badge trạng thái trên Dashboard/Products/Orders/Users đều hiển thị tiếng Việt.
- Giữ nguyên value kỹ thuật để không ảnh hưởng logic lọc/sắp xếp/cập nhật trạng thái.
- Verify kỹ thuật:
  - node --check main/assets/js/admin-mock.js: pass
  - node --check main/assets/js/script.js: pass
