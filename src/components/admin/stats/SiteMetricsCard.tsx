import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock, CalendarIcon, CalendarDaysIcon } from 'lucide-react';
import { UserRole } from '@/types/admin';

interface SiteMetricsCardProps {
  totalViews: number;
  todayViews: number;
  weeklyViews: number;
  monthlyViews: number;
  showWeekly: boolean;
  showMonthly: boolean;
}

const SiteMetricsCard: React.FC<SiteMetricsCardProps> = ({
  totalViews,
  todayViews,
  weeklyViews,
  monthlyViews,
  showWeekly,
  showMonthly
}) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium text-white flex items-center">
          <Eye className="mr-2 h-4 w-4 text-blue-400" />
          Statistik Pengunjung
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400 text-xs flex items-center">
              <Eye className="mr-1 h-3 w-3" />
              Total Kunjungan
            </p>
            <p className="text-2xl font-bold text-white">{totalViews.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-slate-400 text-xs flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              Hari Ini
            </p>
            <p className="text-2xl font-bold text-white">{todayViews.toLocaleString('id-ID')}</p>
          </div>
          {showWeekly && (
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-slate-400 text-xs flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                Minggu Ini
              </p>
              <p className="text-2xl font-bold text-white">{weeklyViews.toLocaleString('id-ID')}</p>
            </div>
          )}
          {showMonthly && (
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-slate-400 text-xs flex items-center">
                <CalendarDaysIcon className="mr-1 h-3 w-3" />
                Bulan Ini
              </p>
              <p className="text-2xl font-bold text-white">{monthlyViews.toLocaleString('id-ID')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteMetricsCard;
