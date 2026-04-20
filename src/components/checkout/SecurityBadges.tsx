import React from "react";
import { Lock, Shield, ShieldCheck, BadgeCheck } from "lucide-react";

const SecurityBadges: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center gap-4 md:gap-6 py-4">
        <div className="flex items-center gap-1 text-gray-400">
          <Lock size={14} />
          <span className="text-xs">SSL Secured</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Shield size={14} />
          <span className="text-xs">PCI Compliant</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <ShieldCheck size={14} />
          <span className="text-xs">100% Safe</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <BadgeCheck size={14} />
          <span className="text-xs">Verified</span>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Transaksi Anda dilindungi enkripsi SSL 256-bit
      </p>
    </div>
  );
};

export default SecurityBadges;
