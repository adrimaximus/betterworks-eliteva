import React from 'react';
import { Check } from 'lucide-react';

interface PlanData {
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  features: string[];
}

interface OrderSummaryProps {
  plan: PlanData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Yellow accent bar */}
      <div className="h-1 bg-[#fdd100]" />

      <div className="p-6">
        {/* Plan header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{plan.tagline}</p>
        </div>

        {/* Price display */}
        <div className="mb-5">
          <span className="text-2xl font-bold text-gray-900">Rp {plan.price}</span>
          <span className="text-sm text-gray-500 ml-1">/bulan</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-5" />

        {/* Features list */}
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex-shrink-0">
                <Check className="w-4 h-4 text-green-500" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm text-gray-900">Rp {plan.price}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-base font-bold text-gray-900">Rp {plan.price}</span>
              <span className="text-xs text-gray-500 ml-1">per bulan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
