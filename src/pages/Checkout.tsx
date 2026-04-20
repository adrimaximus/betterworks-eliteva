import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

import CheckoutNavbar from '../components/checkout/CheckoutNavbar';
import CheckoutFooter from '../components/checkout/CheckoutFooter';
import OrderSummary from '../components/checkout/OrderSummary';
import CustomerForm from '../components/checkout/CustomerForm';
import PaymentMethods from '../components/checkout/PaymentMethods';
import SecurityBadges from '../components/checkout/SecurityBadges';

// ─── Plan Data (matches Pricing.tsx) ────────────────────────────────────────

interface PlanData {
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  features: string[];
}

const PLANS: Record<string, PlanData> = {
  starter: {
    name: 'Starter',
    price: '449K',
    priceValue: 449000,
    tagline: 'Perfect for small businesses just getting started',
    features: [
      '500 AI actions per month',
      'Email automation',
      'Basic CRM features',
      'Data entry assistance',
      'Email support',
      '1 user seat',
    ],
  },
  professional: {
    name: 'Professional',
    price: '1.2Mio',
    priceValue: 1200000,
    tagline: 'Best for growing businesses with advanced needs',
    features: [
      '2,500 AI actions per month',
      'All Starter features',
      'WhatsApp automation',
      'Smart reminders',
      'Priority support',
      '1 user seat',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: '3.1Mio',
    priceValue: 3100000,
    tagline: 'Custom solutions for large organizations',
    features: [
      'Unlimited AI actions',
      'All Professional features',
      '24/7 customer service bot',
      'Web scraping tools',
      'Custom integrations',
      'Dedicated account manager',
      '3 user seats',
    ],
  },
};

// ─── Step Indicator ─────────────────────────────────────────────────────────

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = ['Pembayaran', 'Konfirmasi', 'Selesai'];

  return (
    <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i <= currentStep
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:inline ${
                i <= currentStep ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 md:w-12 h-0.5 rounded-full transition-colors ${
                i < currentStep ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── Success Screen ─────────────────────────────────────────────────────────

const SuccessScreen: React.FC<{ plan: PlanData; onBack: () => void }> = ({
  plan,
  onBack,
}) => (
  <div className="max-w-lg mx-auto text-center py-12 md:py-20 px-4">
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
      style={{ background: '#fdd100' }}
    >
      <Zap size={36} className="text-gray-900" />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
      Pembayaran Berhasil! 🎉
    </h2>
    <p className="text-gray-500 mb-2">
      Terima kasih! Paket <strong>{plan.name}</strong> Anda sudah aktif.
    </p>
    <p className="text-gray-400 text-sm mb-8">
      Detail invoice dan instruksi selanjutnya telah dikirim ke email Anda.
    </p>

    <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">Paket</span>
        <span className="text-sm font-bold text-gray-900">{plan.name}</span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500">Harga</span>
        <span className="text-sm font-bold text-gray-900">Rp {plan.price}/bulan</span>
      </div>
      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Status</span>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
            AKTIF
          </span>
        </div>
      </div>
    </div>

    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors"
    >
      Kembali ke Beranda
    </button>
  </div>
);

// ─── Checkout Page ──────────────────────────────────────────────────────────

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planKey = searchParams.get('plan') || 'professional';
  const plan = PLANS[planKey] || PLANS.professional;

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    company: string;
  } | null>(null);

  // Auto-scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleFormSubmit = (data: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
  }) => {
    setCustomerData(data);
    setStep(1);
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) return;

    setIsProcessing(true);

    // Simulate Xendit API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsProcessing(false);
    setStep(2);
  };

  const handleBackToHome = () => {
    navigate('/elite-va');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CheckoutNavbar />

      <main className="pt-20 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Step Indicator */}
          <StepIndicator currentStep={step} />

          {/* ─── Step 0: Form + Payment Method ─── */}
          {step === 0 && (
            <>
              {/* Back to pricing */}
              <button
                onClick={() => navigate('/pricing')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft size={15} />
                Kembali ke Pricing
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                {/* Left: Form + Payment (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                  <CustomerForm onSubmit={handleFormSubmit} isProcessing={false} />
                </div>

                {/* Right: Order Summary (2 cols) */}
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-24">
                    <OrderSummary plan={plan} />
                    <SecurityBadges />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─── Step 1: Confirm Payment ─── */}
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              {/* Back button */}
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft size={15} />
                Ubah Data
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                {/* Left: Payment Method Selection */}
                <div className="lg:col-span-3 space-y-6">
                  <PaymentMethods
                    selected={paymentMethod}
                    onSelect={setPaymentMethod}
                  />

                  <button
                    onClick={handleConfirmPayment}
                    disabled={!paymentMethod || isProcessing}
                    className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Memproses Pembayaran...
                      </>
                    ) : (
                      `Konfirmasi & Bayar Rp ${plan.price}`
                    )}
                  </button>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-24">
                    <OrderSummary plan={plan} />

                    {/* Customer info summary */}
                    {customerData && (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mt-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">
                          Data Pembayar
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <p className="text-gray-700">{customerData.fullName}</p>
                          <p className="text-gray-500">{customerData.email}</p>
                          <p className="text-gray-500">+62 {customerData.phone}</p>
                          {customerData.company && (
                            <p className="text-gray-500">{customerData.company}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <SecurityBadges />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 2: Success ─── */}
          {step === 2 && <SuccessScreen plan={plan} onBack={handleBackToHome} />}
        </div>
      </main>

      <CheckoutFooter />
    </div>
  );
};

export default Checkout;
