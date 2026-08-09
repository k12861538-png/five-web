import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  Clock3,
  Crosshair,
  Crown,
  Instagram,
  LockKeyhole,
  Menu,
  MessageCircle,
  Shield,
  Sparkles,
  Store,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
const logoPath = '/five-city-logo.png';
const discordInvite = 'https://discord.gg/KfRQqts3vx';

const queryClient = new QueryClient();

const navItems = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'عن المدينة', href: '#about' },
  { label: 'القطاعات', href: '#departments' },
  { label: 'آخر الأخبار', href: '#news' },
  { label: 'التفعيل', href: '#activation' },
  { label: 'المتجر', href: '#store' },
];

const activationQuestions = [
  { id: 'name', label: 'الاسم', placeholder: 'اكتب اسمك الكامل' },
  { id: 'age', label: 'العمر', placeholder: 'اكتب عمرك' },
  { id: 'roleplay-lie', label: 'هل تستطيع الكذب بالرول؟', placeholder: 'اكتب نعم أو لا' },
  { id: 'military-vehicle', label: 'هل تستطيع سرقة مركبة عسكرية بدون سبب؟', placeholder: 'اكتب إجابتك' },
  { id: 'ignore-rules', label: 'هل إذا رأيت شخصاً لم يلتزم بالقوانين تتجاهله؟', placeholder: 'اكتب إجابتك' },
  { id: 'two-weapons', label: 'إذا رفع عليك شخصان سلاحاً وقالا لك «وقف»، هل ستهرب؟', placeholder: 'اكتب إجابتك' },
  { id: 'solo-bank', label: 'هل تستطيع سرقة بنك لحالك؟', placeholder: 'اكتب إجابتك' },
  { id: 'usernames', label: 'وش يوزرك في روبلوكس وديسكورد؟', placeholder: 'اكتب يوزر روبلوكس ويوزر ديسكورد' },
];

const departments = [
  {
    number: '01',
    title: 'الأمن العام',
    description: 'نظام، مسؤولية، وقرارات تصنع فرقاً في شوارع المدينة.',
    icon: Shield,
    tag: 'PUBLIC SERVICE',
  },
  {
    number: '02',
    title: 'القطاع الطبي',
    description: 'حياة كل مواطن أمانة. كن حاضراً عندما يحتاجك الجميع.',
    icon: Crosshair,
    tag: 'MEDICAL UNIT',
  },
  {
    number: '03',
    title: 'الأعمال والمهن',
    description: 'ابدأ من الصفر، ابنِ اسمك، واترك أثراً لا يُنسى.',
    icon: BriefcaseBusiness,
    tag: 'CITY ECONOMY',
  },
  {
    number: '04',
    title: 'العصابات والعصبة',
    description: 'الولاء له ثمن. كوّن طاقمك ونافس على نفوذ المدينة.',
    icon: Crown,
    tag: 'UNDERGROUND',
  },
];

