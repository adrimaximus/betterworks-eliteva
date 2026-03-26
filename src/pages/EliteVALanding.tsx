import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Bot, Mail, Calendar, Cloud, Table, Map, Terminal,
  Database, Bell, MessageSquare, Users, DollarSign, LayoutDashboard,
  Headphones, ShoppingCart, Globe, Check, Play, Zap, ArrowRight
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '#about' },
];

const stats = [
  { value: '500+', label: 'Active Clients' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Available Support' },
  { value: '10x', label: 'Faster Processing' },
];

const integrations = [
  { icon: <Code2 size={18} />, label: 'APIs', bg: 'bg-purple-100', color: 'text-purple-600' },
  { icon: <Bot size={18} />, label: 'AI Models', bg: 'bg-blue-100', color: 'text-blue-600' },
  { icon: <Mail size={18} />, label: 'Gmail', bg: 'bg-red-100', color: 'text-red-500' },
  { icon: <Calendar size={18} />, label: 'Calendar', bg: 'bg-blue-100', color: 'text-blue-500' },
  { icon: <Cloud size={18} />, label: 'Drive', bg: 'bg-yellow-100', color: 'text-yellow-600' },
  { icon: <Table size={18} />, label: 'Sheets', bg: 'bg-green-100', color: 'text-green-600' },
  { icon: <Map size={18} />, label: 'Maps', bg: 'bg-teal-100', color: 'text-teal-600' },
  { icon: <Terminal size={18} />, label: 'Terminal', bg: 'bg-gray-100', color: 'text-gray-700' },
];

const services = [
  {
    icon: <Database size={22} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Input Data',
    desc: 'Automated data entry and processing with high accuracy and speed.',
  },
  {
    icon: <Bell size={22} />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Smart Reminder',
    desc: 'Never miss deadlines with intelligent scheduling and reminders.',
  },
  {
    icon: <Mail size={22} />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Email Automation',
    desc: 'Automate email responses, follow-ups, and campaigns effortlessly.',
  },
  {
    icon: <MessageSquare size={22} />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    title: 'WhatsApp Blast',
    desc: 'Send bulk invitations and messages via WhatsApp automatically.',
  },
  {
    icon: <Users size={22} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'CRM Management',
    desc: 'Manage customer relationships and track interactions seamlessly.',
  },
  {
    icon: <DollarSign size={22} />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title: 'Budgeting',
    desc: 'Track expenses and manage budgets with smart financial tools.',
  },
  {
    icon: <LayoutDashboard size={22} />,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: 'Sheet Dashboard',
    desc: 'Build custom dashboards and architecture for data visualization.',
  },
  {
    icon: <Headphones size={22} />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: '24/7 Customer Service',
    desc: 'Round-the-clock support to handle customer inquiries anytime.',
  },
  {
    icon: <ShoppingCart size={22} />,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    title: 'Making Order',
    desc: 'Process and manage orders automatically for your business.',
  },
  {
    icon: <Globe size={22} />,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    title: 'Web Browsing & Scrape',
    desc: 'Extract and gather data from the web intelligently and efficiently.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const EVNavbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link to="/elite-va" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#fdd100' }}>
          <Zap size={16} className="text-gray-900" />
        </div>
        <span className="font-bold text-gray-900 text-lg">EliteVA</span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA — visible on all sizes */}
      <Link
        to="/pricing"
        className="inline-flex items-center px-4 md:px-5 py-2 rounded-full text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity"
        style={{ background: '#fdd100' }}
      >
        Get Started
      </Link>
    </div>
  </nav>
);

