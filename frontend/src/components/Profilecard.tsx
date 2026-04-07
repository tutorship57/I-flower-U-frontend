import { ChevronRight } from "lucide-react";

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

// ─── Section Title ────────────────────────────────────────────────────────────

export const SectionTitle = ({ label }: { label: string }) => (
  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
    {label}
  </p>
);

// ─── Action Button ────────────────────────────────────────────────────────────

export const ActionButton = ({
  icon,
  label,
  sub,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick: () => void;
  badge?: string | number;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-gray-100 hover:bg-rose-50 hover:border-rose-100 transition-all duration-150 group"
  >
    <div className="flex items-center gap-3">
      <span className="text-gray-400 group-hover:text-rose-400 transition-colors">
        {icon}
      </span>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-700 group-hover:text-rose-600 transition-colors">
          {label}
        </p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {badge !== undefined && (
        <span className="text-xs font-bold bg-rose-50 text-rose-400 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-rose-300 transition-colors" />
    </div>
  </button>
);

// ─── Orders & Activity Card (ใช้ซ้ำใน User + Seller) ─────────────────────────

import { ShoppingBag, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export const OrdersActivityCard = ({
  navigate,
}: {
  navigate: ReturnType<typeof useNavigate>;
}) => (
  <Card>
    <SectionTitle label="Orders & Activity" />
    <div className="flex flex-col gap-2">
      <ActionButton
        icon={<ShoppingBag className="w-4 h-4" />}
        label="My Orders"
        sub="Track and manage your orders"
        onClick={() => navigate("/history")}
      />
      <ActionButton
        icon={<Heart className="w-4 h-4" />}
        label="Wishlist"
        sub="Items you've saved"
        onClick={() => navigate("/wishlist")}
      />
    </div>
  </Card>
);

// ─── Notifications Card (ใช้ซ้ำใน User + Seller + Admin) ─────────────────────

import { Bell } from "lucide-react";

export const NotificationsCard = ({
  navigate,
}: {
  navigate: ReturnType<typeof useNavigate>;
}) => (
  <Card>
    <SectionTitle label="Account" />
    <div className="flex flex-col gap-2">
      <ActionButton
        icon={<Bell className="w-4 h-4" />}
        label="Notifications"
        sub="Manage your alerts"
        onClick={() => navigate("/notifications")}
      />
    </div>
  </Card>
);