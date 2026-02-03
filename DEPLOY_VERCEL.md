# Hướng Dẫn Deploy Lên Vercel

## 🚨 VẤN ĐỀ

Khi deploy lên Vercel gặp lỗi:
```
npm error ERESOLVE could not resolve
peer react@"^18.0.0" from react-leaflet@4.2.1
```

**Nguyên nhân:** 
- Project sử dụng React 19
- `react-leaflet` chỉ hỗ trợ React 18
- Xung đột peer dependencies

---

## ✅ GIẢI PHÁP ĐÃ ÁP DỤNG

### 1. **Tạo file `.npmrc`**
```
legacy-peer-deps=true
```
- Cho phép npm bỏ qua kiểm tra peer dependencies
- Áp dụng cho mọi lệnh npm install

### 2. **Cập nhật `package.json`**
```json
{
  "overrides": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```
- Override version của React
- Đảm bảo npm sử dụng đúng phiên bản

### 3. **Tạo file `vercel.json`**
```json
{
  "buildCommand": "npm install --legacy-peer-deps && npm run build",
  "framework": "vite",
  "installCommand": "npm install --legacy-peer-deps"
}
```
- Cấu hình Vercel sử dụng `--legacy-peer-deps`
- Override build command mặc định

---

## 🚀 CÁCH DEPLOY

### **Bước 1: Commit các file mới**
```bash
git add .npmrc
git add vercel.json
git add package.json
git commit -m "fix: Add Vercel deployment config for React 19"
git push origin master
```

### **Bước 2: Redeploy trên Vercel**
1. Vào Vercel Dashboard
2. Chọn project "HanhTrinhCuuNuoc"
3. Click **"Redeploy"** hoặc đợi auto-deploy

### **Bước 3: Kiểm tra build log**
- Build sẽ chạy với `--legacy-peer-deps`
- Không còn lỗi ERESOLVE

---

## 📋 CHECKLIST

- [x] Tạo file `.npmrc`
- [x] Thêm `overrides` vào `package.json`
- [x] Tạo file `vercel.json`
- [ ] Commit và push lên GitHub
- [ ] Vercel auto-deploy
- [ ] Kiểm tra website live

---

## 🔍 KIỂM TRA SAU KHI DEPLOY

### **1. Build Success**
```
✓ Build completed
✓ Deploying to production
✓ Deployment ready
```

### **2. Website hoạt động**
- ✅ Hero section hiển thị đúng
- ✅ Timeline section
- ✅ Map tương tác
- ✅ Gallery
- ✅ Scroll buttons
- ✅ Back to top button

### **3. Console không có lỗi**
- Mở DevTools (F12)
- Tab Console: không có errors đỏ
- Tab Network: tất cả resources load thành công

---

## ⚠️ LƯU Ý

### **Tại sao dùng `--legacy-peer-deps`?**
- React-leaflet chưa cập nhật hỗ trợ React 19
- Nhưng thực tế vẫn hoạt động tốt với React 19
- `--legacy-peer-deps` cho phép bỏ qua cảnh báo

### **Có an toàn không?**
- ✅ **An toàn** - React 19 backward compatible với React 18
- ✅ React-leaflet hoạt động bình thường
- ✅ Không ảnh hưởng đến performance

### **Khi nào cập nhật?**
- Đợi react-leaflet release phiên bản hỗ trợ React 19
- Hoặc migrate sang thư viện khác (nếu cần)

---

## 🐛 TROUBLESHOOTING

### **Nếu vẫn lỗi sau khi deploy:**

#### **1. Clear Vercel cache:**
```
Vercel Dashboard → Settings → General → Clear Cache
```

#### **2. Kiểm tra Environment Variables:**
```
Vercel Dashboard → Settings → Environment Variables
```
- Không cần thêm biến nào cho project này

#### **3. Kiểm tra Build & Output Settings:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```
- Vercel tự động detect từ `vercel.json`

#### **4. Manual deploy:**
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy thủ công
vercel --prod
```

---

## 📝 TÀI LIỆU THAM KHẢO

- [Vercel Documentation](https://vercel.com/docs)
- [React-Leaflet GitHub](https://github.com/PaulLeCam/react-leaflet)
- [NPM Legacy Peer Deps](https://docs.npmjs.com/cli/v8/using-npm/config#legacy-peer-deps)

---

## 🎉 KẾT QUẢ MONG ĐỢI

Sau khi deploy thành công:
- ✅ Website live tại: `https://your-project.vercel.app`
- ✅ Auto-deploy mỗi khi push to master
- ✅ Preview deployments cho mỗi PR
- ✅ SSL certificate tự động
- ✅ CDN toàn cầu
- ✅ Tốc độ load nhanh

**URL mẫu:** `https://hanh-trinh-cuu-nuoc.vercel.app`

---

## 📧 HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra build logs trên Vercel
2. Xem console errors trên browser
3. Kiểm tra file `.npmrc`, `vercel.json` đã commit chưa

**Good luck! 🚀**
