import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Bot, Mail, Calendar, Cloud, Table, Map, Terminal,
  Database, Bell, MessageSquare, Users, DollarSign, LayoutDashboard,
  Headphones, ShoppingCart, Globe, Check, Play, Zap, ArrowRight,
  UserPlus, Target, MessageCircle, PlugZap, Rocket, Workflow, LogIn
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '#about' },
];

const stats = [
  { value: '125+', label: 'Growing Clients' },
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

      <div className="flex items-center gap-2">
        {/* Login */}
        <Link
          to="/admin"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:border-yellow-300 transition-colors"
        >
          <LogIn size={14} />
          Login
        </Link>
        {/* CTA — visible on all sizes */}
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
        <div className="relative flex items-end justify-center min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]">
          <div className="absolute w-56 h-56 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full border border-yellow-100" style={{ background: 'rgba(253,209,0,0.07)' }} />
          <div className="absolute w-44 h-44 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-yellow-200" style={{ background: 'rgba(253,209,0,0.13)' }} />

          <img
            src="/eliteva-hero.png"
            alt="EliteVA AI assistant"
            className="relative z-10 w-[182px] sm:w-[252px] lg:w-[364px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(17,24,39,0.22)]"
          />

          {/* Floating badges — hidden on xs, show on sm+ */}
          <div className="hidden sm:flex absolute top-5 right-0 lg:top-8 lg:right-0 bg-white rounded-2xl px-3 py-2 shadow-lg items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
            <span className="text-green-500">●</span> Always Active
          </div>
          <div className="hidden sm:flex absolute bottom-6 left-0 lg:bottom-10 lg:left-0 bg-white rounded-2xl px-3 py-2 shadow-lg items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
            <Zap size={13} style={{ color: '#fdd100' }} /> AI-Powered
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorksSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPrimary, setSelectedPrimary] = useState<string[]>(['customer-service', 'whatsapp']);
  const [selectedSupport, setSelectedSupport] = useState<string[]>(['email-followup', 'dashboard']);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['lead-response', 'customer-support']);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(['gmail', 'google-drive', 'sheets', 'crm']);

  const toggleSelection = (current: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (current.includes(value)) {
      if (current.length === 1) return;
      setter(current.filter((item) => item !== value));
      return;
    }
    if (current.length >= 2) {
      setter([current[1], value]);
      return;
    }
    setter([...current, value]);
  };

  const toggleLimitedSelection = (
    current: string[],
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    limit: number
  ) => {
    if (current.includes(value)) {
      if (current.length === 1) return;
      setter(current.filter((item) => item !== value));
      return;
    }
    if (current.length >= limit) {
      setter([...current.slice(1), value]);
      return;
    }
    setter([...current, value]);
  };

  const primaryOptions = [
    { id: 'customer-service', label: 'Customer Service', desc: 'Handle inbound chat & FAQs', icon: Headphones, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'whatsapp', label: 'WhatsApp Automation', desc: 'Blast, reply, reminder flow', icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'lead-qualification', label: 'Lead Qualification', desc: 'Screen prospects automatically', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'order-handling', label: 'Order Handling', desc: 'Track and process requests', icon: ShoppingCart, color: 'text-pink-600', bg: 'bg-pink-100' },
  ];

  const supportOptions = [
    { id: 'email-followup', label: 'Email Follow-up', desc: 'Auto nurture & reminders', icon: Mail, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 'dashboard', label: 'Dashboard Reporting', desc: 'Summary and performance view', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { id: 'calendar', label: 'Calendar Scheduling', desc: 'Booking and task cadence', icon: Calendar, color: 'text-sky-600', bg: 'bg-sky-100' },
    { id: 'data-entry', label: 'Data Entry', desc: 'Capture into tools automatically', icon: Database, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  ];

  const channelOptions = [
    { id: 'lead-response', label: 'Lead Response', desc: 'Fast reply to incoming prospects', icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'auto-reminder', label: 'Auto Reminder', desc: 'Schedule reminders and follow-ups', icon: Bell, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'customer-support', label: 'Customer Support', desc: 'FAQ handling and inbound service', icon: Headphones, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'broadcast', label: 'Broadcast Follow-up', desc: 'Mass outreach with context', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ];

  const ecosystemOptions = [
    { id: 'apis', label: 'APIs', icon: Code2, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'gmail', label: 'Gmail', icon: Mail, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 'google-drive', label: 'Google Drive', icon: Cloud, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'sheets', label: 'Sheets', icon: Table, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'maps', label: 'Maps', icon: Map, color: 'text-teal-600', bg: 'bg-teal-100' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-gray-700', bg: 'bg-gray-100' },
    { id: 'crm', label: 'CRM', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  const stepItems = [
    { title: 'Create Agent', subtitle: 'Build your AI agent for your workflow', icon: UserPlus },
    { title: 'Connect Tools', subtitle: 'Link your apps & ecosystem', icon: PlugZap },
    { title: 'Pick Focus', subtitle: 'Choose primary & support services', icon: Target },
    { title: 'WhatsApp Flow', subtitle: 'Set your agent role on WhatsApp', icon: MessageCircle },
    { title: 'Scale Outcome', subtitle: 'See what your assistant achieves', icon: Rocket },
  ];

  const selectedPrimaryLabels = primaryOptions.filter((item) => selectedPrimary.includes(item.id)).map((item) => item.label);
  const selectedSupportLabels = supportOptions.filter((item) => selectedSupport.includes(item.id)).map((item) => item.label);
  const selectedChannelLabels = channelOptions.filter((item) => selectedChannels.includes(item.id)).map((item) => item.label);
  const selectedIntegrationLabels = ecosystemOptions.filter((item) => selectedIntegrations.includes(item.id)).map((item) => item.label);

  return (
    <section id="how-it-works" className="pt-10 md:pt-16 pb-20 md:pb-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-yellow-100 bg-[radial-gradient(circle_at_top_left,rgba(253,209,0,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(253,209,0,0.14),transparent_26%),linear-gradient(145deg,#ffffff,rgba(255,250,221,0.82))] shadow-[0_32px_100px_rgba(253,209,0,0.16)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
          <div className="absolute -top-20 -left-10 h-52 w-52 rounded-full blur-3xl" style={{ background: 'rgba(253,209,0,0.18)' }} />
          <div className="absolute top-24 right-0 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(253,209,0,0.12)' }} />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl" style={{ background: 'rgba(253,209,0,0.10)' }} />

          <div className="relative z-10 p-6 md:p-10 lg:p-14">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-xs font-bold tracking-[0.24em] uppercase mb-3" style={{ color: '#fdd100' }}>
                How It Works
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                Build the right agent, connect the right tools, reach the right outcome
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The flow is clear: create your agent first, connect your tools, define your service focus and channel behavior, then see the full outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6 lg:gap-8">
              <div className="rounded-[1.8rem] border border-yellow-100 bg-white/80 p-4 md:p-5 shadow-[0_18px_40px_rgba(17,24,39,0.05)] backdrop-blur">
                <div className="space-y-3">
                  {stepItems.map((step, index) => {
                    const Icon = step.icon;
                    const active = index === currentStep;
                    const completed = index < currentStep;
                    return (
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                          active
                            ? 'border-yellow-300 bg-yellow-50 shadow-[0_14px_30px_rgba(253,209,0,0.16)]'
                            : completed
                              ? 'border-yellow-200 bg-white'
                              : 'border-gray-200 bg-white hover:border-yellow-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-11 h-11 rounded-2xl flex items-center justify-center ${
                            active ? 'bg-yellow-100 text-gray-900' : completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon size={19} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-bold tracking-widest text-gray-400">STEP 0{index + 1}</span>
                              {completed && <Check size={15} className="text-green-600" />}
                            </div>
                            <p className="text-sm font-semibold text-gray-900 mt-1">{step.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{step.subtitle}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative rounded-[1.9rem] border border-yellow-100 bg-white/92 p-5 md:p-7 lg:p-8 shadow-[0_22px_55px_rgba(17,24,39,0.06)] backdrop-blur min-h-[560px]">
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[1.9rem] overflow-hidden bg-yellow-100/70">
                  <div
                    className="h-full rounded-r-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / stepItems.length) * 100}%`, background: 'linear-gradient(90deg, #fdd100 0%, #f2c300 100%)' }}
                  />
                </div>

                <div className="mb-6 pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-gray-900 shadow-sm">
                      {currentStep === 0 && <UserPlus size={20} />}
                      {currentStep === 1 && <PlugZap size={20} />}
                      {currentStep === 2 && <Target size={20} />}
                      {currentStep === 3 && <MessageCircle size={20} />}
                      {currentStep === 4 && <Rocket size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400">STEP 0{currentStep + 1}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{stepItems[currentStep].title}</h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {currentStep === 0 && 'Start by shaping an AI operator that truly fits your business and team needs.'}
                    {currentStep === 1 && 'Select the tools and apps most critical to connect to the agent so your workflow runs automatically.'}
                    {currentStep === 2 && 'Pick 2 primary and 2 support services so the agent stays focused on the highest-impact work.'}
                    {currentStep === 3 && 'Define how the agent operates on WhatsApp. Each selected role shapes the agent\'s operational behavior.'}
                    {currentStep === 4 && 'See your final assistant setup and the outcomes you\'ll achieve once the full flow is live.'}
                  </p>
                </div>

                {currentStep === 0 && (
                  <div className="rounded-3xl border border-yellow-100 bg-[linear-gradient(135deg,rgba(253,209,0,0.12),rgba(255,255,255,0.8))] p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
                      <div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                          The agent is built as a personal AI operator ready to take on primary and support roles.
                        </p>
                        <div className="space-y-2.5">
                          {['Custom workflow behavior', 'Business-context response', 'Scalable automation foundation'].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                              <Check size={15} className="text-gray-900" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl bg-white border border-yellow-100 p-5 shadow-sm">
                        <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
                          <Bot size={24} className="text-gray-900" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">EliteVA Core Agent</p>
                        <p className="text-sm text-gray-500">Ready for primary roles, support capabilities, and connections to your work apps.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="rounded-3xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm">
                    <div className="space-y-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Connected tools · pick up to 4</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ecosystemOptions.map((item) => {
                          const Icon = item.icon;
                          const active = selectedIntegrations.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleLimitedSelection(selectedIntegrations, item.id, setSelectedIntegrations, 4)}
                              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                                active ? 'border-yellow-300 bg-yellow-50 shadow-[0_12px_30px_rgba(253,209,0,0.16)]' : 'border-gray-200 bg-white hover:border-yellow-200'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                  <Icon size={18} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                    {active && <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">Selected</span>}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">Connected into the agent workflow</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Connected ecosystem</p>
                        <p className="text-sm text-gray-700">{selectedIntegrationLabels.join(' + ')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Primary focus · pick 2</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {primaryOptions.map((item) => {
                          const Icon = item.icon;
                          const active = selectedPrimary.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleSelection(selectedPrimary, item.id, setSelectedPrimary)}
                              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                                active ? 'border-yellow-300 bg-yellow-50 shadow-[0_12px_30px_rgba(253,209,0,0.16)]' : 'border-gray-200 bg-white hover:border-yellow-200'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                  <Icon size={18} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                    {active && <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">Selected</span>}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Support focus · pick 2</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {supportOptions.map((item) => {
                          const Icon = item.icon;
                          const active = selectedSupport.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleSelection(selectedSupport, item.id, setSelectedSupport)}
                              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                                active ? 'border-yellow-300 bg-yellow-50 shadow-[0_12px_30px_rgba(253,209,0,0.16)]' : 'border-gray-200 bg-white hover:border-yellow-200'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                  <Icon size={18} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                    {active && <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">Selected</span>}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">WhatsApp roles · pick up to 2</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {channelOptions.map((item) => {
                        const Icon = item.icon;
                        const active = selectedChannels.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleLimitedSelection(selectedChannels, item.id, setSelectedChannels, 2)}
                            className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                              active ? 'border-yellow-300 bg-yellow-50 shadow-[0_12px_30px_rgba(253,209,0,0.16)]' : 'border-gray-200 bg-white hover:border-yellow-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                <Icon size={18} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                                  {active && <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">Selected</span>}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Active WhatsApp behavior</p>
                      <p className="text-sm text-gray-700">{selectedChannelLabels.join(' + ')}</p>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-yellow-200 p-5 shadow-[0_20px_45px_rgba(253,209,0,0.12)]" style={{ background: 'linear-gradient(135deg, rgba(253,209,0,0.16) 0%, rgba(255,255,255,0.82) 100%)' }}>
                      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-500 mb-3">Your EliteVA setup</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/80 border border-white p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Connected tools</p>
                          <p className="text-sm text-gray-700">{selectedIntegrationLabels.join(' + ')}</p>
                        </div>
                        <div className="rounded-2xl bg-white/80 border border-white p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Primary focus</p>
                          <p className="text-sm text-gray-700">{selectedPrimaryLabels.join(' + ')}</p>
                        </div>
                        <div className="rounded-2xl bg-white/80 border border-white p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Support focus</p>
                          <p className="text-sm text-gray-700">{selectedSupportLabels.join(' + ')}</p>
                        </div>
                        <div className="rounded-2xl bg-white/80 border border-white p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">WhatsApp role</p>
                          <p className="text-sm text-gray-700">{selectedChannelLabels.join(' + ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Faster response time',
                        'Less repetitive manual work',
                        'Stronger follow-up consistency',
                        'Higher team capacity to scale',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900">
                          <Check size={15} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className="px-5 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Back
                  </button>
                  <div className="flex items-center gap-2 self-center">
                    {stepItems.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentStep(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === currentStep ? 'w-8 bg-gray-900' : index < currentStep ? 'w-5 bg-yellow-400' : 'w-2.5 bg-yellow-200'
                        }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => Math.min(stepItems.length - 1, prev + 1))}
                    className="px-6 py-3 rounded-full text-sm font-bold text-gray-900 hover:opacity-90 transition-opacity"
                    style={{ background: '#fdd100' }}
                  >
                    {currentStep === stepItems.length - 1 ? 'Done' : 'Next Step'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        View Pricing Plans <ArrowRight size={16} />
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
        <HowItWorksSection />
        <CTABanner />
      </main>
      <EVFooter />
    </div>
  );
};

export default EliteVALanding;
