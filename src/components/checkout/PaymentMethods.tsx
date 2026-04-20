import React from 'react';
import { Banknote, Wallet, Store } from 'lucide-react';

interface PaymentMethodsProps {
  selected: string;
  onSelect: (method: string) => void;
}

const virtualAccounts = [
  { id: 'bca-va', name: 'BCA', subtitle: 'Virtual Account', color: 'bg-blue-600', initials: 'BCA' },
  { id: 'bni-va', name: 'BNI', subtitle: 'Virtual Account', color: 'bg-orange-500', initials: 'BNI' },
  { id: 'bri-va', name: 'BRI', subtitle: 'Virtual Account', color: 'bg-blue-500', initials: 'BRI' },
  { id: 'mandiri-va', name: 'Mandiri', subtitle: 'Virtual Account', color: 'bg-yellow-500 text-yellow-900', initials: 'MDR' },
];

const ewallets = [
  { id: 'ovo', name: 'OVO', color: 'bg-purple-600', initials: 'OVO' },
  { id: 'dana', name: 'DANA', color: 'bg-blue-400', initials: 'DA' },
  { id: 'linkaja', name: 'LinkAja', color: 'bg-red-500', initials: 'LA' },
  { id: 'shopeepay', name: 'ShopeePay', color: 'bg-orange-500', initials: 'SP' },
];

const retailOutlets = [
  { id: 'alfamart', name: 'Alfamart', color: 'bg-red-600', initials: 'AF' },
  { id: 'indomaret', name: 'Indomaret', color: 'bg-blue-700', initials: 'ID' },
];

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selected, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-lg font-bold text-gray-900">Metode Pembayaran</h2>

      {/* Virtual Account */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Banknote className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Virtual Account
          </span>
        </div>
        <div className="space-y-2">
          {virtualAccounts.map((va) => (
            <div
              key={va.id}
              onClick={() => onSelect(va.id)}
              className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                selected === va.id
                  ? 'border-2 border-[#fdd100] bg-yellow-50'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-10 h-10 ${va.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {va.initials}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm">{va.name}</p>
                <p className="text-xs text-gray-500">{va.subtitle}</p>
              </div>
              <div className="ml-auto shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === va.id
                      ? 'border-[#fdd100] bg-[#fdd100]'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === va.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E-Wallet */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            E-Wallet
          </span>
        </div>
        <div className="space-y-2">
          {ewallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => onSelect(wallet.id)}
              className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                selected === wallet.id
                  ? 'border-2 border-[#fdd100] bg-yellow-50'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {wallet.initials}
              </div>
              <p className="font-medium text-gray-900 text-sm">{wallet.name}</p>
              <div className="ml-auto shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === wallet.id
                      ? 'border-[#fdd100] bg-[#fdd100]'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === wallet.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retail Outlet */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Store className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Retail Outlet
          </span>
        </div>
        <div className="space-y-2">
          {retailOutlets.map((outlet) => (
            <div
              key={outlet.id}
              onClick={() => onSelect(outlet.id)}
              className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                selected === outlet.id
                  ? 'border-2 border-[#fdd100] bg-yellow-50'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-10 h-10 ${outlet.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {outlet.initials}
              </div>
              <p className="font-medium text-gray-900 text-sm">{outlet.name}</p>
              <div className="ml-auto shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === outlet.id
                      ? 'border-[#fdd100] bg-[#fdd100]'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === outlet.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
