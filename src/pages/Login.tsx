import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AtSign, Zap, Sparkles, Check, ArrowRight, Loader2, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabase';
import {
  SERVICE_CATALOG, TOOL_CATALOG, BUSINESS_TYPES, PAIN_EXAMPLES,
  buildRecommendation, type Recommendation,
} from '../lib/elitevaRecommendation';
import { UserRole } from '@/types/admin';

interface LoginPageProps {
  onLogin: (email: string, role: UserRole) => void;
}

// ─── Login form ───────────────────────────────────────────────────────────────

const LoginForm: React.FC<{ onLogin: (email: string, role: UserRole) => void }> = ({ onLogin }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast({ title: 'Login failed', description: 'Email and password are required.', variant: 'destructive' });
      return;
    }
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const user = teamMembers.find((m: any) => m.email === email);
    if (!user) {
      toast({ title: 'Login failed', description: 'Email not found.', variant: 'destructive' });
      return;
    }
    if (user.password !== password) {
      toast({ title: 'Login failed', description: 'Invalid password.', variant: 'destructive' });
      return;
    }
    localStorage.setItem('adminPassword', password);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userEmail', email);
    onLogin(email, user.role);
    toast({ title: 'Login successful', description: `Welcome back, ${email}` });
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <AtSign className="absolute left-3 h-5 w-5 text-slate-400" />
        <Input
          type="email"
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-yellow-400/50 text-white placeholder-slate-500"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-yellow-400/50 text-white placeholder-slate-500 pr-12"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
        />
        <Button
          type="button" variant="ghost" size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent text-slate-400 hover:text-white"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
};

// ─── Sign Up form (embedded, scrollable) ─────────────────────────────────────

