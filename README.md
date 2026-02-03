# Landing Page - Hành Trình Cứu Nước của Chủ tịch Hồ Chí Minh

## Giới thiệu

Landing page tương tác về hành trình cứu nước của Chủ tịch Hồ Chí Minh, từ năm 1911 đến 1969. Trang web sử dụng bản đồ tương tác với animation để thể hiện từng cột mốc lịch sử quan trọng trong cuộc đời vĩ đại của Người.

## Tính năng chính

### 1. **Hero Section**
- Thiết kế ấn tượng với màu sắc chủ đạo đỏ-vàng (màu cờ Việt Nam)
- Animation gradient và hiệu ứng lưới di chuyển
- Typography rõ ràng, dễ đọc

### 2. **Timeline Lịch Sử**
- Hiển thị 11 cột mốc quan trọng trong hành trình cứu nước
- Layout timeline theo phong cách zigzag chuyên nghiệp
- Mỗi cột mốc bao gồm:
  - Năm tháng
  - Địa điểm
  - Sự kiện chính
  - Mô tả chi tiết
  - Ý nghĩa lịch sử
- Animation fade-in khi scroll

### 3. **Bản Đồ Tương Tác**
- **Công nghệ**: Leaflet.js + React-Leaflet
- **Tính năng**:
  - Hiển thị hành trình qua 11 địa điểm trên thế giới
  - Animation tự động phát (auto-play) qua từng điểm
  - Đường đi kết nối các điểm theo thứ tự thời gian
  - Marker đặc biệt cho điểm hiện tại (hiệu ứng pulse)
  - Popup chi tiết khi click vào marker
  - Nút điều khiển: Phát/Tạm dừng, Đặt lại, Xem toàn cảnh
  - Hộp thông tin hiển thị bước hiện tại

### 4. **Gallery Hình Ảnh**
- Grid responsive với 6 hình ảnh lịch sử
- Hiệu ứng hover với caption xuất hiện
- Hình ảnh minh họa các địa điểm quan trọng

### 5. **Legacy Section**
- Câu nói bất hủ của Bác
- Thống kê ý nghĩa (30 năm tìm đường cứu nước, 30+ quốc gia, ...)
- Thiết kế gradient background ấn tượng

### 6. **Responsive Design**
- Tối ưu cho mọi kích thước màn hình
- Mobile-friendly
- Timeline điều chỉnh layout trên mobile

## Công nghệ sử dụng

- **React 19** - Frontend framework
- **Vite** - Build tool
- **Leaflet.js** - Thư viện bản đồ
- **React-Leaflet** - React wrapper cho Leaflet
- **CSS3** - Animations và styling
- **OpenStreetMap** - Dữ liệu bản đồ

## Cài đặt và Chạy

### Yêu cầu
- Node.js >= 16
- npm hoặc yarn

### Các bước

1. **Clone hoặc đã có project**

2. **Cài đặt dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở trình duyệt**
Truy cập: `http://localhost:5173`

5. **Build cho production**
```bash
npm run build
```

## Cấu trúc dữ liệu

### Journey Data
Mỗi điểm trong hành trình bao gồm:
```javascript
{
  id: Number,
  year: String,
  location: String,
  coordinates: [lat, lng],
  event: String,
  description: String,
  milestone: String
}
```

### Danh sách 11 cột mốc:
1. **1911** - Sài Gòn - Lên đường tìm đường cứu nước
2. **1911-1917** - Paris - Hoạt động cách mạng tại Pháp
3. **1920** - Tours - Tham gia sáng lập Đảng Cộng sản Pháp
4. **1923** - Moscow - Học tập tại Liên Xô
5. **1924-1927** - Quảng Châu - Thành lập Hội Việt Nam Cách mạng Thanh niên
6. **1928** - Bangkok - Hoạt động tại Đông Nam Á
7. **1930** - Hong Kong - Thành lập Đảng Cộng sản Việt Nam
8. **1941** - Pác Bó - Trở về Việt Nam sau 30 năm
9. **1945** - Hà Nội - Cách mạng Tháng Tám thành công
10. **1946-1954** - Việt Bắc - Kháng chiến chống Pháp
11. **1954-1969** - Hà Nội - Xây dựng và thống nhất đất nước

## Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong `src/index.css`:
```css
:root {
  --color-primary: #DA251D;    /* Đỏ cờ */
  --color-secondary: #FFCD00;  /* Vàng sao */
  --color-gold: #D4AF37;       /* Vàng đồng */
}
```

### Thêm/sửa dữ liệu hành trình
Chỉnh sửa mảng `journeyData` trong `src/App.jsx`

### Điều chỉnh tốc độ animation
Thay đổi interval trong useEffect:
```javascript
interval = setInterval(() => {
  // ...
}, 4000); // 4 giây/bước, có thể thay đổi
```

## Tối ưu hóa

### Performance
- Sử dụng React.memo cho các component con nếu cần
- Lazy loading cho hình ảnh
- Code splitting cho các section lớn

### SEO
- Thêm meta tags trong `index.html`
- Structured data cho nội dung lịch sử
- Open Graph tags cho social sharing

## Lưu ý kỹ thuật

1. **Leaflet CSS**: Đã import trong App.jsx để đảm bảo styles hoạt động đúng
2. **Icon Issue**: Đã fix vấn đề marker icon mặc định của Leaflet bằng CDN
3. **Peer Dependencies**: Sử dụng `--legacy-peer-deps` do React 19 chưa được react-leaflet hỗ trợ chính thức
4. **Map Center**: Mặc định center tại Hà Nội, zoom level 4 để xem toàn bộ hành trình

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

Educational project - Free to use for learning purposes.

## Tác giả

Được thiết kế với tâm huyết để tưởng nhớ và giáo dục thế hệ trẻ về hành trình vĩ đại của Chủ tịch Hồ Chí Minh.

---

**"Không có gì quý hơn độc lập tự do"** - Hồ Chí Minh