const HeroSection: React.FC = () => (
  <section className="pt-20 md:pt-28 pb-8 md:pb-12 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left: content */}
        <div className="space-y-5 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#fdd100' }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#fdd100' }} />
            AI-Powered Virtual Assistant
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Elite Virtual{' '}
            <span style={{ color: '#fdd100' }}>Assistant AI Agent</span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            Automate your business operations with our intelligent AI agent.
            From data entry to customer service, we handle it all 24/7.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Link
              to="/pricing"
              className="px-6 py-3 rounded-full text-gray-900 font-bold hover:opacity-90 transition-opacity text-sm md:text-base"
              style={{ background: '#fdd100' }}
            >
              Start Free Trial
            </Link>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:border-yellow-300 transition-colors text-sm md:text-base">
              <Play size={15} className="fill-current" />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-green-500" />
              Setup in 5 minutes
            </span>
          </div>
        </div>

        {/* Right: hero image visual */}
        <div className="relative flex items-end justify-center min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]">
          <div className="absolute w-56 h-56 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full border border-yellow-100" style={{ background: 'rgba(253,209,0,0.07)' }} />
          <div className="absolute w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-yellow-200" style={{ background: 'rgba(253,209,0,0.13)' }} />

          <img
            src="/eliteva-hero.png"
            alt="EliteVA AI assistant"
            className="relative z-10 w-[260px] sm:w-[360px] lg:w-[520px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(17,24,39,0.22)]"
          />

          {/* Floating badges — hidden on xs, show on sm+ */}
          <div className="hidden sm:flex absolute top-6 right-2 lg:top-10 lg:right-4 bg-white rounded-2xl px-3 py-2 shadow-lg items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
            <span className="text-green-500">●</span> Always Active
          </div>
          <div className="hidden sm:flex absolute bottom-8 left-4 lg:bottom-14 lg:left-2 bg-white rounded-2xl px-3 py-2 shadow-lg items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
            <Zap size={13} style={{ color: '#fdd100' }} /> AI-Powered
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsBar: React.FC = () => (
  <section className="bg-white border-y border-gray-100">
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center py-3 px-2 ${
              i % 2 === 0 ? 'border-r border-gray-100' : ''
            } ${
              i < 2 ? 'border-b md:border-b-0 border-gray-100' : ''
            } ${
              i === 1 || i === 2 ? 'md:border-r md:border-gray-100' : ''
            }`}
          >
            <span className="text-2xl md:text-3xl font-extrabold" style={{ color: '#fdd100' }}>{s.value}</span>
            <span className="text-xs md:text-sm text-gray-500 mt-0.5 text-center">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WorksWithSection: React.FC = () => (
  <section className="py-8 md:py-12 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
        {/* Label */}
        <div className="flex-shrink-0">
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#fdd100' }}>Works With</p>
          <div className="w-12 h-0.5 rounded" style={{ background: '#fdd100' }} />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-gray-200 mx-2" />

        {/* Sub text — visible on all sizes */}
        <p className="text-sm md:text-base text-gray-700 font-medium">
          Online Support to Scale Up Your Business and make it{' '}
          <span className="font-bold text-gray-900">Betterworks</span>
        </p>
      </div>

      {/* Integration pills */}
      <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
        {integrations.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className={`${item.bg} ${item.color} p-1 md:p-1.5 rounded-full`}>
              {item.icon}
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesSection: React.FC = () => (
  <section id="services" className="py-12 md:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          Our AI-Powered Services
        </h2>
        <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
          Comprehensive virtual assistant solutions to streamline your business operations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="p-4 md:p-5 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className={`inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl ${svc.iconBg} ${svc.iconColor} mb-3 md:mb-4`}>
              {svc.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{svc.title}</h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{svc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTABanner: React.FC = () => (
  <section className="py-10 md:py-16 mx-4 mb-10 rounded-3xl max-w-6xl lg:mx-auto" style={{ background: '#fdd100' }}>
    <div className="text-center px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
        Ready to Transform Your Business?
      </h2>
      <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 max-w-md mx-auto">
        Start your free trial today and experience the power of AI automation
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg"
      >
        Lihat Paket Harga <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

const EVFooter: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-100 py-8">
    <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
      <Link to="/elite-va" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fdd100' }}>
          <Zap size={13} className="text-gray-900" />
        </div>
        <span className="font-bold text-gray-900">EliteVA</span>
      </Link>
      <p className="text-sm text-gray-500">
        Online Support to Scale Up Your Business and make it a{' '}
        <span className="font-bold text-gray-800">Betterworks</span>
      </p>
      <p className="text-sm text-gray-400">@hapx_digital</p>
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const EliteVALanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <EVNavbar />
      <main>
        <HeroSection />
        <StatsBar />
        <WorksWithSection />
        <ServicesSection />
        <CTABanner />
      </main>
      <EVFooter />
    </div>
  );
};

export default EliteVALanding;