const newsItems = [
  { date: '24.08.2026', title: 'تحديث قوانين المدينة — الإصدار 2.4', category: 'إعلان إداري', accent: 'orange' },
  { date: '19.08.2026', title: 'فتح باب التقديم للقطاع الطبي', category: 'فرص المدينة', accent: 'sand' },
  { date: '11.08.2026', title: 'بطولة الشوارع تعود بموسم جديد', category: 'فعاليات', accent: 'rust' },
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? 'scale-90 origin-right' : ''}`}>
      <img
        src={logoPath}
        alt="شعار Five City"
        data-testid="img-five-city-logo"
        className="h-12 w-12 rounded-xl object-cover shadow-[0_0_30px_rgba(241,92,18,.16)]"
      />
      <div className="leading-none text-right">
        <div className="font-brand text-[1.35rem] font-bold tracking-[.12em] text-[#f6ede2]">FIVE CITY</div>
        <div className="mt-1 text-[9px] font-semibold tracking-[.34em] text-[#b97847]">ROLEPLAY WORLD</div>
      </div>
    </div>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#f6ede2]/10 bg-[#100d0b]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8" dir="rtl">
        <a href="#home" aria-label="العودة إلى الرئيسية" data-testid="link-header-home" onClick={() => scrollToId('#home')}>
          <BrandMark compact />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#c9b9aa] lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`link-nav-${item.href.slice(1)}`}
              className="transition-colors hover:text-[#f27b33]"
              onClick={() => scrollToId(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={discordInvite}
            target="_blank"
            rel="noreferrer"
            type="button"
            data-testid="button-header-contact"
            className="hidden rounded-lg border border-[#f27b33]/60 px-4 py-2 text-xs font-bold text-[#f6ede2] transition-all hover:bg-[#f27b33] hover:text-[#100d0b] sm:block"
          >
            انضم للمجتمع
          </a>
          <button
            type="button"
            onClick={onMenu}
            data-testid="button-open-menu"
            aria-label="فتح القائمة"
            className="rounded-lg border border-[#f6ede2]/15 p-2 text-[#f6ede2] lg:hidden"
          >
            <Menu size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-[#100d0b]/96 px-6 pt-5 backdrop-blur-xl lg:hidden" dir="rtl">
      <div className="flex items-center justify-between">
        <BrandMark compact />
        <button onClick={onClose} type="button" data-testid="button-close-menu" aria-label="إغلاق القائمة" className="rounded-lg border border-[#f6ede2]/15 p-2 text-[#f6ede2]">
          <X size={22} />
        </button>
      </div>
      <div className="mt-20 space-y-2">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            data-testid={`link-mobile-nav-${item.href.slice(1)}`}
            onClick={() => { onClose(); scrollToId(item.href); }}
            className="flex items-center justify-between border-b border-[#f6ede2]/10 py-5 text-2xl font-bold text-[#f6ede2]"
          >
            <span className="text-[#f27b33]">{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
      <p className="mt-10 text-sm leading-8 text-[#9c8c80]">مدينة واحدة. آلاف القصص.<br />مكانك محفوظ بيننا.</p>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[760px] items-center overflow-hidden pt-24" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(124,48,18,.24),transparent_49%),linear-gradient(180deg,#17100c_0%,#100d0b_100%)]" />
      <div className="absolute -left-24 top-28 h-[500px] w-[500px] rounded-full bg-[#ed5b1a]/[.06] blur-[100px]" />
      <div className="absolute bottom-[-150px] right-[30%] h-[360px] w-[360px] rounded-full bg-[#ed5b1a]/[.08] blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-30">
        <div className="absolute bottom-0 left-[4%] h-40 w-[12%] bg-[#281b15]" />
        <div className="absolute bottom-0 left-[18%] h-64 w-[9%] bg-[#211712]" />
        <div className="absolute bottom-0 left-[30%] h-48 w-[17%] bg-[#261913]" />
        <div className="absolute bottom-0 left-[51%] h-72 w-[13%] bg-[#211712]" />
        <div className="absolute bottom-0 left-[68%] h-44 w-[9%] bg-[#261913]" />
        <div className="absolute bottom-0 left-[81%] h-60 w-[18%] bg-[#211712]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#100d0b] to-transparent" />
      </div>
      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-16 px-5 py-20 lg:grid-cols-[1fr_.86fr] lg:px-8">
        <div className="animate-rise">
          <div className="mb-7 flex items-center gap-3 text-xs font-semibold tracking-[.18em] text-[#f27b33]">
            <span className="h-px w-12 bg-[#f27b33]" />
            <span>WELCOME TO FIVE CITY</span>
          </div>
          <h1 className="max-w-3xl text-[clamp(3.4rem,8vw,7.4rem)] font-black leading-[.96] tracking-[-.065em] text-[#f8eee3]">
            مدينتك.
            <br />
            <span className="text-[#f27b33]">قصتك.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-[2] text-[#b8a79a]">
            عالم عربي نابض بالحياة. اختَر طريقك، ابنِ اسمك، واترك بصمتك في مدينة لا تتوقف عن الحركة.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" onClick={() => scrollToId('#about')} data-testid="button-hero-explore" className="group flex items-center gap-3 rounded-xl bg-[#f27b33] px-6 py-4 font-bold text-[#160e0a] transition-all hover:-translate-y-1 hover:bg-[#ff9352]">
              اكتشف Five City
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <a href={discordInvite} target="_blank" rel="noreferrer" data-testid="button-hero-community" className="flex items-center gap-3 rounded-xl border border-[#f6ede2]/20 px-6 py-4 font-bold text-[#f6ede2] transition-all hover:border-[#f27b33]/70 hover:bg-[#f27b33]/10">
              تواصل مع المجتمع
            </a>
          </div>
          <div className="mt-14 flex items-center gap-8 border-t border-[#f6ede2]/10 pt-6">
            <div><div className="font-brand text-2xl text-[#f6ede2]">24/7</div><div className="mt-1 text-xs text-[#927f72]">نبض مستمر</div></div>
            <div className="h-8 w-px bg-[#f6ede2]/15" />
            <div><div className="font-brand text-2xl text-[#f6ede2]">5</div><div className="mt-1 text-xs text-[#927f72]">قطاعات رئيسية</div></div>
            <div className="h-8 w-px bg-[#f6ede2]/15" />
            <div><div className="font-brand text-2xl text-[#f6ede2]">∞</div><div className="mt-1 text-xs text-[#927f72]">قصة تنتظر</div></div>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative animate-float">
            <div className="absolute -inset-10 rounded-full border border-[#f27b33]/15" />
            <div className="absolute -inset-20 rounded-full border border-[#f27b33]/[.07]" />
            <div className="absolute -inset-3 rounded-[2rem] bg-[#f27b33]/10 blur-2xl" />
            <img src={logoPath} alt="شعار Five City الرسمي" data-testid="img-hero-logo" className="relative h-[270px] w-[270px] rounded-[2rem] object-cover shadow-[0_25px_80px_rgba(0,0,0,.5)] sm:h-[360px] sm:w-[360px]" />
            <div className="absolute -bottom-5 -right-7 rounded-xl border border-[#f6ede2]/15 bg-[#1e1510]/90 px-5 py-3 backdrop-blur-md">
              <div className="text-[10px] tracking-[.22em] text-[#f27b33]">EST. 2024</div>
              <div className="mt-1 text-xs text-[#d5c5b6]">المدينة التي تنتمي إليها</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#806e62]">
        <span className="text-[10px] tracking-[.25em]">SCROLL TO ENTER</span>
        <span className="h-9 w-px bg-gradient-to-b from-[#f27b33] to-transparent" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-[#f6ede2]/10 bg-[#15100d] py-28" dir="rtl">
      <div className="mx-auto grid max-w-[1240px] gap-16 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div className="relative min-h-[410px] overflow-hidden rounded-[1.5rem] border border-[#f6ede2]/10 bg-[#1c1410] p-8">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#f27b33]/20" />
          <div className="absolute -right-2 top-0 h-48 w-px rotate-45 bg-[#f27b33]/30" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(0deg,rgba(242,123,51,.09),transparent)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#907e72]"><span>FC / 001</span><span>الهوية البصرية</span></div>
            <div>
              <div className="font-brand text-[7rem] font-bold leading-none text-[#f27b33]/90">F</div>
              <div className="mt-[-.5rem] text-sm tracking-[.45em] text-[#e6d7c9]">FIVE CITY</div>
            </div>
            <div className="flex justify-between border-t border-[#f6ede2]/10 pt-4 text-xs text-[#907e72]"><span>مدينة من صنع أهلها</span><span>© 2026</span></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#f27b33]"><span>01</span><span className="h-px w-10 bg-[#f27b33]" /><span>عن المدينة</span></div>
          <h2 className="max-w-2xl text-4xl font-black leading-[1.25] tracking-tight text-[#f6ede2] sm:text-5xl">ليست مجرد خريطة.<br /><span className="text-[#f27b33]">هذه مدينتك.</span></h2>
          <p className="mt-7 max-w-xl text-base leading-[2.15] text-[#ad9c8f]">في Five City، كل قرار يترك أثراً. كل شخصية لها صوت، وكل شارع يحمل حكاية. صممنا تجربة تقمص أدوار عربية جادة، حيث العلاقات حقيقية، والطموح له مساحة، والانتماء ليس مجرد كلمة.</p>
          <div className="mt-9 grid max-w-xl grid-cols-2 gap-5 border-t border-[#f6ede2]/10 pt-7">
            <div><div className="text-2xl font-bold text-[#f6ede2]">تقمّص جاد</div><div className="mt-2 text-xs text-[#927f72]">قواعد واضحة، تجربة أعمق</div></div>
            <div><div className="text-2xl font-bold text-[#f6ede2]">مجتمع حي</div><div className="mt-2 text-xs text-[#927f72]">قصص تُكتب كل يوم</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Departments() {
  return (
    <section id="departments" className="bg-[#100d0b] py-28" dir="rtl">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#f27b33]"><span>02</span><span className="h-px w-10 bg-[#f27b33]" /><span>مساراتك في المدينة</span></div>
            <h2 className="text-4xl font-black text-[#f6ede2] sm:text-5xl">اختر مكانك.<br /><span className="text-[#9f8879]">اصنع تأثيرك.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-8 text-[#927f72]">لا يوجد مسار صحيح واحد. المدينة تحتاج الجميع، من أول يوم وحتى آخر قصة.</p>
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-2">
          {departments.map((item, index) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.number} data-testid={`button-department-${index + 1}`} onClick={() => scrollToId('#contact')} className="group relative overflow-hidden rounded-2xl border border-[#f6ede2]/10 bg-[#17110e] p-7 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#f27b33]/60 hover:bg-[#1d1510]">
                <div className="absolute left-6 top-6 text-5xl font-black text-[#f6ede2]/[.04] transition-colors group-hover:text-[#f27b33]/10">{item.number}</div>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f27b33]/10 text-[#f27b33]"><Icon size={23} strokeWidth={1.5} /></div>
                  <span className="text-[10px] tracking-[.18em] text-[#806e62]">{item.tag}</span>
                </div>
                <h3 className="mt-12 text-2xl font-bold text-[#f6ede2]">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-8 text-[#9e8b7e]">{item.description}</p>
                <div className="mt-7 flex items-center gap-2 text-xs font-bold text-[#f27b33] opacity-0 transition-opacity group-hover:opacity-100">اعرف أكثر <ArrowUpLeft size={15} /></div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-[#f6ede2]/10 bg-[#1c1410] py-16" dir="rtl">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:grid-cols-3 lg:px-8">
        <div className="flex items-center gap-5"><Users className="text-[#f27b33]" size={27} strokeWidth={1.4} /><div><div className="text-4xl font-black text-[#f6ede2]">2,847</div><div className="mt-1 text-sm text-[#9e8b7e]">عضو في المجتمع</div></div></div>
        <div className="flex items-center gap-5"><Building2 className="text-[#f27b33]" size={27} strokeWidth={1.4} /><div><div className="text-4xl font-black text-[#f6ede2]">68</div><div className="mt-1 text-sm text-[#9e8b7e]">موقعاً في المدينة</div></div></div>
        <div className="flex items-center gap-5"><Clock3 className="text-[#f27b33]" size={27} strokeWidth={1.4} /><div><div className="text-4xl font-black text-[#f6ede2]">15,420</div><div className="mt-1 text-sm text-[#9e8b7e]">ساعة لعب جماعية</div></div></div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="bg-[#15100d] py-28" dir="rtl">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="flex items-end justify-between">
          <div><div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#f27b33]"><span>03</span><span className="h-px w-10 bg-[#f27b33]" /><span>من قلب المدينة</span></div><h2 className="text-4xl font-black text-[#f6ede2] sm:text-5xl">آخر المستجدات</h2></div>
          <button type="button" onClick={() => scrollToId('#contact')} data-testid="button-news-archive" className="hidden items-center gap-2 text-sm text-[#b08f77] transition-colors hover:text-[#f27b33] sm:flex">كل الأخبار <ChevronLeft size={17} /></button>
        </div>
        <div className="mt-14 divide-y divide-[#f6ede2]/10 border-y border-[#f6ede2]/10">
          {newsItems.map((item, index) => (
            <button type="button" key={item.date} data-testid={`button-news-${index + 1}`} onClick={() => scrollToId('#contact')} className="group grid w-full gap-5 py-7 text-right transition-colors hover:bg-[#f27b33]/[.04] sm:grid-cols-[.3fr_1fr_.3fr] sm:items-center">
              <div className="flex items-center gap-3 text-xs text-[#8c796d]"><span className={`h-2 w-2 rounded-full ${item.accent === 'orange' ? 'bg-[#f27b33]' : item.accent === 'sand' ? 'bg-[#d9a77b]' : 'bg-[#9b4925]'}`} />{item.category}</div>
              <div className="text-xl font-bold text-[#e8dbce] transition-colors group-hover:text-[#f27b33]">{item.title}</div>
              <div className="flex items-center justify-between text-xs text-[#806e62] sm:justify-end sm:gap-5"><span>{item.date}</span><ArrowUpLeft size={17} className="text-[#f27b33] opacity-0 transition-opacity group-hover:opacity-100" /></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivationForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="activation" className="border-t border-[#f6ede2]/10 bg-[#15100d] py-28" dir="rtl">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#f27b33]">
            <span>04</span>
            <span className="h-px w-10 bg-[#f27b33]" />
            <span>طلب التفعيل</span>
          </div>
          <h2 className="text-4xl font-black text-[#f6ede2] sm:text-5xl">
            قبل دخول المدينة،
            <br />
            <span className="text-[#f27b33]">عرّفنا بنفسك.</span>
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-[#aa978a]">
            جاوب على الأسئلة التالية بوضوح. جميع الإجابات كتابية، وسيتم مراجعة طلبك من فريق Five City.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-4">
            {activationQuestions.map((question, index) => (
              <label
                key={question.id}
                htmlFor={`activation-${question.id}`}
                className="block rounded-2xl border border-[#f6ede2]/10 bg-[#1a120e] p-5 transition-colors focus-within:border-[#f27b33]/60"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-[#f6ede2]">
                  <span className="font-brand text-xs text-[#f27b33]">{String(index + 1).padStart(2, '0')}</span>
                  {question.label}
                </span>
                <input
                  id={`activation-${question.id}`}
                  name={question.id}
                  type="text"
                  required
                  value={answers[question.id] ?? ''}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, [question.id]: event.target.value }));
                    setSubmitted(false);
                  }}
                  placeholder={question.placeholder}
                  className="mt-4 w-full border-b border-[#f6ede2]/15 bg-transparent px-1 py-3 text-sm text-[#f6ede2] outline-none placeholder:text-[#806e62] focus:border-[#f27b33]"
                />
              </label>
            ))}

            <button
              type="submit"
              data-testid="button-submit-activation"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-[#f27b33] px-6 py-4 font-bold text-[#160e0a] transition-all hover:-translate-y-1 hover:bg-[#ff9352]"
            >
              إرسال طلب التفعيل
              <ArrowLeft size={18} />
            </button>

            {submitted && (
              <div
                role="status"
                data-testid="status-activation-submitted"
                className="rounded-xl border border-[#f27b33]/30 bg-[#f27b33]/[.08] p-4 text-center text-sm leading-7 text-[#e8dbce]"
              >
                تم استلام إجاباتك في النموذج. تواصل معنا عبر الديسكورد لإكمال إجراءات التفعيل.
                <a
                  href={discordInvite}
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2 font-bold text-[#f27b33] underline underline-offset-4"
                >
                  دخول الديسكورد
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function StoreSection({ onActivate }: { onActivate: () => void }) {
  return (
    <section id="store" className="relative overflow-hidden bg-[#100d0b] py-28" dir="rtl">
      <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_20%,rgba(242,123,51,.07)_50%,transparent_75%)]" />
      <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#f27b33]/25 bg-[#1a120e] p-8 sm:p-14">
          <div className="scan-line absolute inset-y-0 left-0 w-full overflow-hidden" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex justify-center lg:order-2"><div className="flex h-44 w-44 items-center justify-center rounded-full border border-[#f27b33]/25 bg-[#f27b33]/[.06]"><LockKeyhole size={56} strokeWidth={1} className="text-[#f27b33]" /></div></div>
            <div className="lg:order-1">
              <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#f27b33]"><Store size={15} /><span>FIVE CITY STORE</span></div>
              <h2 className="text-4xl font-black text-[#f6ede2] sm:text-5xl">المتجر قادم<br /><span className="text-[#f27b33]">في الوقت المناسب.</span></h2>
              <p className="mt-6 max-w-lg leading-8 text-[#aa978a]">نجهّز لك مساحة خاصة بالدعم، العناصر الحصرية، وكل ما يضيف لقصتك دون أن يغيّر قواعد اللعبة.</p>
              <button type="button" onClick={onActivate} data-testid="button-activate-store" className="mt-8 flex items-center gap-3 rounded-xl border border-[#f27b33]/50 px-5 py-3 text-sm font-bold text-[#f6ede2] transition-all hover:bg-[#f27b33] hover:text-[#160e0a]"><Sparkles size={17} /> تفعيل إشعار الإطلاق</button>
              <div className="mt-4 text-xs text-[#806e62]">المتجر غير متاح حالياً — التفعيل مجهّز للمرحلة القادمة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ onContact }: { onContact: () => void }) {
  return (
    <footer id="contact" className="border-t border-[#f6ede2]/10 bg-[#0d0b0a] py-20" dir="rtl">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><BrandMark /><p className="mt-7 max-w-sm text-sm leading-8 text-[#927f72]">Five City — مساحة عربية جادة، لأشخاص يريدون أن يعيشوا القصة لا أن يشاهدوها.</p><div className="mt-7 flex gap-3"><a href={discordInvite} target="_blank" rel="noreferrer" aria-label="ديسكورد Five City" data-testid="link-discord" className="rounded-lg border border-[#f6ede2]/15 p-2.5 text-[#b09b8b] transition-colors hover:border-[#f27b33] hover:text-[#f27b33]"><MessageCircle size={18} /></a><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="انستغرام Five City" data-testid="link-instagram" className="rounded-lg border border-[#f6ede2]/15 p-2.5 text-[#b09b8b] transition-colors hover:border-[#f27b33] hover:text-[#f27b33]"><Instagram size={18} /></a><a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="يوتيوب Five City" data-testid="link-youtube" className="rounded-lg border border-[#f6ede2]/15 p-2.5 text-[#b09b8b] transition-colors hover:border-[#f27b33] hover:text-[#f27b33]"><Youtube size={18} /></a></div></div>
          <div><h3 className="mb-5 text-sm font-bold text-[#f6ede2]">استكشف</h3><div className="space-y-3 text-sm text-[#927f72]">{navItems.slice(0, 4).map((item) => <a key={item.href} href={item.href} onClick={() => scrollToId(item.href)} data-testid={`link-footer-${item.href.slice(1)}`} className="block transition-colors hover:text-[#f27b33]">{item.label}</a>)}</div></div>
          <div><h3 className="mb-5 text-sm font-bold text-[#f6ede2]">جاهز تبدأ؟</h3><p className="text-sm leading-8 text-[#927f72]">تواصل معنا وكن أول من يعرف موعد فتح المدينة.</p><button type="button" onClick={onContact} data-testid="button-footer-contact" className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f27b33]">تواصل مع الفريق <ArrowLeft size={16} /></button></div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-[#f6ede2]/10 pt-6 text-[11px] text-[#66574f] sm:flex-row"><span>© 2026 FIVE CITY. جميع الحقوق محفوظة.</span><span>صُنع بشغف لأجل مجتمع يستحق.</span></div>
      </div>
    </footer>
  );
}

function Modal({ type, onClose }: { type: 'store' | 'contact' | null; onClose: () => void }) {
  if (!type) return null;
  const store = type === 'store';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070505]/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-2xl border border-[#f27b33]/30 bg-[#1c1410] p-7 shadow-2xl" dir="rtl">
        <div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f27b33]/10 text-[#f27b33]">{store ? <Sparkles size={21} /> : <MessageCircle size={21} />}</div><button onClick={onClose} type="button" data-testid="button-close-modal" aria-label="إغلاق النافذة" className="text-[#927f72] hover:text-[#f6ede2]"><X size={20} /></button></div>
        <h2 id="modal-title" className="mt-7 text-2xl font-bold text-[#f6ede2]">{store ? 'أنت على القائمة.' : 'خلّنا نسمع منك.'}</h2>
        <p className="mt-3 leading-8 text-[#a99587]">{store ? 'تم تجهيز طلبك. سنعلن عن فتح المتجر هنا وفي قنوات المجتمع، وأنت الآن من أوائل المهتمين.' : 'اكتب لنا في ديسكورد، فريق Five City بانتظارك للإجابة عن كل ما يخص المدينة.'}</p>
        <button type="button" onClick={onClose} data-testid="button-modal-done" className="mt-7 w-full rounded-xl bg-[#f27b33] py-3.5 font-bold text-[#160e0a] transition-colors hover:bg-[#ff9352]">{store ? 'حسناً، بانتظار الإطلاق' : 'سأعود للموقع'}</button>
      </div>
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<'store' | 'contact' | null>(null);
  useEffect(() => {
    document.body.style.overflow = menuOpen || modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, modal]);
  return (
    <div className="min-h-[100dvh] bg-[#100d0b] font-body text-[#f6ede2]">
      <Header onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <About />
        <Departments />
        <Stats />
        <News />
        <ActivationForm />
        <StoreSection onActivate={() => setModal('store')} />
      </main>
      <Contact onContact={() => setModal('contact')} />
      <Modal type={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;