const SignupForm: React.FC<{ onSuccess: (name: string) => void }> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '', businessName: '', email: '', phone: '',
    businessType: '', planInterest: '', businessPains: '',
  });
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [showRec, setShowRec] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const recRef = useRef<HTMLDivElement>(null);

  const canSubmit =
    form.name.trim() !== '' && form.email.trim() !== '' &&
    form.businessType !== '' && form.planInterest !== '' &&
    form.businessPains.trim().length > 5;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (['businessType','planInterest','businessPains'].includes(e.target.name)) {
      setShowRec(false); setRecommendation(null);
    }
  };

  const appendPain = (pain: string) => {
    const alreadySelected = selectedPains.includes(pain);
    if (alreadySelected) {
      setSelectedPains((prev) => prev.filter((p) => p !== pain));
      setForm((prev) => ({
        ...prev,
        businessPains: prev.businessPains.split('\n').filter((l) => l.trim() !== pain.trim()).join('\n').trim(),
      }));
    } else {
      setSelectedPains((prev) => [...prev, pain]);
      setForm((prev) => ({
        ...prev,
        businessPains: prev.businessPains ? `${prev.businessPains.trimEnd()}\n${pain}` : pain,
      }));
    }
    setShowRec(false); setRecommendation(null);
  };

  const handleGenerate = () => {
    if (!canGenerate || isThinking) return;
    setIsThinking(true); setThinkingStep(0); setShowRec(false); setRecommendation(null);
    const t1 = setTimeout(() => setThinkingStep(1), 800);
    const t2 = setTimeout(() => setThinkingStep(2), 1700);
    const t3 = setTimeout(() => setThinkingStep(3), 2600);
    setTimeout(() => {
      const rec = buildRecommendation({
        businessType: form.businessType, businessName: form.businessName,
        planInterest: form.planInterest, businessPains: form.businessPains,
      });
      setRecommendation(rec); setIsThinking(false); setShowRec(true);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    }, 3400);
  };

  useEffect(() => {
    if (showRec && recRef.current) {
      setTimeout(() => recRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  }, [showRec]);

  const handleSubmit = async (withRec = true) => {
    if (!canSubmit) return;
    setIsSubmitting(true); setSubmitError('');
    const { error } = await supabase.from('eliteva_signups').insert({
      name: form.name.trim(), business_name: form.businessName.trim() || null,
      email: form.email.trim(), phone: form.phone.trim() || null,
      business_type: form.businessType, plan_interest: form.planInterest,
      business_pains: form.businessPains.trim(),
      ai_recommendation: withRec ? recommendation : null,
      status: 'new',
    });
    setIsSubmitting(false);
    if (error) { setSubmitError('Something went wrong. Please try again.'); }
    else { onSuccess(form.name.split(' ')[0]); }
  };

  const inputCls = 'w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400/60 transition-colors';
  const labelCls = 'block text-xs font-semibold text-slate-400 mb-1';

  return (
    <div className="space-y-5">
      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Adri Maximus" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Business Name <span className="text-slate-600 font-normal">(optional)</span></label>
          <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="e.g. Betterworks Studio" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Email <span className="text-red-400">*</span></label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>WhatsApp / Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+62 812 3456 7890" className={inputCls} />
        </div>
      </div>

      {/* Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-1">
          <label className={labelCls}>Business Type <span className="text-red-400">*</span></label>
          <select name="businessType" value={form.businessType} onChange={handleChange}
            className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="">Select category</option>
            {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Plan Interest <span className="text-red-400">*</span></label>
          <select name="planInterest" value={form.planInterest} onChange={handleChange}
            className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="">Select plan</option>
            <option value="Starter">Starter — $29/mo</option>
            <option value="Professional">Professional — $79/mo</option>
            <option value="Enterprise">Enterprise — $199/mo</option>
          </select>
        </div>
      </div>

      {/* Pains */}
      <div>
        <label className={`${labelCls} mb-0.5`}>
          Your Work Challenges <span className="text-red-400">*</span>
        </label>
        <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
          Describe recurring friction, missed steps, or manual bottlenecks in your workflow.
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {PAIN_EXAMPLES.map((p) => {
            const sel = selectedPains.includes(p);
            return (
              <button key={p} type="button" onClick={() => appendPain(p)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  sel
                    ? 'border-yellow-400/80 bg-yellow-400/20 text-yellow-300 font-semibold'
                    : 'border-slate-600 text-slate-400 hover:border-yellow-400/60 hover:text-yellow-300'
                }`}>
                {sel ? '✓' : '+'} {p.length > 44 ? p.slice(0, 44) + '…' : p}
              </button>
            );
          })}
        </div>
        <textarea name="businessPains" value={form.businessPains} onChange={handleChange} rows={4}
          placeholder="e.g. Follow-up sering terlewat, terlalu banyak pesan masuk WhatsApp, data tidak terorganisir..."
          className={`${inputCls} resize-none leading-relaxed`} />
      </div>

      {/* Buttons */}
      {canSubmit && !isThinking && !showRec && (
        <div className="space-y-2">
          <button onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ background: '#fdd100' }}>
            <Sparkles size={16} /> Generate My AI Setup
          </button>
          <button onClick={() => handleSubmit(false)} disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm font-semibold hover:border-yellow-400/60 transition-colors disabled:opacity-50">
            {isSubmitting ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <>Submit Directly <ArrowRight size={13} /></>}
          </button>
          {submitError && <p className="text-xs text-red-400 text-center">{submitError}</p>}
        </div>
      )}

      {/* Re-generate */}
      {canSubmit && !isThinking && showRec && (
        <button onClick={handleGenerate} className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors w-full text-center">
          Regenerate recommendation
        </button>
      )}

      {/* Thinking */}
      {isThinking && (
        <div className="rounded-xl border border-yellow-400/20 bg-slate-800/60 p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-yellow-400/20 flex items-center justify-center">
              <Bot size={16} className="text-yellow-400" />
            </div>
            <p className="text-sm font-semibold text-white">Building your configuration...</p>
          </div>
          <div className="space-y-3">
            {[
              { step: 1, label: 'Analyzing your business profile...' },
              { step: 2, label: 'Matching challenges to service capabilities...' },
              { step: 3, label: 'Building your personalized agent setup...' },
            ].map(({ step, label }) => (
              <div key={step} className={`flex items-center gap-2.5 transition-all duration-500 ${thinkingStep >= step ? 'opacity-100' : 'opacity-0 translate-y-1'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${thinkingStep > step ? 'bg-green-400/20' : 'bg-yellow-400/20'}`}>
                  {thinkingStep > step
                    ? <Check size={10} className="text-green-400" />
                    : <Loader2 size={10} className="text-yellow-400 animate-spin" />}
                </div>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {showRec && recommendation && (
        <div ref={recRef} className="rounded-xl overflow-hidden border border-yellow-400/30">
          {/* Yellow header */}
          <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, #fdd100 0%, #f0c000 100%)' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-700">AI Recommendation</p>
                <p className="text-sm font-extrabold text-gray-900">Your EliteVA Configuration</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recommendation.tools.map((tool) => {
                const t = TOOL_CATALOG[tool];
                if (!t) return <span key={tool} className="px-2 py-1 rounded-full bg-white/70 text-[10px] font-semibold text-gray-800">{tool}</span>;
                const Icon = t.icon;
                return (
                  <span key={tool} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 text-[10px] font-semibold text-gray-800">
                    <span className={`${t.bg} ${t.color} rounded-full p-0.5`}><Icon size={9} /></span>
                    {t.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* White body */}
          <div className="bg-white px-5 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">Primary Focus</p>
                <div className="space-y-1.5">
                  {recommendation.primaryFocus.map((id) => {
                    const s = SERVICE_CATALOG[id]; if (!s) return null;
                    const Icon = s.icon;
                    return (
                      <div key={id} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 bg-gray-50">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg} ${s.color}`}><Icon size={12} /></div>
                        <p className="text-[11px] font-semibold text-gray-900">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">Support</p>
                <div className="space-y-1.5">
                  {recommendation.supportFocus.map((id) => {
                    const s = SERVICE_CATALOG[id]; if (!s) return null;
                    const Icon = s.icon;
                    return (
                      <div key={id} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 bg-gray-50">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg} ${s.color}`}><Icon size={12} /></div>
                        <p className="text-[11px] font-semibold text-gray-900">{s.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">Expected Outcomes</p>
              <div className="space-y-1.5">
                {recommendation.expectedOutputs.map((o) => (
                  <div key={o} className="flex items-start gap-2 text-[11px] text-gray-700">
                    <Check size={11} className="mt-0.5 flex-shrink-0 text-gray-900" />{o}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-yellow-100 bg-yellow-50/60 p-3">
              <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">Summary</p>
              <p className="text-[11px] text-gray-700 leading-relaxed italic">{recommendation.summary}</p>
            </div>

            {submitError && <p className="text-xs text-red-500 text-center">{submitError}</p>}
            <button onClick={handleSubmit} disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ background: '#fdd100' }}>
              {isSubmitting
                ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                : <>Start My Free Trial <ArrowRight size={14} /></>}
            </button>
            <p className="text-center text-[10px] text-gray-400">No credit card required. Setup in 5 minutes.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Login page ───────────────────────────────────────────────────────────────

const Login: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [signupDone, setSignupDone] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!signupDone) return;
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    const timeout = setTimeout(() => navigate('/elite-va'), 5000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [signupDone, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/elite-va" className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#fdd100' }}>
              <Zap size={17} className="text-gray-900" />
            </div>
            <span className="font-extrabold text-white text-xl">EliteVA</span>
          </Link>
          <p className="text-slate-500 text-xs">by Betterworks</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-yellow-400/20 shadow-2xl overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-slate-700">
            {(['login','signup'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
                  tab === t
                    ? 'text-yellow-400 border-b-2 border-yellow-400 bg-slate-800/60'
                    : 'text-slate-500 hover:text-slate-300'
                }`}>
                {t === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className={`px-6 pb-6 ${tab === 'signup' ? 'pt-5 max-h-[72vh] overflow-y-auto' : 'pt-6'}`}>

            {/* Login tab */}
            {tab === 'login' && (
              <>
                <h2 className="text-xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-1">
                  Welcome back
                </h2>
                <p className="text-slate-400 text-xs text-center mb-5">Enter your credentials to access the dashboard</p>
                <LoginForm onLogin={onLogin} />
              </>
            )}

            {/* Sign Up tab */}
            {tab === 'signup' && !signupDone && (
              <>
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-white mb-1">Design Your AI Agent</h2>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Tell us about your business — we'll generate a personalized EliteVA setup with tools, focus areas, and outcomes tailored to you.
                  </p>
                </div>
                <SignupForm onSuccess={(name) => setSignupDone(name)} />
              </>
            )}

            {/* Sign Up success */}
            {tab === 'signup' && signupDone && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(253,209,0,0.4)]"
                  style={{ background: '#fdd100' }}>
                  <Check size={28} className="text-gray-900" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">You're in, {signupDone}!</h3>
                <p className="text-slate-400 text-sm mb-2 leading-relaxed">
                  Your profile has been saved. We'll be in touch within <strong className="text-white">24 hours</strong> to set up your AI agent.
                </p>
                <p className="text-slate-500 text-xs mb-6">A confirmation email will be sent to your inbox.</p>
                <div className="space-y-3">
                  <p className="text-slate-500 text-xs">Redirecting to home in {countdown}s...</p>
                  <button onClick={() => navigate('/elite-va')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-gray-900 font-bold text-sm hover:opacity-90 transition-opacity"
                    style={{ background: '#fdd100' }}>
                    Go to Home Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          <Link to="/elite-va" className="hover:text-slate-400 transition-colors">← Back to EliteVA</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
