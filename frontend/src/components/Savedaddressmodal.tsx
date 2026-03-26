import { useState, useEffect, useRef } from "react";
import {
  MapPin, Plus, Edit2, Trash2, X, Star, Home, Briefcase, Tag,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AddressLabel = "Home" | "Work" | "Other";

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  postal: string;
  label: AddressLabel;
  isDefault: boolean;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  postal: string;
  label: AddressLabel;
}

const EMPTY_FORM: FormData = {
  name: "", phone: "", address: "",
  district: "", city: "", postal: "", label: "Home",
};

// ─── Label Icon ───────────────────────────────────────────────────────────────

const LabelIcon = ({ label }: { label: AddressLabel }) => {
  if (label === "Home")  return <Home      className="w-3 h-3" />;
  if (label === "Work")  return <Briefcase className="w-3 h-3" />;
  return                        <Tag       className="w-3 h-3" />;
};

const LABEL_STYLE: Record<AddressLabel, string> = {
  Home:  "bg-rose-50 text-rose-500",
  Work:  "bg-blue-50 text-blue-500",
  Other: "bg-gray-100 text-gray-500",
};

// ─── Input ────────────────────────────────────────────────────────────────────

const Input = ({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700
        placeholder-gray-300 bg-gray-50 outline-none transition-all
        focus:bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100
        hover:border-gray-300"
    />
  </div>
);

// ─── Address Form ─────────────────────────────────────────────────────────────

const AddressForm = ({
  initial,
  onSave,
  onCancel,
}: {
  initial?: FormData;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<FormData>(initial ?? EMPTY_FORM);
  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!form.name.trim() || !form.address.trim()) return;
    onSave(form);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Input label="Recipient Name *" value={form.name}     onChange={set("name")}     placeholder="e.g. Anna K." />
        <Input label="Phone Number"     value={form.phone}    onChange={set("phone")}    placeholder="e.g. 08x-xxx-xxxx" />
      </div>
      <Input label="Address *"  value={form.address}  onChange={set("address")}  placeholder="House no., Street, Building..." />
      <div className="grid grid-cols-3 gap-3">
        <Input label="District"    value={form.district} onChange={set("district")} placeholder="District" />
        <Input label="City"        value={form.city}     onChange={set("city")}     placeholder="City" />
        <Input label="Postal Code" value={form.postal}   onChange={set("postal")}   placeholder="10xxx" />
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600">Label</label>
        <div className="flex gap-2">
          {(["Home", "Work", "Other"] as AddressLabel[]).map((l) => (
            <button
              key={l}
              onClick={() => setForm((prev) => ({ ...prev, label: l }))}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                form.label === l
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-500 border-gray-200 hover:border-rose-200 hover:text-rose-400"
              }`}
            >
              <LabelIcon label={l} /> {l}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #f43f5e, #e11d48)",
            boxShadow: "0 3px 12px rgba(244,63,94,0.35)",
          }}
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

// ─── Address Card ─────────────────────────────────────────────────────────────

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) => (
  <div
    className={`group relative rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 ${
      address.isDefault
        ? "border-rose-200 bg-rose-50"
        : "border-gray-100 bg-white hover:border-rose-100 hover:shadow-sm"
    }`}
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-bold text-gray-800">{address.name}</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${LABEL_STYLE[address.label]}`}>
          <LabelIcon label={address.label} /> {address.label}
        </span>
        {address.isDefault && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
            <Star className="w-2.5 h-2.5 fill-current" /> Default
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    {/* Info */}
    <p className="text-xs text-gray-400 mb-0.5">{address.phone}</p>
    <p className="text-xs text-gray-600 leading-relaxed">
      {address.address}, {address.district}, {address.city} {address.postal}
    </p>

    {/* Set Default */}
    {!address.isDefault && (
      <button
        onClick={onSetDefault}
        className="mt-3 text-xs font-semibold text-rose-400 hover:text-rose-600 transition"
      >
        Set as Default →
      </button>
    )}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface SavedAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedAddressModal = ({ isOpen, onClose }: SavedAddressModalProps) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Name",
      phone: "081-234-5678",
      address: "123 Rose St, Siam Square",
      district: "Pathum Wan",
      city: "Bangkok",
      postal: "10330",
      label: "Home",
      isDefault: true,
    },
    {
      id: "2",
      name: "Name",
      phone: "081-234-5678",
      address: "456 Flower Ave, Floor 8",
      district: "Watthana",
      city: "Bangkok",
      postal: "10110",
      label: "Work",
      isDefault: false,
    },
  ]);

  type View = "list" | "add" | "edit";
  const [view, setView]           = useState<View>("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const backdropRef               = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset view when modal closes
  useEffect(() => {
    if (!isOpen) { setView("list"); setEditingId(null); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = (data: FormData) => {
    const newAddr: Address = {
      ...data,
      id: Date.now().toString(),
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setView("list");
  };

  const handleEdit = (data: FormData) => {
    setAddresses((prev) =>
      prev.map((a) => a.id === editingId ? { ...a, ...data } : a)
    );
    setEditingId(null);
    setView("list");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      // ถ้าลบ default → ให้ตัวแรกเป็น default แทน
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const editingAddress = addresses.find((a) => a.id === editingId);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm"
        onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      >
        {/* Modal */}
        <div
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-5 border-b border-rose-100"
            style={{ background: "linear-gradient(135deg, #fff5f6, #fff0f2)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-rose-500" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {view === "list" ? "Saved Addresses" : view === "add" ? "Add New Address" : "Edit Address"}
                </h2>
                <p className="text-xs text-gray-400">
                  {view === "list" ? "Manage your delivery locations" : "Fill in the details below"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 80px)" }}>

            {/* ── List View ── */}
            {view === "list" && (
              <div className="flex flex-col gap-3">
                {addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                    <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-rose-200" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500">No addresses yet.</p>
                    <p className="text-xs text-gray-400">Add your first one!</p>
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      address={addr}
                      onEdit={() => { setEditingId(addr.id); setView("edit"); }}
                      onDelete={() => handleDelete(addr.id)}
                      onSetDefault={() => handleSetDefault(addr.id)}
                    />
                  ))
                )}

                {/* Add button */}
                <button
                  onClick={() => setView("add")}
                  className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-2xl border-2 border-dashed border-rose-200 text-sm font-semibold text-rose-400 hover:bg-rose-50 hover:border-rose-300 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add New Address
                </button>
              </div>
            )}

            {/* ── Add View ── */}
            {view === "add" && (
              <AddressForm
                onSave={handleAdd}
                onCancel={() => setView("list")}
              />
            )}

            {/* ── Edit View ── */}
            {view === "edit" && editingAddress && (
              <AddressForm
                initial={editingAddress}
                onSave={handleEdit}
                onCancel={() => { setView("list"); setEditingId(null); }}
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default SavedAddressModal;