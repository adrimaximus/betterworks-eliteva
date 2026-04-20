import React from 'react';
import { Zap, Lock } from 'lucide-react';

const CheckoutNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo — visual only, no link */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#fdd100' }}
          >
            <Zap className="w-4 h-4 text-gray-900" />
          </div>
          <span className="text-lg font-bold text-gray-900">EliteVA</span>
        </div>

        {/* Secure checkout label */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <Lock className="w-3.5 h-3.5" />
          <span>Checkout</span>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutNavbar;
