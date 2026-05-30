import { useState } from "react";
import Icon from "@/components/ui/icon";

const TRAINER_IMG = "https://cdn.poehali.dev/projects/9faf9e5d-4896-4d12-ba21-285e96e9e687/files/cacf46a3-26d6-4a1a-ab24-a81b1a9f1db1.jpg";
const GYM_BG = "https://cdn.poehali.dev/projects/9faf9e5d-4896-4d12-ba21-285e96e9e687/files/59902c72-3279-4e4b-805f-a1cb205787f4.jpg";

const SERVICES = [
  {
    icon: "Dumbbell",
    title: "Силовые тренировки",
    desc: "Программа под ваш уровень: от базы до продвинутых техник. Гипертрофия, сила, рельеф — любая цель.",
    price: "от 2 500 ₽",
    tag: "Хит"
  },
  {
    icon: "Zap",
    title: "Функциональный тренинг",
    desc: "Комплексные тренировки на выносливость, координацию и общую физическую подготовку.",
    price: "от 2 000 ₽",
    tag: null
  },
  {
    icon: "Apple",
    title: "Нутрициология",
    desc: "Персональный рацион с учётом цели, здоровья и образа жизни. Без жёстких ограничений — только грамотный подбор.",
    price: "от 3 500 ₽",
    tag: "Популярно"
  },
  {
    icon: "Target",
    title: "Комплексная программа",
    desc: "Тренировки + питание + контроль результатов. Полное сопровождение на пути к цели.",
    price: "от 8 000 ₽",
    tag: "Выгодно"
  }
];

const RESULTS = [
  { name: "Алексей, 28 лет", goal: "Набор массы", period: "3 месяца", result: "+8 кг мышц", change: "+8 кг" },
  { name: "Мария, 32 года", goal: "Похудение", period: "4 месяца", result: "-14 кг жира", change: "-14 кг" },
  { name: "Дмитрий, 35 лет", goal: "Сила и рельеф", period: "6 месяцев", result: "Жим 120 кг", change: "+40 кг" },
  { name: "Анна, 25 лет", goal: "Тонус и здоровье", period: "2 месяца", result: "-6 кг", change: "-6 кг" },
];

const REVIEWS = [
  {
    name: "Сергей К.",
    text: "За 3 месяца убрал живот и стал чувствовать себя совершенно по-другому. Максим — профессионал, который объясняет каждое движение и следит за техникой.",
    rating: 5
  },
  {
    name: "Елена В.",
    text: "Наконец нашла тренера, который понимает, что девушкам нужно. Никакого голодания — только грамотные тренировки и правильное питание.",
    rating: 5
  },
  {
    name: "Андрей М.",
    text: "Пришёл совсем зелёным. Сейчас жму 100 кг и горжусь собой. Максим сделал из меня другого человека за полгода.",
    rating: 5
  }
];

