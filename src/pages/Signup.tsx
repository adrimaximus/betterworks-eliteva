import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, LogIn, Check, ArrowRight, Sparkles, Loader2,
  Headphones, MessageCircle, Users, ShoppingCart, Mail,
  LayoutDashboard, Calendar, Bell, Database, Code2, Cloud,
  Table, Bot, Rocket, Target, PlugZap, Globe,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceDef {
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface ToolDef {
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface Recommendation {
  tools: string[];
  primaryFocus: string[];
  supportFocus: string[];
  expectedOutputs: string[];
  summary: string;
}

// ─── Catalogs ────────────────────────────────────────────────────────────────

const SERVICE_CATALOG: Record<string, ServiceDef> = {
  'customer-service':     { label: 'Customer Service',     desc: '24/7 inbound chat & FAQ handling',       icon: Headphones,     color: 'text-blue-600',   bg: 'bg-blue-100' },
  'whatsapp-automation':  { label: 'WhatsApp Automation',  desc: 'Blast, reply & reminder flows',          icon: MessageCircle,  color: 'text-green-600',  bg: 'bg-green-100' },
  'lead-qualification':   { label: 'Lead Qualification',   desc: 'Auto-screen incoming prospects',         icon: Users,          color: 'text-purple-600', bg: 'bg-purple-100' },
  'order-handling':       { label: 'Order Handling',       desc: 'Track and process requests automatically', icon: ShoppingCart,  color: 'text-pink-600',   bg: 'bg-pink-100' },
  'email-followup':       { label: 'Email Follow-up',      desc: 'Auto nurture sequences & reminders',     icon: Mail,           color: 'text-red-500',    bg: 'bg-red-100' },
  'dashboard-reporting':  { label: 'Dashboard Reporting',  desc: 'Live summaries & performance views',     icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  'calendar-scheduling':  { label: 'Calendar Scheduling',  desc: 'Booking & task cadence automation',      icon: Calendar,       color: 'text-sky-600',    bg: 'bg-sky-100' },
  'auto-reminder':        { label: 'Auto Reminder',        desc: 'Context-aware scheduled reminders',      icon: Bell,           color: 'text-orange-500', bg: 'bg-orange-100' },
  'data-entry':           { label: 'Data Entry',           desc: 'Auto-capture from comm channels',        icon: Database,       color: 'text-cyan-600',   bg: 'bg-cyan-100' },
};

const TOOL_CATALOG: Record<string, ToolDef> = {
  WhatsApp:     { label: 'WhatsApp',     icon: MessageCircle, color: 'text-green-600',  bg: 'bg-green-100' },
  Gmail:        { label: 'Gmail',        icon: Mail,          color: 'text-red-500',    bg: 'bg-red-100' },
  CRM:          { label: 'CRM',          icon: Users,         color: 'text-indigo-600', bg: 'bg-indigo-100' },
  'Google Sheets': { label: 'Sheets',   icon: Table,         color: 'text-green-600',  bg: 'bg-green-100' },
  'Google Calendar': { label: 'Calendar', icon: Calendar,    color: 'text-blue-500',   bg: 'bg-blue-100' },
  APIs:         { label: 'APIs',         icon: Code2,         color: 'text-purple-600', bg: 'bg-purple-100' },
  'Google Drive': { label: 'Drive',      icon: Cloud,         color: 'text-yellow-600', bg: 'bg-yellow-100' },
};

// ─── Business types ───────────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  'E-Commerce / Online Shop',
  'F&B / Restaurant / Cafe',
  'Property / Real Estate',
  'Retail / Toko Fisik',
  'Jasa Konsultasi / Consulting',
  'Healthcare / Klinik / Apotek',
  'Education / Kursus / Training Center',
  'Travel & Hospitality',
  'Logistics / Ekspedisi / Kurir',
  'Finance / Fintech / Asuransi',
  'Manufacturing / Produksi',
  'Marketing & Creative Agency',
  'Legal / Law Firm',
  'Construction / Kontraktor / Developer',
  'Beauty / Salon / Spa / Kecantikan',
  'Fitness / Gym / Health & Wellness',
  'Media / Content Creator / Publisher',
  'Technology / SaaS / Startup',
  'Events & Wedding Organizer',
  'Recruitment / HR Services',
  'Import / Export / Trading',
  'Automotive / Bengkel / Dealer',
  'Agriculture / Pertanian / Agribusiness',
  'Non-profit / Yayasan / Organisasi',
  'Other / Lainnya',
];

// ─── Recommendation engine ────────────────────────────────────────────────────

type BizConfig = { tools: string[]; primary: string[]; support: string[] };

const BIZ_MAP: Record<string, BizConfig> = {
  'E-Commerce / Online Shop':        { tools: ['WhatsApp','CRM','Google Sheets','Gmail'],           primary: ['order-handling','customer-service'],    support: ['email-followup','dashboard-reporting'] },
  'F&B / Restaurant / Cafe':         { tools: ['WhatsApp','Google Calendar','CRM'],                 primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','calendar-scheduling'] },
  'Property / Real Estate':          { tools: ['WhatsApp','CRM','Gmail','Google Calendar'],          primary: ['lead-qualification','whatsapp-automation'], support: ['email-followup','calendar-scheduling'] },
  'Retail / Toko Fisik':             { tools: ['WhatsApp','Google Sheets','CRM'],                   primary: ['order-handling','customer-service'],    support: ['dashboard-reporting','data-entry'] },
  'Jasa Konsultasi / Consulting':    { tools: ['Gmail','Google Calendar','CRM','Google Sheets'],     primary: ['lead-qualification','customer-service'], support: ['calendar-scheduling','email-followup'] },
  'Healthcare / Klinik / Apotek':    { tools: ['WhatsApp','Google Calendar','CRM'],                 primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','calendar-scheduling'] },
  'Education / Kursus / Training Center': { tools: ['WhatsApp','Gmail','Google Calendar','Google Sheets'], primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','email-followup'] },
  'Travel & Hospitality':            { tools: ['WhatsApp','Google Calendar','Gmail','CRM'],          primary: ['customer-service','whatsapp-automation'], support: ['calendar-scheduling','email-followup'] },
  'Logistics / Ekspedisi / Kurir':   { tools: ['WhatsApp','Google Sheets','APIs','CRM'],             primary: ['customer-service','order-handling'],    support: ['dashboard-reporting','data-entry'] },
  'Finance / Fintech / Asuransi':    { tools: ['Gmail','CRM','Google Sheets','APIs'],               primary: ['lead-qualification','customer-service'], support: ['email-followup','dashboard-reporting'] },
  'Manufacturing / Produksi':        { tools: ['Google Sheets','APIs','Gmail','CRM'],               primary: ['order-handling','customer-service'],    support: ['dashboard-reporting','data-entry'] },
  'Marketing & Creative Agency':     { tools: ['Gmail','CRM','Google Sheets','APIs'],               primary: ['lead-qualification','customer-service'], support: ['email-followup','dashboard-reporting'] },
  'Legal / Law Firm':                { tools: ['Gmail','Google Calendar','CRM'],                    primary: ['lead-qualification','customer-service'], support: ['calendar-scheduling','email-followup'] },
  'Construction / Kontraktor / Developer': { tools: ['WhatsApp','Google Sheets','CRM','Gmail'],     primary: ['lead-qualification','customer-service'], support: ['dashboard-reporting','email-followup'] },
  'Beauty / Salon / Spa / Kecantikan': { tools: ['WhatsApp','Google Calendar','CRM'],              primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','calendar-scheduling'] },
  'Fitness / Gym / Health & Wellness': { tools: ['WhatsApp','Google Calendar','CRM','Gmail'],       primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','calendar-scheduling'] },
  'Media / Content Creator / Publisher': { tools: ['Gmail','Google Sheets','APIs','CRM'],          primary: ['customer-service','lead-qualification'],  support: ['email-followup','dashboard-reporting'] },
  'Technology / SaaS / Startup':     { tools: ['APIs','Gmail','CRM','Google Sheets'],              primary: ['customer-service','lead-qualification'],  support: ['email-followup','dashboard-reporting'] },
  'Events & Wedding Organizer':      { tools: ['WhatsApp','Google Calendar','Gmail','CRM'],          primary: ['customer-service','whatsapp-automation'], support: ['calendar-scheduling','email-followup'] },
  'Recruitment / HR Services':       { tools: ['Gmail','CRM','Google Sheets','Google Calendar'],     primary: ['lead-qualification','customer-service'], support: ['email-followup','calendar-scheduling'] },
  'Import / Export / Trading':       { tools: ['WhatsApp','Google Sheets','Gmail','APIs'],           primary: ['customer-service','order-handling'],    support: ['dashboard-reporting','data-entry'] },
  'Automotive / Bengkel / Dealer':   { tools: ['WhatsApp','CRM','Google Calendar'],                 primary: ['customer-service','whatsapp-automation'], support: ['auto-reminder','dashboard-reporting'] },
  'Agriculture / Pertanian / Agribusiness': { tools: ['WhatsApp','Google Sheets','CRM'],           primary: ['order-handling','customer-service'],    support: ['dashboard-reporting','data-entry'] },
  'Non-profit / Yayasan / Organisasi': { tools: ['Gmail','Google Sheets','WhatsApp','CRM'],        primary: ['customer-service','whatsapp-automation'], support: ['email-followup','dashboard-reporting'] },
};

const PAIN_MAPPINGS = [
  { keywords: ['follow up','follow-up','lupa','telat','lambat','tidak balas','slow'], boostPrimary: ['whatsapp-automation'], boostSupport: ['auto-reminder','email-followup'], boostTools: ['WhatsApp'] },
  { keywords: ['customer','pelanggan','klien','complaint','komplain','service','layanan'], boostPrimary: ['customer-service'], boostSupport: ['email-followup'], boostTools: ['CRM','WhatsApp'] },
  { keywords: ['data','laporan','report','rekap','spreadsheet','excel','dokumentasi'], boostPrimary: [], boostSupport: ['dashboard-reporting','data-entry'], boostTools: ['Google Sheets'] },
  { keywords: ['order','pesanan','transaksi','invoice','payment','pembayaran'], boostPrimary: ['order-handling'], boostSupport: ['dashboard-reporting'], boostTools: ['Google Sheets','CRM'] },
  { keywords: ['lead','prospect','sales','closing','konversi','penjualan'], boostPrimary: ['lead-qualification'], boostSupport: ['email-followup'], boostTools: ['CRM','Gmail'] },
  { keywords: ['jadwal','schedule','booking','appointment','kalender','meeting'], boostPrimary: [], boostSupport: ['calendar-scheduling','auto-reminder'], boostTools: ['Google Calendar'] },
  { keywords: ['email','broadcast','blast','notifikasi'], boostPrimary: ['whatsapp-automation'], boostSupport: ['email-followup'], boostTools: ['Gmail','WhatsApp'] },
  { keywords: ['manual','repetitif','berulang','overwhelm','sibuk','kelelahan','waktu'], boostPrimary: ['customer-service'], boostSupport: ['data-entry','auto-reminder'], boostTools: [] },
  { keywords: ['api','integrasi','connect','sistem'], boostPrimary: [], boostSupport: ['dashboard-reporting'], boostTools: ['APIs'] },
];

const OUTPUT_MAP: Record<string, string> = {
  'customer-service':    'AI agent handles all inbound support & FAQs 24/7 — zero missed conversations',
  'whatsapp-automation': 'Automated replies, reminders, and blasts via WhatsApp at scale',
  'lead-qualification':  'Prospects screened and qualified automatically before reaching your team',
  'order-handling':      'Orders tracked, confirmed, and updated in real-time without manual input',
  'email-followup':      'Consistent nurture sequences running automatically after every interaction',
  'dashboard-reporting': 'Live summaries and operational reports generated from your data streams',
  'calendar-scheduling': 'Appointments booked, confirmed, and reminded — no back-and-forth needed',
  'auto-reminder':       'Zero missed follow-ups with context-aware, scheduled reminders',
  'data-entry':          'Data captured and structured automatically from your communication channels',
};

function dedupe<T>(arr: T[], limit: number): T[] {
  return [...new Set(arr)].slice(0, limit);
}

function buildRecommendation(params: {
  businessType: string;
  businessName: string;
  planInterest: string;
  businessPains: string;
}): Recommendation {
  const { businessType, businessName, planInterest, businessPains } = params;
  const base: BizConfig = BIZ_MAP[businessType] ?? {
    tools: ['WhatsApp','CRM','Gmail','Google Sheets'],
    primary: ['customer-service','whatsapp-automation'],
    support: ['email-followup','dashboard-reporting'],
  };

  let tools = [...base.tools];
  let primary = [...base.primary];
  let support = [...base.support];

  const painLower = businessPains.toLowerCase();
  for (const m of PAIN_MAPPINGS) {
    if (m.keywords.some((kw) => painLower.includes(kw))) {
      primary = [...m.boostPrimary, ...primary];
      support = [...m.boostSupport, ...support];
      tools = [...m.boostTools, ...tools];
    }
  }

  const finalPrimary = dedupe(primary, 2);
  const finalSupport = dedupe(support, 2);
  const finalTools = dedupe(tools, 4);
  const expectedOutputs = dedupe([...finalPrimary, ...finalSupport], 4)
    .map((f) => OUTPUT_MAP[f])
    .filter(Boolean)
    .slice(0, 3);

  const entity = businessName.trim() ? businessName.trim() : `your ${businessType} business`;
  const planText = planInterest === 'Enterprise' ? 'an enterprise-scale' : planInterest === 'Professional' ? 'a growing-team' : 'a lean starter';
  const primaryLabels = finalPrimary.map((id) => SERVICE_CATALOG[id]?.label ?? id).join(' and ');
  const toolsList = finalTools.join(', ');

  const summary = `For ${entity}, we recommend configuring EliteVA as ${planText} AI operator centered on ${primaryLabels}. The agent will integrate with ${toolsList}, automating the operational friction points you described. With this setup, your team can handle more volume, respond faster, and keep workflows running — without adding headcount.`;

  return { tools: finalTools, primaryFocus: finalPrimary, supportFocus: finalSupport, expectedOutputs, summary };
}

// ─── Components ──────────────────────────────────────────────────────────────

const SignupNavbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
      <Link to="/elite-va" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#fdd100' }}>
          <Zap size={16} className="text-gray-900" />
        </div>
        <span className="font-bold text-gray-900 text-lg">EliteVA</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-500">Already have an account?</span>
        <Link to="/login" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:border-yellow-300 transition-colors">
          <LogIn size={14} /> Login
        </Link>
      </div>
    </div>
  </nav>
);

// ─── Pain chips ───────────────────────────────────────────────────────────────

const PAIN_EXAMPLES = [
  'Customer follow-ups are frequently missed and inconsistent',
  'Too many incoming WhatsApp messages go unresponded in time',
  'Data is scattered across platforms and hard to consolidate accurately',
  'Order processing is manual, slow, and prone to human error',
  'Difficult to monitor team performance and progress in real-time',
  'Schedules and appointments often clash or go unreminded',
  'Leads from multiple platforms are not followed up automatically',
  'Email campaigns and broadcasts are sent one-by-one manually',
];

const PLAN_BENEFITS: Record<string, { price: string; features: string[] }> = {
  Starter: {
    price: '$29/mo',
    features: ['500 AI actions per month', 'Email automation', 'Basic CRM features', 'Data entry assistance', 'Email support', '1 user seat'],
  },
  Professional: {
    price: '$79/mo',
    features: ['2,500 AI actions per month', 'All Starter features', 'WhatsApp automation', 'Smart reminders', 'Priority support', '1 user seat'],
  },
  Enterprise: {
    price: '$199/mo',
    features: ['Unlimited AI actions', 'All Professional features', '24/7 customer service bot', 'Web scraping tools', 'Custom integrations', 'Dedicated account manager', '3 user seats'],
  },
};

// ─── Main page ────────────────────────────────────────────────────────────────

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    name: '', businessName: '', email: '', phone: '',
    businessType: '', customBusinessType: '', planInterest: '', businessPains: '',
  });
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [showRec, setShowRec] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const recRef = useRef<HTMLDivElement>(null);

  const canGenerate =
    form.name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.businessType !== '' &&
    form.planInterest !== '' &&
    form.businessPains.trim().length > 15;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset recommendation if key fields change
    if (['businessType', 'planInterest', 'businessPains'].includes(e.target.name)) {
      setShowRec(false);
      setRecommendation(null);
    }
  };

  const appendPain = (pain: string) => {
    const alreadySelected = selectedPains.includes(pain);
    if (alreadySelected) {
      // Deselect: remove from textarea and selectedPains
      setSelectedPains((prev) => prev.filter((p) => p !== pain));
      setForm((prev) => ({
        ...prev,
        businessPains: prev.businessPains
          .split('\n')
          .filter((line) => line.trim() !== pain.trim())
          .join('\n')
          .trim(),
      }));
    } else {
      setSelectedPains((prev) => [...prev, pain]);
      setForm((prev) => ({
        ...prev,
        businessPains: prev.businessPains
          ? `${prev.businessPains.trimEnd()}\n${pain}`
          : pain,
      }));
    }
    setShowRec(false);
    setRecommendation(null);
  };

  const handleGenerate = async () => {
    if (!canGenerate || isThinking) return;
    setIsThinking(true);
    setThinkingStep(0);
    setShowRec(false);
    setRecommendation(null);

    const t1 = setTimeout(() => setThinkingStep(1), 800);
    const t2 = setTimeout(() => setThinkingStep(2), 1700);
    const t3 = setTimeout(() => setThinkingStep(3), 2600);

    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: form.businessType,
          businessName: form.businessName,
          planInterest: form.planInterest,
          businessPains: form.businessPains,
        }),
      });
      const rec = res.ok ? await res.json() : buildRecommendation({
        businessType: form.businessType, businessName: form.businessName,
        planInterest: form.planInterest, businessPains: form.businessPains,
      });
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      setThinkingStep(3);
      setTimeout(() => { setRecommendation(rec); setIsThinking(false); setShowRec(true); }, 400);
    } catch {
      const rec = buildRecommendation({
        businessType: form.businessType, businessName: form.businessName,
        planInterest: form.planInterest, businessPains: form.businessPains,
      });
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      setRecommendation(rec); setIsThinking(false); setShowRec(true);
    }
  };

  useEffect(() => {
    if (showRec && recRef.current) {
      setTimeout(() => recRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [showRec]);

  const handleSubmit = async (withRec: boolean = true) => {
    if (!canGenerate) return;
    setIsSubmitting(true);
    setSubmitError('');
    const { error } = await supabase.from('eliteva_signups').insert({
      name: form.name.trim(),
      business_name: form.businessName.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      business_type: form.businessType,
      plan_interest: form.planInterest,
      business_pains: form.businessPains.trim(),
      ai_recommendation: withRec ? recommendation : null,
      status: 'new',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(form.businessType === 'Other / Lainnya' && form.customBusinessType.trim() && { business_type: form.customBusinessType.trim() }),
    });
    setIsSubmitting(false);
    if (error) {
      setSubmitError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <SignupNavbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-20">
          <div className="max-w-md w-full text-center py-20">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_12px_40px_rgba(253,209,0,0.3)]" style={{ background: '#fdd100' }}>
              <Check size={36} className="text-gray-900" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              Welcome to EliteVA, {form.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Your setup profile has been saved. Our team will reach out within <strong>24 hours</strong> to configure your AI agent based on your recommendation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/elite-va" className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:border-yellow-300 transition-colors">
                Back to Home
              </Link>
              <Link to="/pricing" className="px-6 py-3 rounded-full text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: '#fdd100' }}>
                View Pricing Plans
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <SignupNavbar />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-4" style={{ color: '#fdd100' }}>
            <Sparkles size={13} /> Build Your AI Agent
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Design Your Ideal{' '}
            <span style={{ color: '#fdd100' }}>EliteVA Setup</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Tell us about your business and challenges. We'll generate a personalized AI agent configuration — tools, focus areas, and expected outcomes — tailored to your workflow.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="rounded-[2rem] border border-gray-100 bg-white shadow-[0_24px_80px_rgba(17,24,39,0.07)] p-6 md:p-10 space-y-8">

            {/* Section 1: Your Info */}
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">Your Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="e.g. Adri Maximus"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    name="businessName" value={form.businessName} onChange={handleChange}
                    placeholder="e.g. Betterworks Studio"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp / Phone</label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+62 812 3456 7890"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Section 2: Your Business */}
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">Your Business</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 md:col-span-1 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Type <span className="text-red-400">*</span></label>
                  <select
                    name="businessType" value={form.businessType} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-yellow-400 transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select your business category</option>
                    {BUSINESS_TYPES.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                  {form.businessType === 'Other / Lainnya' && (
                    <input
                      name="customBusinessType" value={form.customBusinessType} onChange={handleChange}
                      placeholder="Describe your business type..."
                      className="w-full rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Plan Interest <span className="text-red-400">*</span></label>
                  <select
                    name="planInterest" value={form.planInterest} onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-yellow-400 transition-colors bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select a plan</option>
                    <option value="Starter">Starter — $29/mo</option>
                    <option value="Professional">Professional — $79/mo</option>
                    <option value="Enterprise">Enterprise — $199/mo</option>
                  </select>
                  {form.planInterest && PLAN_BENEFITS[form.planInterest] && (
                    <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                        {form.planInterest} plan — {PLAN_BENEFITS[form.planInterest].price}
                      </p>
                      <div className="space-y-1.5">
                        {PLAN_BENEFITS[form.planInterest].features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-gray-700">
                            <Check size={11} className="text-gray-900 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Section 3: Business Pains */}
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-1">Your Work Challenges <span className="text-red-400">*</span></p>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Describe the recurring friction, missed steps, or manual bottlenecks that slow your business down. Be specific — the more detail, the more accurate your recommendation.
              </p>

              {/* Example chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {PAIN_EXAMPLES.map((p) => {
                  const selected = selectedPains.includes(p);
                  return (
                    <button
                      key={p} type="button" onClick={() => appendPain(p)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selected
                          ? 'border-yellow-400 bg-yellow-100 text-gray-900 font-semibold'
                          : 'border-gray-200 text-gray-600 hover:border-yellow-300 hover:bg-yellow-50'
                      }`}
                    >
                      {selected ? '✓' : '+'} {p.length > 48 ? p.slice(0, 48) + '…' : p}
                    </button>
                  );
                })}
              </div>

              <textarea
                name="businessPains" value={form.businessPains} onChange={handleChange}
                rows={5}
                placeholder="e.g. Terlalu banyak pesan masuk yang tidak tertangani tepat waktu, follow-up pelanggan sering terlewat, data tersebar di berbagai platform dan sulit direkap, proses order masih manual dan rawan human error..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none leading-relaxed"
              />
            </div>

          </div>

          {/* Generate + Submit buttons */}
          {canGenerate && !isThinking && !showRec && (
            <div className="mt-6 space-y-3">
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-gray-900 font-bold text-sm md:text-base hover:opacity-90 transition-opacity shadow-[0_8px_30px_rgba(253,209,0,0.35)]"
                  style={{ background: '#fdd100' }}
                >
                  <Sparkles size={18} />
                  Generate My AI Agent Setup
                </button>
                <p className="text-xs text-gray-400 mt-2">Get a personalized tool & focus recommendation first</p>
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:border-yellow-300 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <>Submit Directly <ArrowRight size={14} /></>}
                </button>
                {submitError && <p className="text-xs text-red-500 mt-2">{submitError}</p>}
              </div>
            </div>
          )}

          {/* Re-generate button */}
          {canGenerate && !isThinking && showRec && (
            <div className="mt-4 text-center">
              <button
                onClick={handleGenerate}
                className="text-xs text-gray-400 hover:text-gray-700 underline transition-colors"
              >
                Regenerate recommendation
              </button>
            </div>
          )}
        </div>
      </section>

      {/* AI Thinking animation */}
      {isThinking && (
        <section className="pb-8">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <div className="rounded-[2rem] border border-yellow-100 bg-[linear-gradient(135deg,rgba(253,209,0,0.08),rgba(255,255,255,0.95))] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center">
                  <Bot size={20} className="text-gray-900" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">AI Processing</p>
                  <p className="text-sm font-semibold text-gray-900">Building your configuration...</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { step: 1, label: 'Analyzing your business profile and category...' },
                  { step: 2, label: 'Matching operational challenges to service capabilities...' },
                  { step: 3, label: 'Building your personalized agent configuration...' },
                ].map(({ step, label }) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 transition-all duration-500 ${thinkingStep >= step ? 'opacity-100' : 'opacity-0 translate-y-2'}`}
                    style={{ transitionDelay: `${(step - 1) * 100}ms` }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      thinkingStep > step
                        ? 'bg-green-100'
                        : 'bg-yellow-100'
                    }`}>
                      {thinkingStep > step
                        ? <Check size={12} className="text-green-600" />
                        : <Loader2 size={12} className="text-gray-900 animate-spin" />
                      }
                    </div>
                    <p className="text-sm text-gray-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recommendation card */}
      {showRec && recommendation && (
        <section className="pb-10" ref={recRef}>
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_80px_rgba(253,209,0,0.22)]">
              {/* Header */}
              <div className="px-6 md:px-10 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #fdd100 0%, #f0c000 100%)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">AI Recommendation</p>
                    <h3 className="text-lg font-extrabold text-gray-900">Your EliteVA Configuration</h3>
                  </div>
                </div>
                {/* Tools */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {recommendation.tools.map((tool) => {
                    const t = TOOL_CATALOG[tool];
                    if (!t) return <span key={tool} className="px-3 py-1.5 rounded-full bg-white/70 text-xs font-semibold text-gray-800">{tool}</span>;
                    const Icon = t.icon;
                    return (
                      <span key={tool} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-xs font-semibold text-gray-800">
                        <span className={`${t.bg} ${t.color} p-0.5 rounded-full`}><Icon size={11} /></span>
                        {t.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div className="bg-white px-6 md:px-10 py-7 space-y-6">

                {/* Focus grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Primary Focus</p>
                    <div className="space-y-2">
                      {recommendation.primaryFocus.map((id) => {
                        const s = SERVICE_CATALOG[id];
                        if (!s) return null;
                        const Icon = s.icon;
                        return (
                          <div key={id} className="flex items-center gap-2.5 rounded-xl border border-gray-100 p-3 bg-gray-50">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}><Icon size={15} /></div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{s.label}</p>
                              <p className="text-[10px] text-gray-500">{s.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Support Capabilities</p>
                    <div className="space-y-2">
                      {recommendation.supportFocus.map((id) => {
                        const s = SERVICE_CATALOG[id];
                        if (!s) return null;
                        const Icon = s.icon;
                        return (
                          <div key={id} className="flex items-center gap-2.5 rounded-xl border border-gray-100 p-3 bg-gray-50">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}><Icon size={15} /></div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{s.label}</p>
                              <p className="text-[10px] text-gray-500">{s.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Expected outcomes */}
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Expected Outcomes</p>
                  <div className="space-y-2">
                    {recommendation.expectedOutputs.map((output) => (
                      <div key={output} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check size={15} className="mt-0.5 flex-shrink-0 text-gray-900" />
                        {output}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Summary */}
                <div className="rounded-2xl border border-yellow-100 bg-yellow-50/60 p-4">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Summary</p>
                  <p className="text-sm text-gray-700 leading-relaxed italic">{recommendation.summary}</p>
                </div>

                {/* Submit */}
                <div className="pt-2 space-y-3">
                  {submitError && (
                    <p className="text-sm text-red-500 text-center">{submitError}</p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                    style={{ background: '#fdd100' }}
                  >
                    {isSubmitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Saving your setup...</>
                    ) : (
                      <>Start My Free Trial <ArrowRight size={16} /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    By continuing you agree to our terms. No credit card required. Setup in 5 minutes.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
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
            <Link to="/about" className="hover:text-gray-700 transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
