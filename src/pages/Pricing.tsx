import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, ArrowLeft, Code2, Bot, Mail, Calendar, Cloud, Table, Map, Terminal, MapPin, Phone } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for small businesses just getting started',
    price: '449K',
    highlighted: false,
    features: [
      '500 AI actions per month',
      'Email automation',
      'Basic CRM features',
      'Data entry assistance',
      'Email support',
      '1 user seat',
    ],
    cta: 'Get Started',
    ctaStyle: 'border',
  },
  {
    name: 'Professional',
    tagline: 'Best for growing businesses with advanced needs',
    price: '1.2Mio',
    highlighted: true,
    badge: 'MOST POPULAR',
    features: [
      '2,500 AI actions per month',
      'All Starter features',
      'WhatsApp automation',
      'Smart reminders',
      'Priority support',
      '1 user seat',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'dark',
  },
  {
    name: 'Enterprise',
    tagline: 'Custom solutions for large organizations',
    price: '3.1Mio',
    highlighted: false,
    features: [
      'Unlimited AI actions',
      'All Professional features',
      '24/7 customer service bot',
      'Web scraping tools',
      'Custom integrations',
      'Priority support',
      '3 user seats',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'dark-filled',
  },
];

const integrations = [
  { icon: <Code2 size={20} />, bg: 'bg-purple-100', color: 'text-purple-600' },
  { icon: <Bot size={20} />, bg: 'bg-yellow-50', color: 'text-yellow-700' },
  { icon: <Mail size={20} />, bg: 'bg-red-100', color: 'text-red-500' },
  { icon: <Calendar size={20} />, bg: 'bg-blue-100', color: 'text-blue-500' },
  { icon: <Cloud size={20} />, bg: 'bg-yellow-100', color: 'text-yellow-600' },
  { icon: <Table size={20} />, bg: 'bg-green-100', color: 'text-green-600' },
  { icon: <Map size={20} />, bg: 'bg-teal-100', color: 'text-teal-600' },
  { icon: <Terminal size={20} />, bg: 'bg-gray-100', color: 'text-gray-700' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const PricingNavbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
      <Link to="/elite-va" className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: '#fdd100' }}
        >
          <Zap size={16} className="text-gray-900" />
        </div>
        <span className="font-bold text-gray-900 text-lg">EliteVA</span>
      </Link>

      <Link
        to="/elite-va"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={15} />
          <span className="hidden sm:inline">Back to Landing</span>
      </Link>
    </div>
  </nav>
);

const PricingCards: React.FC = () => (
  <section className="pt-24 md:pt-28 pb-12 md:pb-16 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <p
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: '#fdd100' }}
        >
          Pricing Plans
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Choose Your Perfect Plan
        </h1>
        <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
          Flexible pricing to match your business needs. Start free, upgrade anytime.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-3xl p-6 md:p-8 transition-shadow duration-200 ${
              plan.highlighted
                ? 'shadow-2xl mt-4 md:mt-0'
                : 'bg-white border border-gray-100 hover:shadow-md'
            }`}
            style={
              plan.highlighted
                ? { background: '#fdd100' }
                : {}
            }
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wider">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan name & tagline */}
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-1 ${
                  plan.highlighted ? 'text-gray-900' : 'text-gray-900'
                }`}
              >
                {plan.name}
              </h2>
              <p
                className={`text-sm ${
                  plan.highlighted ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {plan.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span
                className={`text-5xl font-extrabold ${
                  plan.highlighted ? 'text-gray-900' : 'text-gray-900'
                }`}
              >
                Rp {plan.price}
              </span>
              <span
                className={`text-sm ml-1 ${
                  plan.highlighted ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                /bulan
              </span>
            </div>

            {/* Divider */}
            <div
              className={`w-full h-px mb-6 ${
                plan.highlighted ? 'bg-yellow-300' : 'bg-gray-100'
              }`}
            />

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={15}
                    className={`mt-0.5 flex-shrink-0 ${
                      plan.highlighted ? 'text-gray-900' : 'text-green-500'
                    }`}
                  />
                  <span
                    className={
                      plan.highlighted ? 'text-gray-800' : 'text-gray-600'
                    }
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            {plan.ctaStyle === 'border' && (
              <Link to={`/checkout?plan=${plan.name.toLowerCase()}`} className="block w-full py-3 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-yellow-400 hover:text-gray-900 transition-colors text-center">
                {plan.cta}
              </Link>
            )}
            {plan.ctaStyle === 'dark' && (
            <Link to={`/checkout?plan=${plan.name.toLowerCase()}`} className="block w-full py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors text-center">
                {plan.cta}
              </Link>
            )}
            {plan.ctaStyle === 'dark-filled' && (
              <Link to={`/checkout?plan=${plan.name.toLowerCase()}`} className="block w-full py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors text-center">
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        All plans include a 14-day free trial with no credit card required
      </p>
    </div>
  </section>
);

const IntegrationsVisual: React.FC = () => (
  <section className="pb-12 md:pb-20 bg-white">
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <div
        className="rounded-3xl overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #f9f9f9 0%, #fffde7 100%)' }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-10">
          {/* Left: AI Bot visual */}
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-36 md:h-36 rounded-full shadow-xl"
            style={{ background: 'linear-gradient(135deg, #fdd100 0%, #e6a800 100%)' }}
          >
            <Bot size={44} className="text-gray-900 md:hidden" />
            <Bot size={64} className="text-gray-900 hidden md:block" />
          </div>

          {/* Right: text + integration icons */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-500 text-sm font-semibold mb-1">Works with:</p>
            <p className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">
              APIs, AI Models,
            </p>
            <p className="text-gray-600 font-medium mb-5">
              Google Workspace (Gmail, Google Calendar,<br />
              Google Drive, Google Sheet, Gmaps, Terminal)
            </p>

            {/* Integration icon grid */}
            <div className="flex flex-wrap gap-2">
              {integrations.map((item, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm`}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="border-t border-gray-100 py-4 md:py-5 px-4 md:px-10 text-center">
          <p className="text-gray-700 font-medium">
            Online Support to Scale Up Your Business and make it a{' '}
            <span className="font-extrabold text-gray-900">Betterworks</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);

const PricingFooter: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-100 py-6">
    <div className="max-w-6xl mx-auto px-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/elite-va" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: '#fdd100' }}
          >
            <Zap size={13} className="text-gray-900" />
          </div>
          <span className="font-bold text-gray-900">EliteVA</span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-gray-500 border-t border-gray-200 pt-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-700">PT Saki Aksata Maxima | Betterworks ID</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            Jl. Siliwangi Q No.1, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:hello@betterworks.id" className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
            <Mail size={14} className="text-gray-400 shrink-0" />
            hello@betterworks.id
          </a>
          <a href="https://wa.me/6285817426700" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-700 transition-colors">
            <Phone size={14} className="text-gray-400 shrink-0" />
            +62 858-1742-6700
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <PricingNavbar />
      <main>
        <PricingCards />
        <IntegrationsVisual />
      </main>
      <PricingFooter />
    </div>
  );
};

export default Pricing;
