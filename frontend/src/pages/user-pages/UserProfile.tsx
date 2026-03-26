import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth-store";
import {
  Store,
  LayoutDashboard,
  Users,
  ShieldCheck,
  MapPin,
  CreditCard,
} from "lucide-react";
import {
  Card,
  SectionTitle,
  ActionButton,
  OrdersActivityCard,
} from "../../components/ProfileCard";
import SavedAddressModal from "../../components/SavedAddressModal";
import PaymentMethodModal from "../../components/PaymentMethodModal";

// ─── Role badge config ────────────────────────────────────────────────────────

const ROLE_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  USER: { bg: "bg-rose-50", text: "text-rose-500", label: "Customer" },
  SELLER: { bg: "bg-pink-50", text: "text-pink-500", label: "Seller" },
  ADMIN: { bg: "bg-purple-50", text: "text-purple-500", label: "Admin" },
};

// ─── Profile Header ───────────────────────────────────────────────────────────

const ProfileHeader = ({
  username,
  role,
}: {
  username: string;
  role: string;
}) => {
  const style = ROLE_STYLE[role] ?? ROLE_STYLE.USER;
  const initial = username?.charAt(0).toUpperCase() || "?";

  return (
    <Card className="bg-rose-50 border-rose-100">
      <div className="flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-md"
          style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
        >
          {initial}
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {username}
          </h2>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
            >
              {style.label}
            </span>
            <span className="text-xs text-gray-400">
              Member since 2025
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ─── User Section ─────────────────────────────────────────────────────────────

const UserSection = ({
  navigate,
  onOpenAddress,
  onOpenPayment,
}: {
  navigate: ReturnType<typeof useNavigate>;
  onOpenAddress: () => void;
  onOpenPayment: () => void;
}) => (
  <>
    <OrdersActivityCard navigate={navigate} />

    <Card>
      <SectionTitle label="Account" />
      <div className="flex flex-col gap-2">
        <ActionButton
          icon={<MapPin className="w-4 h-4" />}
          label="Saved Addresses"
          sub="Manage delivery addresses"
          onClick={onOpenAddress} 
        />

       <ActionButton
        icon={<CreditCard className="w-4 h-4" />}
        label="Payment Methods"
        sub="Cards and payment options"
        onClick={onOpenPayment}
      />
      </div>
    </Card>
  </>
);

// ─── Seller Section ───────────────────────────────────────────────────────────

const SellerSection = ({
  navigate,
  onOpenAddress,
  onOpenPayment,
}: {
  navigate: ReturnType<typeof useNavigate>;
  onOpenAddress: () => void;
  onOpenPayment: () => void;
}) => (
  <>
    <OrdersActivityCard navigate={navigate} />

    <Card>
      <SectionTitle label="Account" />
      <div className="flex flex-col gap-2">
        <ActionButton
          icon={<MapPin className="w-4 h-4" />}
          label="Saved Addresses"
          sub="Manage delivery addresses"
          onClick={onOpenAddress} 
        />
        <ActionButton
          icon={<CreditCard className="w-4 h-4" />}
          label="Payment Methods"
          sub="Cards and payment options"
          onClick={onOpenPayment}
        />
      </div>
    </Card>

    <Card>
      <SectionTitle label="My Store" />
      <ActionButton
        icon={<Store className="w-4 h-4" />}
        label="Shop Management"
        sub="Overview of your shop"
        onClick={() => navigate("/shop")}
      />
    </Card>
  </>
);

// ─── Admin Section ────────────────────────────────────────────────────────────

const AdminSection = ({
  navigate,
}: {
  navigate: ReturnType<typeof useNavigate>;
}) => (
  <>
    <Card className="border-purple-100 bg-purple-50">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-400" />
        <div>
          <p className="text-sm font-bold text-purple-700">
            Admin Access
          </p>
          <p className="text-xs text-purple-400">
            Full platform control enabled
          </p>
        </div>
      </div>
    </Card>

    {/* <Card>
      <SectionTitle label="Administration" />
      <div className="flex flex-col gap-2">
        <ActionButton
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Admin Dashboard"
          sub="Platform overview and stats"
          onClick={() => navigate("/admin")}
        />
        <ActionButton
          icon={<Users className="w-4 h-4" />}
          label="Manage Users"
          sub="View and control user accounts"
          onClick={() => navigate("/admin/users")}
        />
        <ActionButton
          icon={<Store className="w-4 h-4" />}
          label="Manage Shops"
          sub="Approve and monitor stores"
          onClick={() => navigate("/admin/shops")}
        />
      </div>
    </Card> */}
     <Card>
    <SectionTitle label="Administration" />

    <ActionButton
      icon={<ShieldCheck className="w-4 h-4" />}
      label="Admin Panel"
      sub="Manage users, shops and platform"
      onClick={() => navigate("/admin")}
    />
  </Card>
  </>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user, role } = useAuthStore();
  const [openPayment, setOpenPayment] = useState(false);

  // เปิด/ปิด modal
  const [addressOpen, setAddressOpen] = useState(false);

  return (
    <div className="min-h-screen bg-rose-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto flex flex-col gap-4">
        <ProfileHeader username={user ?? "User"} role={role ?? "USER"} />

        {role === "USER" && (
          <UserSection
            navigate={navigate}
            onOpenAddress={() => setAddressOpen(true)} 
            onOpenPayment={() => setOpenPayment(true)}
          />
        )}

        {/* {role === "SELLER" && <SellerSection navigate={navigate} />} */}
        {role === "SELLER" && (
          <SellerSection 
            navigate={navigate} 
            onOpenAddress={() => setAddressOpen(true)} 
            onOpenPayment={() => setOpenPayment(true)}
          />
        )}
        
        {role === "ADMIN" && <AdminSection navigate={navigate} />}

        <SavedAddressModal
          isOpen={addressOpen}
          onClose={() => setAddressOpen(false)}
        />
        <PaymentMethodModal
          isOpen={openPayment}
          onClose={() => setOpenPayment(false)}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;