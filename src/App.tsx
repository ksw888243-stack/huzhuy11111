import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Play, Check, ChevronLeft } from 'lucide-react';

// ========================================================
// TYPES & DATA DEFINITIONS
// ========================================================

interface AboutTab {
  id: string;
  name: string;
  label: string;
  title: string;
  img: string;
  content: string;
}

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  img: string;
  category: string;
}

const ABOUT_DATA: AboutTab[] = [
  {
    id: "profile",
    name: "公司简介",
    label: "PROFILE",
    title: "公司简介 · 国际先锋建筑门户",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    content: "户之屹 HUZHIYI 创立于国际艺术与先锋建筑思潮的交汇点。我们不将入户门定义为阻隔空间的屏障，而是将其视为建筑结构向外延展的第一篇章。多年来，我们服务于全球高端庄园、海岛度假别墅以及高端地标商业体的定制交付，以极致克制的笔触，重塑门庭叙事。"
  },
  {
    id: "culture",
    name: "企业文化",
    label: "CULTURE",
    title: "企业文化 · 职业自豪感与大家庭般凝聚力",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    content: "对完美主义的偏执，根植于我们每一位设计师与高精工匠的心中。户之屹制造链上的每一员都饱含着对工艺极致微米的<b>职业自豪感</b>。我们深信，唯有将团队如大家庭一般的<b>深厚凝聚力</b>转化为无间协作，打磨每一处装甲骨架与极窄边界，才能赋予钢装甲结构以代代传承的温润生命力与尊贵价值。"
  },
  {
    id: "milestones",
    name: "发展历程",
    label: "MILESTONES",
    title: "发展历程 · 破浪前行的美学足迹",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    content: `
      <div class="space-y-6 mt-1 text-left">
        <div class="border-l border-[#bda27e] pl-5 relative before:content-[''] before:absolute before:left-[-4px] before:top-[6px] before:w-[7px] before:h-[7px] before:bg-[#bda27e] before:rounded-full pb-2">
          <div class="font-[600] text-sm text-[#111111]">2018 - 灵感诞生</div>
          <p class="text-xs text-[#666666] mt-1">核心传动实验室成立，专注于超大尺度地置装甲偏轴结构的应力平衡与传动调校。</p>
        </div>
        <div class="border-l border-[#bda27e] pl-5 relative before:content-[''] before:absolute before:left-[-4px] before:top-[6px] before:w-[7px] before:h-[7px] before:bg-[#bda27e] before:rounded-full pb-2">
          <div class="font-[600] text-sm text-[#111111]">2021 - 全球拓展</div>
          <p class="text-xs text-[#666666] mt-1">全面通过欧洲最高级别防盗性与高热阻断桥性能认证，启动跨国整案交付系统。</p>
        </div>
        <div class="border-l border-[#bda27e] pl-5 relative before:content-[''] before:absolute before:left-[-4px] before:top-[6px] before:w-[7px] before:h-[7px] before:bg-[#bda27e] before:rounded-full">
          <div class="font-[600] text-sm text-[#111111]">2025 - 先锋纪元</div>
          <p class="text-xs text-[#666666] mt-1">推出原生奢石覆面及5D触感系列，入驻北美及中东多处地标级庄园私宅。</p>
        </div>
      </div>
    `
  },
  {
    id: "production",
    name: "工厂展示",
    label: "PRODUCTION",
    title: "工厂展示 · 柔性高精度智造高地",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    content: "我们配备了前沿的智能柔性焊接生产线与高精密数控冲压机床，将工艺公差死死合拢在微米级别。每一件系统出厂前，都必须在数字化试验台经历超过 30 万次的重载无损疲劳测试以及严苛的声学与极端密封阻热考验，全方位确保在全球极端气候下的流畅运转。"
  },
  {
    id: "certificates",
    name: "资质荣誉",
    label: "CERTIFICATES",
    title: "资质荣誉 · 国际公认的卓越标准",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    content: `
      <p class="mb-4">通过对技术壁垒与先锋美学标准的长久死磕，户之屹 HUZHIYI 赢得了建筑行业内部难以动摇的尊崇。连续斩获红点先锋建筑构件设计奖项，并揽获多项国际权威证书。</p>
      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="border border-dashed border-[#bda27e] p-3.5 bg-[#fffcf8] text-[11px] font-normal text-center text-[#111111]">欧洲标准 RC4 防盗认证</div>
        <div class="border border-dashed border-[#bda27e] p-3.5 bg-[#fffcf8] text-[11px] font-normal text-center text-[#111111]">欧盟 CE 建筑安全准入</div>
        <div class="border border-dashed border-[#bda27e] p-3.5 bg-[#fffcf8] text-[11px] font-normal text-center text-[#111111]">断桥重型结构多项发明专利</div>
        <div class="border border-dashed border-[#bda27e] p-3.5 bg-[#fffcf8] text-[11px] font-normal text-center text-[#111111]">全球豪宅建筑学优秀合办商</div>
      </div>
    `
  }
];

const DOOR_CATEGORIES = [
  { id: "pivot", title: "偏轴门系统 (Pivot Doors)", label: "偏轴门", num: "01 / PIVOT", type: "door-piv" },
  { id: "single", title: "单开门系统 (Single Swing Doors)", label: "单开门", num: "02 / SINGLE", type: "door-sin" },
  { id: "double", title: "双开门系统 (Double Swing Doors)", label: "双开门", num: "03 / DOUBLE", type: "door-dbl" },
  { id: "iron", title: "现代铁艺门系统 (Wrought Iron Doors)", label: "铁艺门", num: "04 / ARTISAN", type: "door-iron" },
  { id: "garage", title: "车库门系统 (Garage Doors)", label: "车库门", num: "05 / GARAGE", type: "door-gar" }
];