const TIPS = [
  {
    icon: "Salad",
    category: "Питание",
    title: "Белок в каждом приёме пищи",
    text: "Минимум 1.6–2.2 г белка на кг веса тела — основа любой программы изменения состава тела."
  },
  {
    icon: "Flame",
    category: "Тренировки",
    title: "Прогрессивная нагрузка",
    text: "Каждую неделю увеличивайте либо вес, либо количество повторений. Без прогресса нет роста."
  },
  {
    icon: "Moon",
    category: "Восстановление",
    title: "Сон — главный анаболик",
    text: "7–9 часов сна в сутки: именно в это время мышцы растут, а гормоны восстанавливаются."
  },
  {
    icon: "Droplets",
    category: "Питание",
    title: "Вода решает всё",
    text: "30 мл воды на кг веса ежедневно. Даже лёгкое обезвоживание снижает силовые показатели на 10–15%."
  }
];

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const TIME_SLOTS = ["08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
const BOOKED_SLOTS: Record<number, string[]> = {
  0: ["09:30", "14:00", "18:30"],
  1: ["08:00", "11:00", "20:00"],
  2: ["12:30", "17:00"],
  3: ["08:00", "09:30", "15:30", "18:30"],
  4: ["11:00", "14:00"],
  5: ["08:00", "09:30", "11:00", "12:30"],
  6: ["17:00", "18:30", "20:00"],
};

export default function Index() {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bookedForDay = BOOKED_SLOTS[activeDay] || [];

  const handleSlotClick = (slot: string) => {
    if (bookedForDay.includes(slot)) return;
    setSelectedSlot(slot);
    setBookingOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setBookingOpen(false);
      setSubmitted(false);
      setSelectedSlot(null);
      setFormData({ name: "", phone: "", comment: "" });
    }, 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--black)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "rgba(8,12,20,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8" style={{ background: "var(--red)" }} />
            <span className="font-bold text-lg tracking-wider uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>
              ДАНИИЛ ПЕТРОВ
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
            {[["О тренере", "about"], ["Услуги", "services"], ["Результаты", "results"], ["Расписание", "schedule"], ["Советы", "tips"], ["Контакты", "contacts"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="transition-colors"
                style={{ color: "var(--gray)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--red)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--gray)")}>
                {label}
              </button>
            ))}
          </div>

          <button className="btn-primary text-sm hidden md:block py-2 px-5" onClick={() => scrollTo("schedule")}>
            Записаться
          </button>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--white)" }}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 px-4 flex flex-col gap-4" style={{ background: "var(--black-soft)", borderColor: "rgba(255,255,255,0.08)" }}>
            {[["О тренере", "about"], ["Услуги", "services"], ["Результаты", "results"], ["Расписание", "schedule"], ["Советы", "tips"], ["Контакты", "contacts"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-sm font-medium tracking-wide uppercase py-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>
                {label}
              </button>
            ))}
            <button className="btn-primary text-sm mt-2" onClick={() => scrollTo("schedule")}>Записаться</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={GYM_BG} alt="gym" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,12,20,0.97) 40%, rgba(30,111,255,0.07) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-6"
                style={{ background: "rgba(30,111,255,0.12)", border: "1px solid rgba(30,111,255,0.3)", color: "var(--red)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--red)" }} />
                Сертифицированный тренер · Нутрициолог
              </div>

              <h1 className="section-title mb-5 animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
                ПРЕВРАТИМ <span style={{ color: "var(--red)" }}>ЦЕЛЬ</span><br />
                В РЕЗУЛЬТАТ
              </h1>

              <p className="text-lg mb-8 max-w-lg animate-fade-up delay-200" style={{ color: "var(--gray)", opacity: 0, animationFillMode: "forwards" }}>
                Индивидуальные силовые и функциональные тренировки. Программы питания от нутрициолога. Ваш результат — через 8 недель.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-300" style={{ opacity: 0, animationFillMode: "forwards" }}>
                <button className="btn-primary" onClick={() => scrollTo("schedule")}>Записаться на тренировку</button>
                <button className="btn-outline" onClick={() => scrollTo("about")}>О тренере</button>
              </div>

              <div className="flex gap-8 mt-12 animate-fade-up delay-400" style={{ opacity: 0, animationFillMode: "forwards" }}>
                {[["10+", "лет опыта"], ["200+", "клиентов"], ["94%", "достигают цели"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-3xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "var(--red)" }}>{num}</div>
                    <div className="text-xs tracking-wide uppercase mt-1" style={{ color: "var(--gray)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-8 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, var(--red) 0%, transparent 70%)" }} />
              <div className="relative overflow-hidden" style={{ clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" }}>
                <img src={TRAINER_IMG} alt="Максим Волков — персональный тренер" className="w-full h-[580px] object-cover object-top" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 50%)" }} />
              </div>
              <div className="absolute bottom-6 left-4 right-4 p-4 rounded" style={{ background: "rgba(8,12,20,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(30,111,255,0.25)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--red)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--white)" }}>Доступно 3 слота на этой неделе</span>
                  <button onClick={() => scrollTo("schedule")} className="ml-auto text-xs uppercase tracking-wide font-medium transition-colors"
                    style={{ color: "var(--red)", fontFamily: "Oswald, sans-serif" }}>
                    Выбрать →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} style={{ color: "var(--gray)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24" style={{ background: "var(--black-soft)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>О ТРЕНЕРЕ</div>
              <h2 className="section-title mb-2">Даниил Петров</h2>
              <div className="w-14 h-0.5 mb-6" style={{ background: "var(--red)" }} />
              <p className="text-base mb-5 leading-relaxed" style={{ color: "var(--gray)" }}>
                10 лет в фитнесе, из которых 3 — в персональном тренерстве. Специализация: силовые и функциональные тренировки, коррекция тела, подготовка к соревнованиям.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--gray)" }}>
                Как нутрициолог — разрабатываю индивидуальные рационы без жёстких диет. Верю, что правильное питание и тренировки должны вписываться в жизнь, а не ломать её.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["🏅", "NASM Certified Personal Trainer"],
                  ["🥗", "Сертифицированный нутрициолог"],
                  ["🏋️", "Специалист по силовому тренингу"],
                  ["📊", "Коррекция состава тела"]
                ].map(([emoji, text]) => (
                  <div key={text} className="flex items-start gap-3 p-3 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-lg mt-0.5">{emoji}</span>
                    <span className="text-sm" style={{ color: "var(--white)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {[
                { label: "Силовой тренинг", value: 95 },
                { label: "Функциональные тренировки", value: 88 },
                { label: "Нутрициология", value: 82 },
                { label: "Работа с восстановлением", value: 90 },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: "var(--white)" }}>{label}</span>
                    <span style={{ color: "var(--red)" }}>{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--black-card)" }}>
                    <div className="h-full rounded-full" style={{ width: `${value}%`, background: "linear-gradient(90deg, var(--red-dark), var(--red))" }} />
                  </div>
                </div>
              ))}

              <div className="mt-6 p-6 rounded border-l-4" style={{ background: "var(--black-card)", borderColor: "var(--red)" }}>
                <p className="text-sm italic leading-relaxed" style={{ color: "var(--gray)" }}>
                  "Я не продаю обещания — я даю инструменты. Каждый клиент получает программу, которая работает именно для него."
                </p>
                <div className="mt-3 text-sm font-medium" style={{ color: "var(--white)" }}>— Даниил Петров</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ background: "var(--black)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>УСЛУГИ</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Что я предлагаю</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="card-hover p-6 rounded relative" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {s.tag && (
                  <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded font-medium" style={{ background: "rgba(30,111,255,0.18)", color: "var(--red)", border: "1px solid rgba(30,111,255,0.3)" }}>
                    {s.tag}
                  </span>
                )}
                <div className="w-12 h-12 rounded flex items-center justify-center mb-4" style={{ background: "rgba(30,111,255,0.1)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="text-base font-bold mb-3 uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--gray)" }}>{s.desc}</p>
                <div className="text-xl font-bold" style={{ color: "var(--red)", fontFamily: "Oswald, sans-serif" }}>{s.price}</div>
                <div className="text-xs mt-1 mb-5" style={{ color: "var(--gray)" }}>за занятие</div>
                <button onClick={() => scrollTo("schedule")} className="w-full py-2 text-sm font-medium uppercase tracking-wide transition-all rounded"
                  style={{ fontFamily: "Oswald, sans-serif", border: "1px solid rgba(255,255,255,0.15)", color: "var(--white)", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
                  Записаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24" style={{ background: "var(--black-soft)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>РЕЗУЛЬТАТЫ</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Истории клиентов</h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--gray)" }}>Реальные люди, реальные цифры — за 3–6 месяцев работы</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {RESULTS.map((r) => (
              <div key={r.name} className="card-hover rounded overflow-hidden" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="h-1" style={{ background: "var(--red)" }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--white)" }}>{r.name}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--gray)" }}>{r.goal}</div>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "var(--red)", fontFamily: "Oswald, sans-serif" }}>{r.change}</div>
                  </div>
                  <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.07)" }} />
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "var(--gray)" }}>{r.period}</span>
                    <span className="font-medium" style={{ color: "var(--white)" }}>{r.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((rv) => (
              <div key={rv.name} className="p-6 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rv.rating }).map((_, i) => (
                    <span key={i} style={{ color: "var(--red)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--gray)" }}>"{rv.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "var(--red)", color: "white" }}>
                    {rv.name[0]}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--white)" }}>{rv.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24" style={{ background: "var(--black)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>РАСПИСАНИЕ</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Онлайн-запись</h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--gray)" }}>Выберите удобный день и время — свободные слоты отображаются в реальном времени</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-7 gap-2 mb-8">
              {WEEK_DAYS.map((day, idx) => {
                const bookedCount = (BOOKED_SLOTS[idx] || []).length;
                const freeCount = TIME_SLOTS.length - bookedCount;
                const isActive = activeDay === idx;
                return (
                  <button key={day} onClick={() => { setActiveDay(idx); setSelectedSlot(null); }}
                    className="p-3 rounded text-center transition-all"
                    style={{
                      background: isActive ? "var(--red)" : "var(--black-card)",
                      border: `1px solid ${isActive ? "var(--red)" : "rgba(255,255,255,0.08)"}`,
                      color: "var(--white)"
                    }}>
                    <div className="text-xs font-medium uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>{day}</div>
                    <div className="text-xs mt-1" style={{ color: isActive ? "rgba(255,255,255,0.7)" : "var(--gray)" }}>{freeCount} св.</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedForDay.includes(slot);
                const isSelected = selectedSlot === slot;
                return (
                  <button key={slot} onClick={() => handleSlotClick(slot)} disabled={isBooked}
                    className="py-3 px-4 rounded text-sm font-medium transition-all"
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      background: isSelected ? "var(--red)" : isBooked ? "#141414" : "var(--black-card)",
                      border: `1px solid ${isSelected ? "var(--red)" : isBooked ? "#1e1e1e" : "rgba(255,255,255,0.08)"}`,
                      color: isBooked ? "#3a3a3a" : "var(--white)",
                      cursor: isBooked ? "not-allowed" : "pointer"
                    }}>
                    <div>{slot}</div>
                    <div className="text-xs mt-0.5" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : isBooked ? "#3a3a3a" : "var(--gray)" }}>
                      {isBooked ? "Занято" : isSelected ? "Выбрано ✓" : "Свободно"}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedSlot && !bookingOpen && (
              <div className="text-center p-4 rounded mb-4" style={{ background: "rgba(232,21,21,0.08)", border: "1px solid rgba(30,111,255,0.25)" }}>
                <span style={{ color: "var(--white)" }}>Выбрано: <strong style={{ color: "var(--red)" }}>{WEEK_DAYS[activeDay]}, {selectedSlot}</strong></span>
                <button className="btn-primary text-sm py-2 px-6 ml-4" onClick={() => setBookingOpen(true)}>Подтвердить запись</button>
              </div>
            )}

            <div className="flex gap-6 justify-center text-xs" style={{ color: "var(--gray)" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.08)" }} />
                Свободно
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "var(--red)" }} />
                Выбрано
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "#141414", border: "1px solid #1e1e1e" }} />
                Занято
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-24" style={{ background: "var(--black-soft)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>СОВЕТЫ</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Рекомендации тренера</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map((tip) => (
              <div key={tip.title} className="card-hover p-6 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="inline-flex px-2 py-0.5 rounded text-xs mb-4" style={{ background: "rgba(232,21,21,0.1)", color: "var(--red)" }}>
                  {tip.category}
                </div>
                <div className="w-10 h-10 rounded flex items-center justify-center mb-4" style={{ background: "rgba(232,21,21,0.08)" }}>
                  <Icon name={tip.icon} size={20} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="text-base font-bold mb-3 uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>{tip.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--gray)" }}>{tip.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <h3 className="text-xl font-bold uppercase mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>Получите персональный план</h3>
              <p className="text-sm" style={{ color: "var(--gray)" }}>Тренировки + питание под вашу цель — в PDF, бесплатно на первой консультации</p>
            </div>
            <button className="btn-primary whitespace-nowrap" onClick={() => scrollTo("schedule")}>
              Записаться на консультацию
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--black)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "var(--red)" }}>КОНТАКТЫ</div>
            <h2 className="section-title" style={{ color: "var(--white)" }}>Связаться со мной</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "MapPin", label: "Зал", value: "г. Сыктывкар, ул. Маркова" },
                { icon: "Clock", label: "Режим", value: "Пн–Пт 7:00–22:00, Сб–Вс 9:00–20:00" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(30,111,255,0.1)" }}>
                    <Icon name={icon} size={18} style={{ color: "var(--red)" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--gray)" }}>{label}</div>
                    <div className="font-medium" style={{ color: "var(--white)" }}>{value}</div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: "Instagram", label: "Instagram" },
                  { icon: "Youtube", label: "YouTube" },
                  { icon: "MessageCircle", label: "Telegram" },
                ].map(({ icon, label }) => (
                  <button key={label} className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all"
                    style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--white)"; }}>
                    <Icon name={icon} size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="p-8 rounded" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="text-xl font-bold uppercase mb-6" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wide mb-2 block" style={{ color: "var(--gray)" }}>Имя *</label>
                  <input required placeholder="Ваше имя" className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                    style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--red)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide mb-2 block" style={{ color: "var(--gray)" }}>Телефон *</label>
                  <input required placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded text-sm outline-none transition-all"
                    style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--red)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide mb-2 block" style={{ color: "var(--gray)" }}>Ваша цель</label>
                  <textarea placeholder="Похудение, набор массы, общее здоровье..." rows={3}
                    className="w-full px-4 py-3 rounded text-sm outline-none transition-all resize-none"
                    style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--red)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <button type="submit" className="btn-primary w-full text-center">
                  {contactSubmitted ? "✓ Заявка отправлена!" : "Отправить заявку"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)", background: "var(--black-soft)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--gray)" }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6" style={{ background: "var(--red)" }} />
            <span className="font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>ДАНИИЛ ПЕТРОВ</span>
          </div>
          <div>© 2026 Персональный тренер и нутрициолог</div>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Конфиденциальность</button>
            <button className="hover:text-white transition-colors">Оферта</button>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-md rounded p-8" style={{ background: "var(--black-card)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(232,21,21,0.12)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "var(--red)" }} />
                </div>
                <h3 className="text-xl font-bold uppercase mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>Запись подтверждена!</h3>
                <p className="text-sm" style={{ color: "var(--gray)" }}>Максим свяжется с вами для подтверждения тренировки.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold uppercase" style={{ fontFamily: "Oswald, sans-serif", color: "var(--white)" }}>Запись на тренировку</h3>
                  <button onClick={() => setBookingOpen(false)} style={{ color: "var(--gray)" }}><Icon name="X" size={20} /></button>
                </div>

                <div className="p-3 rounded mb-6 flex items-center gap-3" style={{ background: "rgba(232,21,21,0.08)", border: "1px solid rgba(232,21,21,0.2)" }}>
                  <Icon name="Calendar" size={18} style={{ color: "var(--red)" }} />
                  <span className="text-sm" style={{ color: "var(--white)" }}>{WEEK_DAYS[activeDay]}, {selectedSlot}</span>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wide mb-2 block" style={{ color: "var(--gray)" }}>Имя *</label>
                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя" className="w-full px-4 py-3 rounded text-sm outline-none"
                      style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--red)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide mb-2 block" style={{ color: "var(--gray)" }}>Телефон *</label>
                    <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded text-sm outline-none"
                      style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)" }}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--red)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center">Подтвердить запись</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}