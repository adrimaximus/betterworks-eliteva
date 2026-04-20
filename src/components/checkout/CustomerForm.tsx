import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CustomerFormProps {
  onSubmit: (data: { fullName: string; email: string; phone: string; company: string }) => void;
  isProcessing: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, isProcessing }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{8,13}$/.test(phone.replace(/^0/, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), company: company.trim() });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Data Pembayaran</h2>
        <p className="text-sm text-gray-500 mt-1">Lengkapi data Anda untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="Masukkan nama lengkap"
            disabled={isProcessing}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 ${
              errors.fullName
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="nama@email.com"
            disabled={isProcessing}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 ${
              errors.email
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
            } disabled:bg-gray-50 disabled:cursor-not-allowed`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nomor Telepon
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 py-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium select-none">
              +62
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                setPhone(val);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="812 3456 7890"
              disabled={isProcessing}
              className={`flex-1 rounded-r-xl border px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 ${
                errors.phone
                  ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
              } disabled:bg-gray-50 disabled:cursor-not-allowed`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Perusahaan{' '}
            <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Nama perusahaan Anda"
            disabled={isProcessing}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Memproses...
            </>
          ) : (
            'Bayar Sekarang'
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