const STYLE_CARDS = [
  {
    id: "MINIMALIST",
    title: "极简风 (MINIMALIST)",
    fullTitle: "极简风艺术系列 (MINIMALIST SERIES)",
    desc: "隐框设计与极窄边框立面，追求建筑线条最纯粹的科技冷调留白。",
    img: "https://i.ibb.co/mFPYWQz7/door-1-png.jpg",
    imagePool: [
      "https://i.ibb.co/6JHrQSV8/door-2-png.jpg",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80"
    ],
    nameMapping: "极简镜面立体隐框门"
  },
  {
    id: "WOOD",
    title: "木纹转印风 (WOOD GRAIN)",
    fullTitle: "木纹转印风原生系列 (WOOD GRAIN SERIES)",
    desc: "超高精密转印重塑原生木润纹理，赋予坚固钢装甲自然生命力。",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
    imagePool: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80"
    ],
    nameMapping: "原生珍稀木纹传动平衡门"
  },
  {
    id: "STONE",
    title: "奢石风 (LUXURY STONE)",
    fullTitle: "稀缺奢石风永恒系列 (LUXURY STONE SERIES)",
    desc: "采用天然稀缺大理石或岩板覆盖面板，亿年造化，无可复制。",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80",
    imagePool: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=500&q=80"
    ],
    nameMapping: "大理石晶体奢石覆盖门"
  },
  {
    id: "5D",
    title: "5D打印风 (5D EMBOSSED)",
    fullTitle: "5D立体浮雕数码系列 (5D EMBOSSED SERIES)",
    desc: "微立体多层高精浮雕工艺，将前沿数字几何纹理以3D触感立体呈献。",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
    imagePool: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=500&q=80"
    ],
    nameMapping: "数字立体几何高精浮雕门"
  }
];

