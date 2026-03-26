import React from 'react'
import type { LucideProps } from 'lucide-react'
interface StatCardProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  label: string;
  value: string;
  change?: string;
  color: string;
}
// const StatCard = ({ icon: Icon, label, value, change, color }:StatCardProps) => (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-gray-600 text-sm">{label}</p>
//           <p className="text-2xl font-bold mt-1">{value}</p>
//           {change && (
//             <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
//               {change}
//             </p>
//           )}
//         </div>
//         <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
//           <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
//         </div>
//       </div>
//     </div>
//   );
const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);
export default StatCard
