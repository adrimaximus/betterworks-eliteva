import React from 'react';
import { Zap, Shield } from 'lucide-react';

const CheckoutFooter: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: EliteVA Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#fdd100' }}
          >
            <Zap className="w-3.5 h-3.5 text-gray-900" fill="currentColor" />
          </div>
          <span className="font-bold text-gray-900">EliteVA</span>
        </div>

        {/* Right: Payment processor */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>Pembayaran diproses oleh</span>
            <span className="font-bold text-gray-700 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              Xendit
            </span>
          </div>
          <p className="text-xs text-gray-400">© 2026 EliteVA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default CheckoutFooter;