export default function App() {
  // Navigation states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // Tab State (About Us)
  const [aboutTabIndex, setAboutTabIndex] = useState(0);
  const [aboutFade, setAboutFade] = useState(true);

  // Products state machine
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<typeof STYLE_CARDS[0] | null>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // News active tab filter
  const [newsFilter, setNewsFilter] = useState("ARCHITECTURAL DESIGN");

  // Video modal state
  const [playingVideo, setPlayingVideo] = useState<{title: string; url: string} | null>(null);

  // Contact form submission custom React Alert/Dialogue
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // Handle Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Very simple active section highlight on scroll
      const sections = ["about", "products", "services", "cases", "news", "video", "contact"];
      let currentSection = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
          }
        }
      }
      setActiveNav(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle about tab transitions with fade effects
  const triggerAboutTabSwitch = (index: number) => {
    setAboutFade(false);
    setTimeout(() => {
      setAboutTabIndex(index);
      setAboutFade(true);
    }, 250);
  };

  // Switch Category and scroll to focus anchor
  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setSelectedStyle(null);
    scrollToProducts();
  };

  const handleStyleSelect = (style: typeof STYLE_CARDS[0]) => {
    setSelectedStyle(style);
    scrollToProducts();
  };

  const resetToCategories = () => {
    setSelectedCategory(null);
    setSelectedStyle(null);
    scrollToProducts();
  };

  const resetToStyles = () => {
    setSelectedStyle(null);
    scrollToProducts();
  };

  const scrollToProducts = () => {
    setTimeout(() => {
      if (productsSectionRef.current) {
        const headerOffset = 100;
        const elementPosition = productsSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const closeFormAlert = () => {
    setFormSubmitted(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div id="app" className="min-h-screen bg-[#fbfcff] text-[#111111] overflow-x-hidden selection:bg-[#bda27e]/30 selection:text-black">
      
      {/* 1. HEADER (SCROLL BLUR AND RESPONSIVE CONTROLS) */}
      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-[1000] border-b transition-all duration-500 font-sans ${
          scrolled 
            ? "bg-[#fbfcff]/93 backdrop-blur-[20px] h-20 border-[#eaeaea]" 
            : "bg-transparent h-24 border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px] h-full flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="logo text-[22px] font-[500] tracking-[0.25em] cursor-pointer"
          >
            HUZHIYI <span className="text-[#bda27e] font-[300] tracking-wide">户之屹</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:block">
            <ul className="flex gap-[35px] list-none">
              {[
                { id: "home", label: "HOME", href: "#" },
                { id: "about", label: "ABOUT US", href: "#about" },
                { id: "products", label: "PRODUCTS", href: "#products" },
                { id: "services", label: "SERVICES", href: "#services" },
                { id: "cases", label: "CASES", href: "#cases" },
                { id: "news", label: "NEWS & BLOG", href: "#news" },
                { id: "video", label: "VIDEO", href: "#video" },
                { id: "contact", label: "CONTACT", href: "#contact" }
              ].map((nav) => (
                <li key={nav.id}>
                  <a
                    href={nav.href}
                    onClick={() => setActiveNav(nav.id)}
                    className={`relative text-[11px] tracking-[0.2em] font-[400] py-2 transition-all duration-300 hover:text-[#bda27e] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#bda27e] after:transition-all after:duration-300 ${
                      activeNav === nav.id 
                        ? "text-[#bda27e] after:w-full" 
                        : "text-[#111111] after:w-0 hover:after:w-full"
                    }`}
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Action button & mobile hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-block btn-premium border border-[#111111] text-[#111111] text-[10px] tracking-[0.25em] uppercase hover:bg-[#111111] hover:text-white transition-all duration-300 px-6 py-3 cursor-pointer"
            >
              GET IN TOUCH
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:text-[#bda27e] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden fixed top-[80px] left-0 w-full bg-[#fbfcff]/98 backdrop-blur-md border-b border-[#eaeaea] transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "opacity-100 max-h-[420px] py-6" : "opacity-0 max-h-0 py-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center gap-5 list-none px-6">
            {[
              { label: "HOME", href: "#", id: "home" },
              { label: "ABOUT US", href: "#about", id: "about" },
              { label: "PRODUCTS", href: "#products", id: "products" },
              { label: "SERVICES", href: "#services", id: "services" },
              { label: "CASES", href: "#cases", id: "cases" },
              { label: "NEWS & BLOG", href: "#news", id: "news" },
              { label: "VIDEO", href: "#video", id: "video" },
              { label: "CONTACT", href: "#contact", id: "contact" }
            ].map((link) => (
              <li key={link.label} className="w-full text-center">
                <a
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveNav(link.id);
                  }}
                  className="block text-[12px] tracking-[0.2em] font-[400] text-[#111111] hover:text-[#bda27e] py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="w-full pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-[#111111] text-white py-3.5 text-[11px] tracking-[0.25em] font-[550]"
              >
                GET IN TOUCH
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* 2. HERO LANDING SECTION */}
      <section
        id="home"
        className="relative h-screen bg-cover bg-center flex items-center md:pl-[8%] px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(251,252,255,0.25), rgba(251,252,255,0.1)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfcff]/60 via-transparent to-transparent pointer-events-none md:block hidden"></div>
        <div className="relative max-w-[680px] z-10 animate-fade-in">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] font-[500] mb-6 block">
            Architectural Entrance Solutions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[58px] font-[200] leading-[1.3] text-[#111111] mb-7 tracking-[0.02em]">
            定义当代建筑的
            <br />
            第一道美学坐标
          </h1>
          <p className="text-[13px] md:text-[14px] text-[#666666] leading-[1.9] mb-10 font-[300] tracking-[0.05em] max-w-[580px]">
            HUZHIYI 户之屹 专注于全球奢华私宅与先锋地标入户门系统。将克制极简的建筑笔触、高精度现代传动轴心技术及原生稀缺物料完美重组，构筑气势磅礴的归家礼序。
          </p>
          <a
            href="#products"
            className="inline-block btn-premium border border-[#111111] text-[#111111] font-[450] text-[11px] tracking-[0.25em] uppercase hover:bg-[#111111] hover:text-white transition-all duration-300 px-8 py-4 cursor-pointer"
          >
            探索五大核心产品
          </a>
        </div>
      </section>

      {/* 3. ABOUT US (interactive tabbed segment) */}
      <section id="about" className="section-padding bg-[#f7f9fc]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
            01 / BRAND NARRATIVE
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] font-[200] leading-[1.4] tracking-wider mb-12">
            关于我们 · 筑就有温度的豪宅门艺
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_1.65fr] gap-10 lg:gap-[60px] items-start mt-10">
            {/* Tabs List */}
            <div className="flex flex-col border-l border-[#eaeaea]">
              {ABOUT_DATA.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => triggerAboutTabSwitch(idx)}
                  className={`py-5 px-6 text-left text-[13px] font-[400] tracking-[0.1em] cursor-pointer border-l-2 -ml-[1px] transition-all duration-300 focus:outline-none ${
                    aboutTabIndex === idx
                      ? "text-[#111111] font-[500] border-l-[#bda27e] bg-[#bda27e]/4"
                      : "text-[#666666] hover:text-[#111111] border-l-transparent hover:bg-neutral-55"
                  }`}
                >
                  {tab.name} / {tab.label}
                </button>
              ))}
            </div>

            {/* Interactive display card with fade indicator */}
            <div
              className={`bg-white border border-[#eaeaea] grid grid-cols-1 md:grid-cols-2 min-h-[520px] shadow-sm transform transition-all duration-500 ease-out ${
                aboutFade ? "opacity-100 scale-100" : "opacity-0 scale-99 pointer-events-none"
              }`}
            >
              {/* Media on left */}
              <div className="relative aspect-video md:aspect-auto overflow-hidden bg-neutral-200 min-h-[300px]">
                <img
                  src={ABOUT_DATA[aboutTabIndex].img}
                  alt={ABOUT_DATA[aboutTabIndex].name}
                  className="absolute inset-0 w-full h-full object-cover transform duration-1000 scale-100 hover:scale-102"
                />
              </div>

              {/* Rich details on right */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="font-serif text-2xl md:text-[26px] font-[300] tracking-wider text-[#111111] mb-6">
                  {ABOUT_DATA[aboutTabIndex].title}
                </h3>
                <div
                  className="text-[14px] text-[#666666] leading-[1.8] font-[300] space-y-4"
                  dangerouslySetInnerHTML={{ __html: ABOUT_DATA[aboutTabIndex].content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGN PORTAL AND 3-LEVEL PRODUCT SYSTEM */}
      <section 
        id="products" 
        ref={productsSectionRef}
        className="product-section section-padding bg-white relative transition-all duration-1000"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          
          {/* LEVEL 1: MAIN DISPLAY CENTER */}
          {!selectedCategory && (
            <div className="animate-fade-in">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
                02 / PRODUCT CENTER
              </span>
              <h2 className="font-serif text-[32px] md:text-[40px] font-[200] leading-[1.4] tracking-wider mb-4">
                五大核心建筑门型系统
              </h2>
              <p className="text-[13px] text-[#666666] leading-[1.8] font-[300] max-w-[600px] mb-12">
                选择下方大类门型，切入探索其对应的四大先锋奢华表面美学设计风格面板。
              </p>

              {/* Main Five Category grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
                {DOOR_CATEGORIES.map((cat, index) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.title)}
                    className="group bg-white border border-[#eaeaea] p-8 md:px-[30px] md:py-[60px] text-center cursor-pointer flex flex-col items-center justify-between h-[460px] transform hover:-translate-y-3 hover:border-[#bda27e] hover:shadow-2xl hover:shadow-[#bda27e]/5 transition-all duration-500 ease-out"
                  >
                    <span className="text-[11px] text-[#666666] tracking-[0.1em]">
                      {cat.num}
                    </span>
                    <h3 className="font-serif text-xl font-[300] tracking-[0.1em] mt-2 text-[#111111] group-hover:text-[#bda27e] transition-colors">
                      {cat.label}
                    </h3>

                    {/* Inline high-fidelity golden door SVGs */}
                    <div className="my-[30px] transition-transform duration-500 group-hover:scale-105">
                      {cat.id === "pivot" && (
                        <svg className="w-[60px] h-[100px] border border-stone-200 p-2 group-hover:border-[#bda27e] transition-colors" viewBox="0 0 100 160">
                          {/* Outer frame */}
                          <rect x="15" y="10" width="70" height="140" fill="none" stroke="#eaeaea" strokeWidth="2" />
                          {/* Pivot slab (rotating) */}
                          <rect x="30" y="10" width="55" height="140" fill="none" stroke="#bda27e" strokeWidth="2.5" />
                          {/* Pivot axis */}
                          <line x1="30" y1="10" x2="30" y2="150" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx="30" cy="18" r="3" fill="#bda27e" />
                          <circle cx="30" cy="142" r="3" fill="#bda27e" />
                          {/* Design Lines */}
                          <line x1="45" y1="40" x2="70" y2="40" stroke="#bda27e" strokeWidth="1" />
                          <line x1="45" y1="80" x2="70" y2="80" stroke="#bda27e" strokeWidth="1" />
                        </svg>
                      )}
                      
                      {cat.id === "single" && (
                        <svg className="w-[60px] h-[100px] border border-stone-200 p-2 group-hover:border-[#bda27e] transition-colors" viewBox="0 0 100 160">
                          {/* Frame */}
                          <rect x="20" y="10" width="60" height="140" fill="none" stroke="#eaeaea" strokeWidth="2" />
                          {/* Single Panel */}
                          <rect x="20" y="10" width="60" height="140" fill="none" stroke="#bda27e" strokeWidth="2" />
                          {/* Handle */}
                          <line x1="72" y1="65" x2="72" y2="95" stroke="#111111" strokeWidth="2" />
                          <circle cx="72" cy="72" r="1.5" fill="#bda27e" />
                        </svg>
                      )}

                      {cat.id === "double" && (
                        <svg className="w-[60px] h-[100px] border border-stone-200 p-2 group-hover:border-[#bda27e] transition-colors" viewBox="0 0 100 160">
                          {/* Frame */}
                          <rect x="15" y="10" width="70" height="140" fill="none" stroke="#eaeaea" strokeWidth="2" />
                          {/* Left Panel */}
                          <rect x="15" y="10" width="35" height="140" fill="none" stroke="#bda27e" strokeWidth="2" />
                          {/* Right Panel */}
                          <rect x="50" y="10" width="35" height="140" fill="none" stroke="#bda27e" strokeWidth="2" />
                          {/* Handles */}
                          <line x1="46" y1="70" x2="46" y2="90" stroke="#111111" strokeWidth="1.5" />
                          <line x1="54" y1="70" x2="54" y2="90" stroke="#111111" strokeWidth="1.5" />
                        </svg>
                      )}

                      {cat.id === "iron" && (
                        <svg className="w-[60px] h-[100px] border border-stone-200 p-2 group-hover:border-[#bda27e] transition-colors" viewBox="0 0 100 160">
                          {/* Curved Arch Frame */}
                          <path d="M 15 150 L 15 50 A 35 35 0 0 1 85 50 L 85 150 Z" fill="none" stroke="#eaeaea" strokeWidth="2" />
                          {/* Double Gates inside Arch */}
                          <path d="M 17 150 L 17 50 A 33 33 0 0 1 50 17" fill="none" stroke="#bda27e" strokeWidth="1.5" />
                          <path d="M 83 150 L 83 50 A 33 33 0 0 0 50 17" fill="none" stroke="#bda27e" strokeWidth="1.5" />
                          <line x1="50" y1="17" x2="50" y2="150" stroke="#eaeaea" strokeWidth="1" />
                          {/* Iron swirl elements */}
                          <path d="M 23 80 Q 33 70 33 80 T 23 90" fill="none" stroke="#bda27e" strokeWidth="1" />
                          <path d="M 77 80 Q 67 70 67 80 T 77 90" fill="none" stroke="#bda27e" strokeWidth="1" />
                        </svg>
                      )}

                      {cat.id === "garage" && (
                        <svg className="w-[82px] h-[64px] border border-stone-200 p-2 mt-6 mb-4 group-hover:border-[#bda27e] transition-colors" viewBox="0 0 120 90">
                          <rect x="10" y="10" width="100" height="70" fill="none" stroke="#eaeaea" strokeWidth="2" />
                          {/* Slat panels */}
                          <line x1="10" y1="24" x2="110" y2="24" stroke="#bda27e" strokeWidth="1.5" />
                          <line x1="10" y1="38" x2="110" y2="38" stroke="#bda27e" strokeWidth="1.5" />
                          <line x1="10" y1="52" x2="110" y2="52" stroke="#bda27e" strokeWidth="1.5" />
                          <line x1="10" y1="66" x2="110" y2="66" stroke="#bda27e" strokeWidth="1.5" />
                          {/* Handle icon */}
                          <rect x="52" y="72" width="16" height="4" rx="2" fill="#111111" />
                        </svg>
                      )}
                    </div>

                    <span className="card-action text-[12px] font-medium tracking-[0.15em] text-[#bda27e] uppercase transition-colors group-hover:text-[#111111]">
                      探索风格 →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 2: SURFACE STYLE SELECTOR */}
          {selectedCategory && !selectedStyle && (
            <div className="animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#eaeaea] pb-[25px] mb-[50px] gap-4">
                <div>
                  <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] block mb-1">
                    02 / STYLE EXHIBITIONS
                  </span>
                  <h2 className="font-serif text-[28px] md:text-[34px] font-[200] leading-tight tracking-wider text-[#111111]">
                    {selectedCategory}
                  </h2>
                </div>
                <button
                  onClick={resetToCategories}
                  className="btn-back flex items-center gap-1 bg-none border-none font-sans text-[11px] tracking-[0.15em] uppercase text-[#666666] hover:text-[#111111] hover:-translate-x-1.5 transition-all duration-300 cursor-pointer"
                >
                  <ChevronLeft size={14} /> 返回品类中心
                </button>
              </div>

              {/* Style options display cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STYLE_CARDS.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleStyleSelect(style)}
                    className="group bg-white border border-[#eaeaea] overflow-hidden cursor-pointer hover:border-[#bda27e] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500"
                  >
                    {/* Media */}
                    <div className="h-[360px] overflow-hidden relative bg-neutral-100">
                      <img
                        src={style.img}
                        alt={style.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-106"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white text-[#111111] text-[11px] tracking-[0.2em] px-6 py-3 uppercase font-medium shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                          进入展厅 (20款产品)
                        </div>
                      </div>
                    </div>
                    {/* Caption */}
                    <div className="p-8">
                      <h4 className="font-serif text-base font-[400] tracking-[0.05em] mb-2.5 text-[#111111]">
                        {style.title}
                      </h4>
                      <p className="text-[12px] text-[#666666] leading-[1.6] font-[300]">
                        {style.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 3: 20 INDIVIDUAL ARTISANAL SHOWROOM ITEMS */}
          {selectedCategory && selectedStyle && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center border-b border-[#eaeaea] pb-[25px] mb-[40px] gap-4">
                <div>
                  <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-1.5 block">
                    SHOWROOM / {selectedStyle.id} PRODUCT CODES
                  </span>
                  <h2 className="font-serif text-[26px] md:text-[32px] font-[200] leading-tight text-[#111111]">
                    {selectedStyle.fullTitle}
                  </h2>
                  <p className="text-xs text-[#666666] mt-1 font-sans">
                    门型: {selectedCategory} | 首发品类尊享 20 款先锋工学家作
                  </p>
                </div>
                <button
                  onClick={resetToStyles}
                  className="btn-back flex items-center gap-1 bg-none border-none font-sans text-[11px] tracking-[0.15em] uppercase text-[#666666] hover:text-[#111111] hover:-translate-x-1.5 transition-all duration-300 cursor-pointer self-start lg:self-center"
                >
                  <ChevronLeft size={14} /> 返回风格体系
                </button>
              </div>

              {/* Showroom 20 products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
                {Array.from({ length: 20 }).map((_, i) => {
                  const itemIndex = i + 1;
                  const formattedNum = itemIndex < 10 ? `0${itemIndex}` : `${itemIndex}`;
                  const skuCode = `HZY-${selectedStyle.id}-${1000 + itemIndex}`;
                  // Rotate imagery pool
                  const imageSrc = selectedStyle.imagePool[i % selectedStyle.imagePool.length];

                  return (
                    <div
                      key={skuCode}
                      className="group bg-white border border-[#eaeaea] overflow-hidden hover:border-[#111111] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#111111]/5 transition-all duration-500"
                    >
                      {/* Media and status code */}
                      <div className="relative h-[420px] bg-[#f7f7f7] overflow-hidden">
                        <span className="absolute top-[20px] left-[20px] bg-[#111111]/85 backdrop-blur-[5px] text-white text-[10px] tracking-[0.15em] py-1.5 px-3.5 font-sans font-medium z-10">
                          {skuCode}
                        </span>
                        <img
                          src={imageSrc}
                          alt={`${selectedStyle.nameMapping} ${formattedNum}`}
                          className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-104"
                        />
                      </div>
                      {/* Caption details */}
                      <div className="p-6 border-t border-[#eaeaea]">
                        <h5 className="font-serif text-[15px] font-[400] tracking-[0.05em] text-[#111111] mb-1">
                          {selectedStyle.nameMapping} 系列尊享款 {formattedNum}
                        </h5>
                        <p className="text-[11px] text-[#bda27e] tracking-[0.1em] uppercase font-medium">
                          ARCHITECTURAL EDITION
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. SERVICE CHAIN ECOSYSTEM */}
      <section id="services" className="services-section section-padding bg-[#fcfdfe] border-t border-[#eaeaea]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
            03 / SERVICE ECOSYSTEM
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] font-[200] tracking-wider mb-12">
            尊享全案高端定制链路
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
            {[
              { num: "01", title: "美学咨询", desc: "专属艺术顾问一对一拆解建筑风格，厘定美学基调。" },
              { num: "02", title: "激光量测", desc: "工程团队现场进行激光三维空间建模，数据零误差。" },
              { num: "03", title: "全案深化", desc: "CAD及立体渲染深度输出，涉及传动平衡与防盗系数。" },
              { num: "04", title: "全球交付", desc: "严苛航空级原厂密封防震箱托运，直达全球项目现场。" },
              { num: "05", title: "专属保养", desc: "针对地置轴心系统进行终身全天候巡检保养技术响应。" }
            ].map((node) => (
              <div
                key={node.num}
                className="p-[40px] px-[30px] border border-[#eaeaea] bg-[#fbfcff] hover:border-[#111111] transition-all duration-350 flex flex-col justify-between min-h-[250px] group"
              >
                <span className="font-sans text-[36px] font-[100] text-stone-300 group-hover:text-[#bda27e] transition-colors duration-300">
                  {node.num}
                </span>
                <div>
                  <h4 className="text-[14px] font-[550] tracking-[0.05em] text-[#111111] mb-3">
                    {node.title}
                  </h4>
                  <p className="text-[12px] text-[#666666] leading-[1.6] font-[300]">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CASE COMPOSITIONS SHOWCASE */}
      <section id="cases" className="cases-section section-padding bg-white border-t border-[#eaeaea]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
            04 / APPLICATION PROJECTS
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] font-[200] tracking-wider mb-12">
            全球豪宅整案落地实景
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 mt-10">
            {[
              {
                img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
                location: "Private Villa / 洛杉矶",
                title: "比弗利山庄折面先锋私宅"
              },
              {
                img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
                location: "Creative Space / 伦敦",
                title: "泰晤士河畔现代艺术中心"
              },
              {
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
                location: "Penthouse / 迪拜",
                title: "朱美拉海岸高端私人庄园"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="group relative h-[480px] overflow-hidden cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 text-white transition-opacity duration-300">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#cccccc] mb-2 font-sans">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-lg md:text-xl font-[300] tracking-[0.05em]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. JOURNAL & BLOG (Editorial filter list) */}
      <section id="news" className="news-section section-padding bg-[#f4f6f9]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12.5 gap-6">
            <div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-2 block font-semibold">
                05 / JOURNAL & BLOG
              </span>
              <h2 className="font-serif text-[32px] md:text-[40px] font-[200] tracking-wider text-[#111111]">
                行业洞察与设计思潮
              </h2>
            </div>
            <ul className="flex list-none gap-[30px] text-[11px] font-[500] tracking-[0.15em] border-b lg:border-none border-[#eaeaea] pb-2 lg:pb-0">
              {["ARCHITECTURAL DESIGN", "EXHIBITIONS", "TECHNOLOGY"].map((cat) => (
                <li
                  key={cat}
                  onClick={() => setNewsFilter(cat)}
                  className={`cursor-pointer pb-1 transition-colors ${
                    newsFilter === cat
                      ? "text-[#111111] border-b border-[#111111]"
                      : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] mt-10">
            {/* News 1 */}
            <div className="group relative flex flex-col">
              <div className="h-[420px] md:h-[500px] relative overflow-hidden bg-stone-300">
                {/* Date Badge */}
                <div className="absolute top-[30px] left-[30px] bg-white w-[65px] h-[80px] flex flex-col items-center justify-center z-10 shadow-md">
                  <span className="text-2xl font-[250] text-[#111111] line-height-[1]">18</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#666666] mt-1 font-semibold">JUN</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Post Entry"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              </div>
              <div className="bg-white w-[90%] md:w-[86%] mx-auto -mt-[60px] p-6 md:p-[45px] relative z-20 shadow-lg group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                <h3 className="font-serif text-[18px] md:text-[20px] font-[400] leading-[1.4] text-[#111111] mb-3.5">
                  极简主义建筑中入户大门的转折叙事学
                </h3>
                <p className="text-[13px] text-[#666666] leading-[1.7] font-[300] mb-6">
                  探讨大尺度重型偏轴门在缓缓开启的数秒内，如何在室内暗空间与室外光影之间划出一道极具仪式感的动态弧线...
                </p>
                <a
                  href="#news"
                  className="inline-block text-[11px] tracking-[0.15em] uppercase font-semibold text-[#111111] border-b border-[#111111] pb-0.5 hover:text-[#bda27e] hover:border-[#bda27e] transition-colors"
                >
                  READ THE ARTICLE →
                </a>
              </div>
            </div>

            {/* News 2 */}
            <div className="group relative flex flex-col">
              <div className="h-[420px] md:h-[500px] relative overflow-hidden bg-stone-300">
                {/* Date Badge */}
                <div className="absolute top-[30px] left-[30px] bg-white w-[65px] h-[80px] flex flex-col items-center justify-center z-10 shadow-md">
                  <span className="text-2xl font-[250] text-[#111111] line-height-[1]">02</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#666666] mt-1 font-semibold">JUL</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                  alt="Stone post"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              </div>
              <div className="bg-white w-[90%] md:w-[86%] mx-auto -mt-[60px] p-6 md:p-[45px] relative z-20 shadow-lg group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                <h3 className="font-serif text-[18px] md:text-[20px] font-[400] leading-[1.4] text-[#111111] mb-3.5">
                  地质演变与精工铝合金框架的碰撞实验
                </h3>
                <p className="text-[13px] text-[#666666] leading-[1.7] font-[300] mb-6">
                  当拥有上亿年演变结晶的原生奢石通过微米级切片技术，无缝贴合在航空断桥大门表面，建筑本身的永恒感随之油然而生...
                </p>
                <a
                  href="#news"
                  className="inline-block text-[11px] tracking-[0.15em] uppercase font-semibold text-[#111111] border-b border-[#111111] pb-0.5 hover:text-[#bda27e] hover:border-[#bda27e] transition-colors"
                >
                  READ THE ARTICLE →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PHOTO-DYNAMICS VIDEO LOGS (WITH MODAL COMPONENT PLAYER) */}
      <section id="video" className="video-section section-padding bg-white border-t border-[#eaeaea]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
            06 / GALLERY & VIDEO
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] font-[200] tracking-wider mb-12">
            光影纪实 · 动态工学
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-10">
            {[
              {
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
                title: "原厂智能柔性焊接生产线",
                desc: "沉浸式呈现欧洲RC4级别骨架测试实录。",
                url: "https://assets.mixkit.co/videos/preview/mixkit-welder-working-at-factory-40348-large.mp4"
              },
              {
                img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80",
                title: "大型重载偏轴门一指传动测试",
                desc: "展现重达1.2吨超大门型微阻力顺滑合拢。",
                // Luxurious interior door clip
                url: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-entrance-hallway-39832-large.mp4"
              },
              {
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
                title: "迪拜顶级豪宅全案交付纪录片",
                desc: "记录从海运抵达现场到最终声学双重密封交付。",
                url: "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-villa-with-swimming-pool-4804-large.mp4"
              }
            ].map((video, idx) => (
              <div
                key={idx}
                className="group border border-[#eaeaea] bg-[#fafbfc] overflow-hidden flex flex-col justify-between"
              >
                {/* Thumb with translucent play btn */}
                <div
                  className="h-[250px] relative flex fill-[#000] items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url('${video.img}')` }}
                >
                  <div className="absolute inset-0 bg-black/15 transition-opacity group-hover:bg-black/30 duration-300"></div>
                  <button
                    onClick={() => setPlayingVideo({ title: video.title, url: video.url })}
                    className="w-14 h-14 rounded-full border border-white bg-white/15 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-108 cursor-pointer relative z-10"
                    aria-label={`Play ${video.title}`}
                  >
                    <Play size={18} fill="currentColor" className="ml-1" />
                  </button>
                </div>
                {/* Meta details */}
                <div className="p-6 md:p-[25px]">
                  <h4 className="text-[14px] font-[550] text-[#111111] mb-2">
                    {video.title}
                  </h4>
                  <p className="text-[12px] text-[#666666] leading-relaxed font-[300]">
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ASYMMETRIC CONTACT INTERFACE */}
      <section id="contact" className="contact-section section-padding bg-white border-t border-[#eaeaea]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#bda27e] mb-4 font-semibold block">
            07 / CONTACT & INQUIRIES
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] lg:gap-[100px] mt-10">
            {/* Info details */}
            <div className="contact-details">
              <h3 className="font-serif text-[28px] md:text-[34px] font-[200] text-[#111111] mb-6 tracking-wide leading-tight">
                开启您的先锋空间定制
              </h3>
              <p className="text-[13px] text-[#666666] leading-[1.8] font-[300] mb-10">
                欢迎全球建筑设计事务所、高奢住宅业主或跨国工程总包商提交建筑图纸与五金技术要求。我们的全案深化团队将在 24 小时内为您出具可行性质质检预估。
              </p>

              <div className="space-y-[30px] text-[13px] font-[300] leading-[1.8]">
                <div>
                  <strong className="block text-[#111111] font-[500] uppercase tracking-[0.05em] mb-1">
                    GLOBAL HEADQUARTERS
                  </strong>
                  <span className="text-[#666666] flex items-center gap-2"><MapPin size={14} className="text-[#bda27e]" /> 国际艺术与先锋建筑产业园区 A栋 751</span>
                </div>
                <div>
                  <strong className="block text-[#111111] font-[500] uppercase tracking-[0.05em] mb-1">
                    PROJECT INQUIRY / WHATSAPP
                  </strong>
                  <span className="text-[#666666] flex items-center gap-2"><Phone size={14} className="text-[#bda27e]" /> +86 189 9999 9999</span>
                </div>
                <div>
                  <strong className="block text-[#111111] font-[500] uppercase tracking-[0.05em] mb-1">
                    GENERAL EMAIL
                  </strong>
                  <span className="text-[#666666] flex items-center gap-2"><Mail size={14} className="text-[#bda27e]" /> concierge@umtdesign.com</span>
                </div>
              </div>
            </div>

            {/* Live Form with Validation Highlights */}
            <div className="bg-white p-2">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="您的姓名 / Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pb-3 pt-4 px-0 bg-transparent border-b border-[#cccccc] focus:border-[#bda27e] text-[13px] text-[#111111] focus:outline-none transition-all duration-350"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="电子邮箱 / Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pb-3 pt-4 px-0 bg-transparent border-b border-[#cccccc] focus:border-[#bda27e] text-[13px] text-[#111111] focus:outline-none transition-all duration-350"
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="联系电话 / Phone or WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pb-3 pt-4 px-0 bg-transparent border-b border-[#cccccc] focus:border-[#bda27e] text-[13px] text-[#111111] focus:outline-none transition-all duration-350"
                  />
                </div>

                <div className="relative">
                  <textarea
                    required
                    placeholder="项目描述（如所需门型体系、大体尺寸等）/ Project Details *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-[110px] pb-3 pt-4 px-0 bg-transparent border-b border-[#cccccc] focus:border-[#bda27e] text-[13px] text-[#111111] focus:outline-none transition-all duration-350 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto mt-[20px] btn-premium border border-[#111111] text-[#111111] font-semibold text-[11px] tracking-[0.25em] uppercase hover:bg-[#111111] hover:text-white transition-all duration-300 px-8 py-4.5 cursor-pointer block text-center"
                >
                  提交定制询盘 / SEND INQUIRY
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. STRUCTURED LUXURY FOOTER */}
      <footer className="border-t border-[#eaeaea] bg-[#fafbfc] pt-[90px] pb-11 font-sans text-[13px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[60px]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-[60px] mb-[70px]">
            {/* Column 1: brand */}
            <div>
              <div className="logo text-[20px] font-medium tracking-[0.25em] mb-5 text-[#111111]">
                HUZHIYI <span className="text-[#bda27e] font-[300] tracking-wide">户之屹</span>
              </div>
              <p className="text-[12px] text-[#666666] leading-[1.7] max-w-[320px] font-[300]">
                用极简克制、带有留白呼吸感的设计和先锋工学，为全球奢华住宅构筑专属地标门户。
              </p>
            </div>

            {/* Column 2: catalog */}
            <div>
              <h6 className="text-[11px] tracking-[0.15em] uppercase text-[#111111] font-semibold mb-6">
                体系矩阵
              </h6>
              <ul className="space-y-3.5 list-none">
                <li>
                  <a href="#products" onClick={() => setSelectedCategory("偏轴门系统 (Pivot Doors)")} className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    偏轴装甲门系统
                  </a>
                </li>
                <li>
                  <a href="#products" onClick={() => setSelectedCategory("单开门系统 (Single Swing Doors)")} className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    极窄单开平开门
                  </a>
                </li>
                <li>
                  <a href="#products" onClick={() => setSelectedCategory("双开门系统 (Double Swing Doors)")} className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    大尺度豪宅双开门
                  </a>
                </li>
                <li>
                  <a href="#products" onClick={() => setSelectedCategory("车库门系统 (Garage Doors)")} className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    立面隐形一体车库门
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: shortcuts */}
            <div>
              <h6 className="text-[11px] tracking-[0.15em] uppercase text-[#111111] font-semibold mb-6">
                关于与支撑
              </h6>
              <ul className="space-y-3.5 list-none">
                <li>
                  <a href="#about" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    关于我们
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    定制生态流程
                  </a>
                </li>
                <li>
                  <a href="#cases" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    全球实景方案
                  </a>
                </li>
                <li>
                  <a href="#news" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    思潮日志 Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: resources */}
            <div>
              <h6 className="text-[11px] tracking-[0.15em] uppercase text-[#111111] font-semibold mb-6">
                数字画册 Links
              </h6>
              <ul className="space-y-3.5 list-none">
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    Instagram / 灵感集
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    Pinterest / 看板
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#bda27e] transition-colors">
                    YouTube / 工业纪实
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright statement */}
          <div className="border-t border-[#eaeaea] pt-10 flex flex-col sm:flex-row justify-between items-center text-[#999999] text-[11px] tracking-[0.05em] gap-4">
            <p>&copy; 2026 HUZHIYI 户之屹 建筑入户系统独立站. 保留所有权利.</p>
            <p className="font-light">Designed for High-End Architecture.</p>
          </div>
        </div>
      </footer>

      {/* ========================================================
         MODAL 1: HIGH FIDELITY MEDIA VIDEO PLAYER
         ======================================================== */}
      {playingVideo && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4 transition-all animate-fade-in">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setPlayingVideo(null)}></div>
          <div className="bg-black border border-stone-800 w-full max-w-[860px] relative z-10 overflow-hidden shadow-2xl">
            {/* Header meta */}
            <div className="flex justify-between items-center bg-[#111111] px-5 py-3.5 border-b border-neutral-800">
              <span className="text-[11px] tracking-[0.15em] text-[#bda27e] uppercase font-sans font-medium">
                HUZHIYI CINEMATIC DISPLAY: {playingVideo.title}
              </span>
              <button
                onClick={() => setPlayingVideo(null)}
                className="text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            {/* Custom high-res stock looping videos */}
            <div className="relative aspect-video bg-stone-900 flex items-center justify-center">
              <video
                src={playingVideo.url}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
         MODAL 2: HIGH CONTRAST SUCCESS SUBMISSION ALERTS
         ======================================================== */}
      {formSubmitted && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 p-4 transition-all animate-fade-in">
          <div className="absolute inset-0 cursor-pointer" onClick={closeFormAlert}></div>
          <div className="bg-white border border-[#eaeaea] w-full max-w-[480px] p-8 relative z-10 shadow-2xl text-center">
            <div className="w-[60px] h-[60px] bg-[#bda27e]/13 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-[#bda27e]" size={28} />
            </div>
            <h3 className="font-serif text-[22px] font-[400] text-[#111111] mb-3">
              意向提交成功
            </h3>
            <p className="text-[13px] text-[#666666] leading-relaxed mb-6 font-[300]">
              尊贵的 <strong>{formData.name || "客户"}</strong>，我们已收取您的定制询盘意向需求。<br />
              专属高端建筑美学顾问将在 24 小时内（{formData.email} 或电话/WhatsApp）为您寄奉深化全案设计估算。
            </p>
            <div className="border-t border-[#eaeaea] pt-4.5 mb-6 text-left text-xs bg-[#fbfbfb] p-4 rounded space-y-1 text-[#666666]">
              <div><strong>客户姓名/Name:</strong> {formData.name}</div>
              <div><strong>电子邮箱/Email:</strong> {formData.email}</div>
              {formData.phone && <div><strong>联系电话/Phone:</strong> {formData.phone}</div>}
              <div><strong>描述意向/Details:</strong> {formData.message}</div>
            </div>
            <button
              onClick={closeFormAlert}
              className="w-full btn-premium border border-[#111111] text-white bg-[#111111] hover:bg-neutral-800 transition-colors uppercase py-3.5 text-[11px] tracking-[0.2em]"
            >
              继续浏览 / CLOSE
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
