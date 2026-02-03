import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Fix Leaflet default icon issue
if (L.Icon.Default.prototype._getIconUrl) {
  delete L.Icon.Default.prototype._getIconUrl;
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Import ảnh từ assets
import roiBenNhaRongImg from './assets/roi-ben-nha-rong.jpg';
import marseilleImg from './assets/marseille.jpg';
import sinhSongTaiAnhImg from './assets/sinh-song-tai-anh.jpg';
import hoatDongCmParisImg from './assets/hoat-dong-cm-paris.jpg';
import toursImg from './assets/tours.jpg';
import quocTeCongSanImg from './assets/quoc-te-cong-san.jpg';
import thanhLapHoiCmThanhNienVnImg from './assets/thanh-lap-hoi-cm-thanh-nien-vn.jpg';
import bacHoTaiXiemImg from './assets/bac-hđ-tai-xiem-(thailan).jpg';
import thanhLapDangImg from './assets/thanh-lap-dang.jpg';
import biGiamHdLienXoImg from './assets/bi-giam-hđ-lien-xo.jpg';
import veNuocImg from './assets/ve-nuoc.jpg';
import biGiamTaiTrungQuocImg from './assets/bi-giam-tai-trung-quoc.gif';
import chuanBiTongKhoiNghiaImg from './assets/chuan-bi-tong-khoi-nghia.jpg';
import daiHoiQuocDanImg from './assets/dai-hoi-quoc-dan.jpg';
import bacHoDocTuyenNgonImg from './assets/bac ho doc tuyen ngon.jpg';
import khangChienChongPhapImg from './assets/khang-chien-chong-phap.jpg';
import xayDungMienBacGiaiPhongMienNamImg from './assets/xay-dung-mien-bac-giai-phong-mien-nam.jpg';
import anhBacHoImg from './assets/anh-bac-ho.jpg';

// Dữ liệu hành trình cứu nước của Chủ tịch Hồ Chí Minh
const journeyData = [
  {
    id: 1,
    year: '5/6/1911',
    location: 'Sài Gòn',
    coordinates: [10.8231, 106.6297],
    event: 'Rời bến Nhà Rồng tìm đường cứu nước',
    description: 'Ngày 5 tháng 6 năm 1911, thanh niên Nguyễn Tất Thành 21 tuổi, làm phụ bếp trên tàu Amiral Latouche-Tréville, rời bến Nhà Rồng (Sài Gòn) ra đi tìm đường cứu nước. Người mang theo khát vọng giải phóng dân tộc và niềm tin vào con đường đấu tranh giành độc lập.',
    milestone: 'Khởi đầu hành trình 30 năm đi tìm đường cứu nước, đi 5 châu 4 bể',
    image: roiBenNhaRongImg
  },
  {
    id: 2,
    year: '1911-1912',
    location: 'Marseille',
    coordinates: [43.2965, 5.3698],
    event: 'Đến Marseille, Pháp',
    description: 'Sau khi đi qua nhiều nước, Người đến Marseille (Pháp). Tại đây, Người làm nhiều nghề để kiếm sống và tìm hiểu về phong trào cách mạng. Người nhận thấy sự bất công của chủ nghĩa thực dân đối với người dân thuộc địa.',
    milestone: 'Bắt đầu tìm hiểu về phong trào công nhân và cách mạng châu Âu',
    image: marseilleImg
  },
  {
    id: 3,
    year: '1913-1917',
    location: 'London',
    coordinates: [51.5074, -0.1278],
    event: 'Sinh sống và làm việc tại Anh',
    description: 'Người sang London (Anh), làm việc tại khách sạn Carlton nổi tiếng. Tại đây, Người học tiếng Anh, tiếp xúc với phong trào công nhân Anh và nghiên cứu về chủ nghĩa tư bản.',
    milestone: 'Nâng cao trình độ ngoại ngữ và hiểu biết về xã hội tư bản',
    image: sinhSongTaiAnhImg
  },
  {
    id: 4,
    year: '1917-1923',
    location: 'Paris',
    coordinates: [48.8566, 2.3522],
    event: 'Hoạt động cách mạng tại Paris',
    description: 'Đầu năm 1919, Người gia nhập Đảng Xã hội Pháp. Ngày 18/6/1919, lấy tên Nguyễn Ái Quốc, thay mặt nhóm người Việt Nam yêu nước tại Pháp, Người gửi Bản yêu sách 8 điểm đến Hội nghị Versailles (Hội nghị hòa bình) đòi quyền tự do, dân chủ cho nhân dân Việt Nam và các nước thuộc địa. Bản yêu sách được đăng trên báo L\'Humanité và nhiều báo tiến bộ châu Âu. Người tham gia sáng lập Hội Liên hiệp thuộc địa và báo Le Paria.',
    milestone: 'Bản yêu sách 8 điểm (18/6/1919) - Tiếng nói đầu tiên của dân tộc Việt Nam tại quốc tế',
    image: hoatDongCmParisImg
  },
  {
    id: 5,
    year: '12/1920',
    location: 'Tours',
    coordinates: [47.3941, 0.6848],
    event: 'Đại hội Tours - Tìm thấy con đường cứu nước',
    description: 'Ngày 25-30/12/1920, Nguyễn Ái Quốc tham dự Đại hội lần thứ XVIII của Đảng Xã hội Pháp tại Tours. Người bỏ phiếu tán thành gia nhập Quốc tế Cộng sản (Quốc tế III), trở thành người sáng lập Đảng Cộng sản Pháp. Đây là bước ngoặt quan trọng, Người tìm thấy con đường giải phóng dân tộc - chủ nghĩa Mác-Lênin.',
    milestone: 'Tìm thấy con đường cứu nước - Chủ nghĩa Mác-Lênin, chủ nghĩa cộng sản',
    image: toursImg
  },
  {
    id: 6,
    year: '1923-1924',
    location: 'Mátxcơva',
    coordinates: [55.7558, 37.6173],
    event: 'Học tập và làm việc tại Quốc tế Cộng sản',
    description: 'Từ tháng 6/1923 đến tháng 11/1924, Người làm việc tại Quốc tế Cộng sản ở Mátxcơva. Tham dự Hội nghị Quốc tế Nông dân lần thứ nhất, Đại hội V Quốc tế Cộng sản, Đại hội III Quốc tế Công hội Đỏ, Đại hội IV Quốc tế Thanh niên. Tại các diễn đàn, Người nói lên tiếng nói của nhân dân thuộc địa, bảo vệ luận điểm của V.I.Lênin về vấn đề dân tộc và thuộc địa. Người xuất bản sách "Trung Quốc và thanh niên Trung Quốc".',
    milestone: 'Hoàn thiện thế giới quan Mác-Lênin, đại diện tiếng nói thuộc địa tại Quốc tế',
    image: quocTeCongSanImg
  },
  {
    id: 7,
    year: '1924-1927',
    location: 'Quảng Châu',
    coordinates: [23.1291, 113.2644],
    event: 'Thành lập Hội Việt Nam Cách mạng Thanh niên',
    description: 'Từ tháng 11/1924 đến năm 1927, Người làm việc trong Đoàn cố vấn Chính phủ Liên Xô bên cạnh Chính phủ Tôn Dật Tiên tại Quảng Châu. Tháng 6/1925, thành lập Hội Việt Nam Cách mạng Thanh niên tại số nhà 13A đường Văn Minh. Người trực tiếp mở lớp huấn luyện đào tạo cán bộ cách mạng, ra báo Thanh niên - tờ báo cách mạng đầu tiên của Việt Nam, viết tác phẩm "Đường Kách mệnh" truyền bá chủ nghĩa Mác-Lênin về nước, chuẩn bị cho việc thành lập Đảng.',
    milestone: 'Thành lập Hội Việt Nam Cách mạng Thanh niên - tổ chức tiền thân của Đảng',
    image: thanhLapHoiCmThanhNienVnImg
  },
  {
    id: 8,
    year: '1928-1929',
    location: 'Bangkok',
    coordinates: [13.7563, 100.5018],
    event: 'Hoạt động tại Xiêm (Thái Lan)',
    description: 'Sau khi rời Quảng Châu do chính quyền Quốc Dân Đảng đàn áp cộng sản, Người đến Bangkok (Xiêm). Tại đây, Người tiếp tục liên lạc, chỉ đạo phong trào cách mạng Việt Nam, chuẩn bị hợp nhất các tổ chức cộng sản đang hoạt động rời rạc trong nước.',
    milestone: 'Chuẩn bị điều kiện hợp nhất các tổ chức cộng sản thành Đảng thống nhất',
    image: bacHoTaiXiemImg
  },
  {
    id: 9,
    year: '3/2/1930',
    location: 'Hương Cảng',
    coordinates: [22.3193, 114.1694],
    event: 'Thành lập Đảng Cộng sản Việt Nam',
    description: 'Ngày 3/2/1930, tại Cửu Long, Hương Cảng (Hong Kong), Người chủ trì Hội nghị hợp nhất 3 tổ chức cộng sản (Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng, Đông Dương Cộng sản Liên đoàn) thành Đảng Cộng sản Việt Nam thống nhất. Tháng 10/1930, Quốc tế Cộng sản đổi tên thành Đảng Cộng sản Đông Dương. Đây là sự kiện có ý nghĩa lịch sử vĩ đại nhất đối với dân tộc Việt Nam.',
    milestone: 'Đảng Cộng sản Việt Nam ra đời - sự kiện quan trọng nhất của cách mạng Việt Nam',
    image: thanhLapDangImg
  },
  {
    id: 10,
    year: '1931-1938',
    location: 'Hương Cảng, Mátxcơva',
    coordinates: [22.3193, 114.1694],
    event: 'Bị giam và hoạt động tại Liên Xô',
    description: 'Giữa năm 1931, Người bị chính quyền Anh bắt giam tại Hương Cảng. Đầu năm 1933 được trả tự do. Từ 1934-1938, Người học tập, nghiên cứu và giảng dạy tại Viện Nghiên cứu các vấn đề dân tộc và thuộc địa ở Mátxcơva, tiếp tục theo dõi, chỉ đạo phong trào cách mạng trong nước. Tháng 10/1938, Người rời Liên Xô sang Trung Quốc, bắt liên lạc với tổ chức Đảng chuẩn bị về nước.',
    milestone: 'Vượt qua thử thách khắc nghiệt, kiên trì chỉ đạo cách mạng từ xa',
    image: biGiamHdLienXoImg
  },
  {
    id: 11,
    year: '28/1/1941',
    location: 'Pác Bó, Cao Bằng',
    coordinates: [22.7167, 106.2500],
    event: 'Về nước sau 30 năm đi tìm đường cứu nước',
    description: 'Ngày 28/1/1941, sau 30 năm ra đi, Người đã đặt chân lên mảnh đất địa đầu Tổ quốc qua biên giới Cao Bằng, lưu lại hang Pác Bó. Người lấy tên là Hồ Chí Minh. Tháng 5/1941, triệu tập Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng quyết định đường lối cứu nước trong thời kỳ mới, thành lập Việt Nam Độc lập Đồng minh (Việt Minh), tổ chức xây dựng lực lượng vũ trang giải phóng, xây dựng căn cứ địa cách mạng.',
    milestone: 'Trở về Tổ quốc, lấy tên Hồ Chí Minh, thành lập Mặt trận Việt Minh',
    image: veNuocImg
  },
  {
    id: '11b',
    year: '8/1942-9/1943',
    location: 'Quảng Tây, Trung Quốc',
    coordinates: [23.7247, 108.3209],
    event: 'Bị giam tại Trung Quốc',
    description: 'Từ tháng 8/1942 đến tháng 9/1943, lấy tên Hồ Chí Minh, Người sang Trung Quốc đại diện cho Mặt trận Việt Minh và Phân hội Việt Nam thuộc Hiệp hội Quốc tế chống xâm lược, tìm sự liên minh quốc tế cùng phối hợp hành động chống phát xít. Tại đây, Người bị chính quyền Tưởng Giới Thạch bắt giam tại các nhà tù ở tỉnh Quảng Tây. Trong tù, Người sáng tác "Nhật ký trong tù" - tác phẩm bất hủ của văn học Việt Nam.',
    milestone: '"Nhật ký trong tù" - Bất khuất trong ngục tù, vẫn giữ vững tinh thần cách mạng',
    image: biGiamTaiTrungQuocImg
  },
  {
    id: 12,
    year: '1944-1945',
    location: 'Cao Bằng, Việt Bắc',
    coordinates: [22.6667, 106.2500],
    event: 'Chuẩn bị tổng khởi nghĩa',
    description: 'Những năm 1944-1945, Người trở về nước trực tiếp chỉ đạo cách mạng Việt Nam. Ngày 22/12/1944, thành lập Đội Việt Nam Tuyên truyền Giải phóng quân - tiền thân của Quân đội nhân dân Việt Nam. Người chỉ đạo xây dựng lực lượng, mở rộng căn cứ địa, chuẩn bị mọi mặt cho cuộc Tổng khởi nghĩa giành chính quyền.',
    milestone: 'Thành lập Quân đội nhân dân Việt Nam, chuẩn bị tổng khởi nghĩa',
    image: chuanBiTongKhoiNghiaImg
  },
  {
    id: 13,
    year: '16-17/8/1945',
    location: 'Tân Trào, Tuyên Quang',
    coordinates: [21.8167, 105.2167],
    event: 'Đại hội Quốc dân - Phát động Tổng khởi nghĩa',
    description: 'Ngày 13-15/8/1945, Hội nghị toàn quốc của Đảng họp tại Tân Trào quyết định phát động Tổng khởi nghĩa giành chính quyền. Ngày 16-17/8/1945, Đại hội Quốc dân họp tại Tân Trào, thông qua Lời kêu gọi Tổng khởi nghĩa và Chương trình hành động. Người được bầu làm Chủ tịch Ủy ban Dân tộc Giải phóng Việt Nam. Cách mạng Tháng Tám bùng nổ khắp cả nước.',
    milestone: 'Phát động Tổng khởi nghĩa Tháng Tám - "Giờ quyết định đã đến"',
    image: daiHoiQuocDanImg
  },
  {
    id: 14,
    year: '2/9/1945',
    location: 'Hà Nội',
    coordinates: [21.0285, 105.8542],
    event: 'Tuyên ngôn Độc lập - Nước Việt Nam Dân chủ Cộng hòa ra đời',
    description: 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Hà Nội, trước hàng trăm ngàn đồng bào cả nước, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa - Nhà nước công nông đầu tiên ở Đông Nam Á. "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do và độc lập". Hành trình 34 năm tìm đường cứu nước đã thành công mỹ mãn.',
    milestone: 'Nước Việt Nam Dân chủ Cộng hòa ra đời - Kỷ nguyên độc lập, tự do',
    image: bacHoDocTuyenNgonImg
  },
  {
    id: 15,
    year: '1946-1954',
    location: 'Chiến khu Việt Bắc',
    coordinates: [21.5833, 105.8333],
    event: 'Chín năm kháng chiến chống thực dân Pháp',
    description: 'Từ 19/12/1946, Người lãnh đạo toàn quân, toàn dân tiến hành cuộc kháng chiến trường kỳ chống thực dân Pháp xâm lược. Người ở chiến khu Việt Bắc, nêu cao tinh thần "Kháng chiến nhất định thắng lợi" và phương châm "Trường kỳ kháng chiến, tự lực cánh sinh". Chiến dịch Điện Biên Phủ (1954) đại thắng, Hiệp định Geneva ký kết.',
    milestone: 'Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" - Miền Bắc hoàn toàn giải phóng',
    image: khangChienChongPhapImg
  },
  {
    id: 16,
    year: '1954-1969',
    location: 'Hà Nội',
    coordinates: [21.0285, 105.8542],
    event: 'Xây dựng miền Bắc xã hội chủ nghĩa, giải phóng miền Nam',
    description: 'Sau Hiệp định Geneva, Người lãnh đạo công cuộc xây dựng chủ nghĩa xã hội ở miền Bắc: cải cách ruộng đất, khôi phục kinh tế, xây dựng cơ sở vật chất. Đồng thời, Người chỉ đạo cuộc đấu tranh giải phóng miền Nam thống nhất đất nước. Ngày 2/9/1969, Người từ trần tại Hà Nội, để lại Di chúc thiêng liêng. Năm 1975, miền Nam hoàn toàn giải phóng, đất nước thống nhất theo di nguyện của Người.',
    milestone: 'Xây dựng miền Bắc xã hội chủ nghĩa - hậu phương vững chắc chi viện tiền tuyến',
    image: xayDungMienBacGiaiPhongMienNamImg
  }
];

// Custom icon ghim (pin) với label tiếng Việt
const createCustomIcon = (isActive, location) => {
  const pinColor = isActive ? '#FFCD00' : '#DA251D';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <!-- Ghim (Pin) -->
        <svg width="40" height="50" viewBox="0 0 40 50" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3)); ${isActive ? 'animation: bounce 1s ease-in-out infinite;' : ''}">
          <!-- Thân ghim -->
          <path d="M20 0 C10 0, 2 8, 2 18 C2 28, 20 50, 20 50 C20 50, 38 28, 38 18 C38 8, 30 0, 20 0 Z" 
                fill="${pinColor}" 
                stroke="white" 
                stroke-width="2"/>
          <!-- Viền trong -->
          <circle cx="20" cy="18" r="8" fill="white" opacity="0.3"/>
          <!-- Điểm giữa -->
          <circle cx="20" cy="18" r="5" fill="white"/>
        </svg>
        
        <!-- Label địa điểm -->
        <div style="
          margin-top: -5px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.98);
          border: 2px solid ${pinColor};
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          color: #1a1a1a;
          white-space: nowrap;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        ">${location}</div>
      </div>
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      </style>
    `,
    iconSize: [120, 80],
    iconAnchor: [60, 50],
  });
};

// Component để tự động bay đến vị trí
function FlyToLocation({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 2
      });
    }
  }, [center, zoom, map]);
  
  return null;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mapCenter, setMapCenter] = useState([21.0285, 105.8542]);
  const [mapZoom, setMapZoom] = useState(4);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const timelineRef = useRef(null);
  
  // Memoize journey path to avoid recalculation
  const journeyPath = useMemo(() => journeyData.map(point => point.coordinates), []);

  // Auto-play animation
  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < journeyData.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next >= journeyData.length) {
            setIsPlaying(false);
            return prev;
          }
          return next;
        });
      }, 4000);
    } else if (currentStep >= journeyData.length - 1) {
      setIsPlaying(false);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  // Update map when step changes
  useEffect(() => {
    if (journeyData[currentStep]) {
      setMapCenter(journeyData[currentStep].coordinates);
      setMapZoom(6);
    }
  }, [currentStep]);

  // Animate timeline items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  // Handle scroll detection for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Smooth scroll to timeline section
  const scrollToTimeline = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>HÀNH TRÌNH CỨU NƯỚC</h1>
          <p className="hero-subtitle">Chủ tịch Hồ Chí Minh</p>
          <p className="hero-dates">1890 - 1969</p>
        </div>
        <div className="scroll-indicator" onClick={scrollToTimeline}>
          <span>↓</span>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" id="timeline">
        <h2 className="section-title">Dòng Thời Gian Lịch Sử</h2>
        <p className="timeline-intro">
          Từ một chàng thanh niên yêu nước lên đường tìm đường cứu nước, 
          đến vị lãnh tụ thiên tài của dân tộc Việt Nam. 
          Hành trình 30 năm đi tìm chân lý cách mạng đã đưa Người đến với chủ nghĩa Mác - Lênin, 
          và từ đó thành lập nên Đảng Cộng sản Việt Nam, lãnh đạo nhân dân ta giành được độc lập, tự do.
        </p>
        
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>
          {journeyData.map((item, index) => (
            <div key={item.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-text">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-location">{item.location}</div>
                    <h3 style={{ color: '#DA251D', marginBottom: '1rem' }}>{item.event}</h3>
                  </div>
                  <div className="timeline-image">
                    <img src={item.image} alt={item.event} loading="lazy" />
                  </div>
                </div>
                <p className="timeline-description">{item.description}</p>
                <p style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: '#FFF9E6', 
                  borderLeft: '3px solid #D4AF37',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <strong>Cột mốc:</strong> {item.milestone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="map-section" id="map">
        <h2 className="section-title">Hành Trình Trên Bản Đồ</h2>
        <p className="map-intro">
          Theo dõi hành trình cứu nước của Chủ tịch Hồ Chí Minh qua bản đồ tương tác. 
          Nhấn "Phát" để xem hành trình tự động, hoặc chọn từng điểm để tìm hiểu chi tiết.
        </p>
        
        <div className="map-container">
          <MapContainer
            center={[21.0285, 105.8542]}
            zoom={4}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
              className="map-tiles"
              maxZoom={19}
            />
            
            <FlyToLocation center={mapCenter} zoom={mapZoom} />
            
            {/* Draw the journey path */}
            <Polyline
              positions={journeyPath.slice(0, currentStep + 1)}
              color="#DA251D"
              weight={3}
              opacity={0.7}
              dashArray="10, 10"
            />
            
            {/* Markers for each location */}
            {journeyData.map((point, index) => (
              index <= currentStep && (
                <Marker
                  key={`marker-${point.id}`}
                  position={point.coordinates}
                  icon={createCustomIcon(index === currentStep, point.location)}
                  eventHandlers={{
                    click: () => handleStepClick(index)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h3>{point.event}</h3>
                      <p className="popup-year">{point.year} - {point.location}</p>
                      <p>{point.description}</p>
                      <p style={{ 
                        marginTop: '0.5rem', 
                        padding: '0.5rem', 
                        background: '#FFF9E6',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        {point.milestone}
                      </p>
      </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          
          {/* Map Controls */}
          <div className="map-controls">
            <button onClick={handlePlayPause}>
              {isPlaying ? '⏸ Tạm dừng' : '▶ Phát'}
            </button>
            <button onClick={handleReset}>
              ↺ Đặt lại
            </button>
            <button onClick={() => {
              setMapCenter([21.0285, 105.8542]);
              setMapZoom(4);
            }}>
              🌍 Xem toàn cảnh
        </button>
          </div>
          
          {/* Journey Info - Box nhỏ gọn */}
          <div className="journey-info">
            <h3>Bước {currentStep + 1}/{journeyData.length}</h3>
            <p className="current-location">{journeyData[currentStep]?.location}</p>
            <p><strong>{journeyData[currentStep]?.year}</strong></p>
            <p>{journeyData[currentStep]?.event}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <h2 className="section-title">Hình Ảnh Lịch Sử</h2>
        <p className="gallery-intro">
          Những hình ảnh lưu giữ khoảnh khắc lịch sử của Chủ tịch Hồ Chí Minh 
          trong hành trình cứu nước và xây dựng đất nước.
        </p>
        
        <div className="gallery-grid">
          {journeyData.map((item, index) => (
            <div key={`gallery-${item.id}`} className="gallery-item">
              <img 
                src={item.image} 
                alt={item.event}
                loading="lazy"
              />
              <div className="gallery-caption">
                <h3>{item.location}</h3>
                <p className="gallery-year">{item.year}</p>
                <p>{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legacy Section */}
      <section className="legacy-section" id="legacy">
        <h2 className="section-title">Di Sản Vĩ Đại</h2>
        <div className="legacy-content">
          <div className="legacy-quote">
            Không có gì quý hơn độc lập tự do
          </div>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
            Chủ tịch Hồ Chí Minh đã cống hiến cả cuộc đời mình cho sự nghiệp giải phóng dân tộc, 
            thống nhất đất nước, xây dựng chủ nghĩa xã hội. Tư tưởng Hồ Chí Minh là di sản vô giá, 
            mãi mãi soi đường cho dân tộc Việt Nam tiến lên.
          </p>
          
          <div className="legacy-stats">
            <div className="stat-item">
              <div className="stat-number">34</div>
              <div className="stat-label">Năm hành trình cứu nước (1911-1945)</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">16</div>
              <div className="stat-label">Cột mốc lịch sử quan trọng</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">79</div>
              <div className="stat-label">Năm cuộc đời cống hiến (1890-1969)</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Tình yêu vô bờ bến với Tổ quốc</div>
            </div>
          </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p><strong>Kính mừng kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh</strong></p>
        <p>19 tháng 5 năm 1890 - 2 tháng 9 năm 1969</p>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>
          "Bác Hồ sống mãi trong sự nghiệp của chúng ta"
        </p>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <span>↑</span>
      </button>
    </div>
  );
}

export default App;
