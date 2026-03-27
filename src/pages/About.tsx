import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, LogIn, Bot, Target, Users, Shield, Rocket, Heart,
  ArrowRight, Check, MessageCircle, Globe, PlugZap
} from 'lucide-react';

// ─── Shared nav items ─────────────────────────────────────────────────────────

const navItems = [
  { label: 'Services', href: '/elite-va#services' },
  { label: 'How it Works', href: '/elite-va#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const AboutNavbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
      <Link to="/elite-va" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#fdd100' }}>
          <Zap size={16} className="text-gray-900" />
        </div>
        <span className="font-bold text-gray-900 text-lg">EliteVA</span>
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.href}
              className={`text-sm font-medium transition-colors ${
                item.label === 'About'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <Link
          to="/admin"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:border-yellow-300 transition-colors"
        >
          <LogIn size={14} />
          Login
        </Link>
        <Link
          to="/pricing"
          className="inline-flex items-center px-4 md:px-5 py-2 rounded-full text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ background: '#fdd100' }}
        >
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const AboutHero: React.FC = () => (
  <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
      <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-4" style={{ color: '#fdd100' }}>
        <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#fdd100' }} />
        About Us
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto mb-5">
        We build AI that works{' '}
        <span style={{ color: '#fdd100' }}>while you focus</span>{' '}
        on what matters
      </h1>
      <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        EliteVA is a product by Betterworks — built to help Indonesian businesses run smarter
        with AI-powered virtual assistants that automate the repetitive, and amplify the meaningful.
      </p>
    </div>
  </section>
);

const MissionSection: React.FC = () => (
  <section className="py-12 md:py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#fdd100' }}>Our Mission</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5 leading-snug">
            Make business automation accessible to every growing team
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
            Too many businesses still rely on manual tasks that drain time and energy. We exist to change that —
            by building AI agents that connect to the tools you already use and work 24/7 without burning out.
          </p>
          <div className="space-y-3">
            {[
              'Reduce time spent on repetitive operations',
              'Help teams scale without growing headcount',
              'Make AI practical, not just impressive',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check size={16} className="mt-0.5 flex-shrink-0 text-gray-900" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right: visual card */}
        <div className="relative rounded-[2rem] overflow-hidden p-8 md:p-10 shadow-[0_24px_60px_rgba(253,209,0,0.18)]"
          style={{ background: 'linear-gradient(135deg, #fdd100 0%, #f2c300 100%)' }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"
            style={{ background: 'rgba(255,255,255,0.5)' }} />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
              <Bot size={26} className="text-white" />
            </div>
            <p className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 leading-snug">
              "Your business shouldn't stop when your team does."
            </p>
            <p className="text-sm text-gray-800 font-medium">— EliteVA, built by Betterworks</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-gray-900',
      title: 'Outcome-First',
      desc: 'We design everything around real business results — not features for features\' sake.',
    },
    {
      icon: Shield,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Reliable by Default',
      desc: 'Our agents are built to be dependable — available 24/7 with consistent, predictable behavior.',
    },
    {
      icon: PlugZap,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Deeply Integrated',
      desc: 'We believe AI that doesn\'t connect to your existing stack is just a demo. We wire it all up.',
    },
    {
      icon: Heart,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      title: 'Human-Centered',
      desc: 'Automation should free people, not replace them. We build tools that empower your team.',
    },
    {
      icon: Globe,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      title: 'Built for Indonesia',
      desc: 'We understand local business context — WhatsApp-first culture, regional workflows, and real needs.',
    },
    {
      icon: Rocket,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      title: 'Scale-Ready',
      desc: 'Whether you\'re a solopreneur or a growing team, our platform grows with your ambition.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#fdd100' }}>Our Values</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">What we stand for</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="p-5 md:p-6 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-200 bg-white">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${v.iconBg} ${v.iconColor} mb-4`}>
                  <Icon size={19} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm md:text-base">{v.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StatsSection: React.FC = () => (
  <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {[
          { value: '125+', label: 'Growing Clients', icon: Users },
          { value: '98%', label: 'Satisfaction Rate', icon: Heart },
          { value: '24/7', label: 'Always On', icon: Zap },
          { value: '10x', label: 'Faster Processing', icon: Rocket },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center mb-3">
                <Icon size={18} className="text-gray-900" />
              </div>
              <span className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: '#fdd100' }}>{s.value}</span>
              <span className="text-xs md:text-sm text-gray-500">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const WhoWeServeSection: React.FC = () => (
  <section className="py-12 md:py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="text-center mb-10 md:mb-14">
        <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#fdd100' }}>Who We Serve</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Built for businesses that move fast</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: MessageCircle,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Sales & Marketing Teams',
            desc: 'Automate lead follow-up, WhatsApp outreach, and prospect qualification without adding headcount.',
          },
          {
            icon: Users,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            title: 'Customer Service Ops',
            desc: 'Handle FAQs, inbound tickets, and customer reminders around the clock with an always-on AI agent.',
          },
          {
            icon: Target,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            title: 'Founders & Solopreneurs',
            desc: 'Run your operations lean. Let the agent manage scheduling, data entry, and communication flows.',
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title}
              className="rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-md transition-all duration-200 p-6 bg-white"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor} mb-4`}>
                <Icon size={19} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{item.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const AboutCTA: React.FC = () => (
  <section className="py-10 md:py-16 mx-4 mb-10 rounded-3xl max-w-6xl lg:mx-auto" style={{ background: '#fdd100' }}>
    <div className="text-center px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
        Ready to automate your business?
      </h2>
      <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 max-w-md mx-auto">
        Start with a free trial and see how EliteVA fits into your workflow in minutes.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg text-sm"
        >
          View Pricing Plans <ArrowRight size={16} />
        </Link>
        <Link
          to="/elite-va#how-it-works"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/80 text-gray-900 font-semibold hover:bg-white transition-colors text-sm border border-yellow-300"
        >
          See How It Works
        </Link>
      </div>
    </div>
  </section>
);

const AboutFooter: React.FC = () => (
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
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <Link to="/elite-va" className="hover:text-gray-700 transition-colors">Home</Link>
        <Link to="/pricing" className="hover:text-gray-700 transition-colors">Pricing</Link>
        <Link to="/about" className="hover:text-gray-700 transition-colors font-medium text-gray-600">About</Link>
      </div>
    </div>
  </footer>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const About: React.FC = () => (
  <div className="min-h-screen bg-white font-sans">
    <AboutNavbar />
    <main>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <StatsSection />
      <WhoWeServeSection />
      <AboutCTA />
    </main>
    <AboutFooter />
  </div>
);

export default About;
