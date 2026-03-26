import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Star, X, CreditCard } from "lucide-react";

// ─── Types ─────────────────────────

type PaymentMethod = {
  id: string;
  label: string;
  last4: string;
  isDefault: boolean;
};

// ─── Modal ─────────────────────────

const PaymentMethodModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [adding, setAdding] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [label, setLabel] = useState("");
  const [last4, setLast4] = useState("");

  // ─── Load ─────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("payments");
    if (saved) setMethods(JSON.parse(saved));
  }, []);

  // ─── Save ─────────────────────
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(methods));
  }, [methods]);

  // ESC close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  // ─── Actions ─────────────────────

  const handleAdd = () => {
    if (!label || !last4) return;

    const newItem: PaymentMethod = {
      id: Date.now().toString(),
      label,
      last4,
      isDefault: methods.length === 0,
    };

    setMethods((prev) => [...prev, newItem]);
    setLabel("");
    setLast4("");
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    setMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== id);

      if (filtered.length > 0 && !filtered.some((m) => m.isDefault)) {
        filtered[0].isDefault = true;
      }

      return filtered;
    });
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  // ─── UI ─────────────────────────

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">

        {/* 💖 HEADER (เหมือน Address) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose-100 bg-gradient-to-br from-rose-50 to-rose-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-200 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">
                Payment Methods
              </h2>
              <p className="text-xs text-gray-400">
                Manage your payment options
              </p>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-rose-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col gap-3">

          {!adding && (
            <>
              {methods.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-2xl border p-4 transition ${
                    m.isDefault
                      ? "bg-rose-50 border-rose-200"
                      : "bg-white border-gray-100 hover:border-rose-100"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {m.label} •••• {m.last4}
                      </p>

                      {/* Default badge */}
                      {m.isDefault && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                          <Star className="w-3 h-3 fill-current" />
                          Default
                        </span>
                      )}
                    </div>

                    {/* delete */}
                    <button onClick={() => handleDelete(m.id)}>
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>

                  {/* Set Default */}
                  {!m.isDefault && (
                    <button
                      onClick={() => handleSetDefault(m.id)}
                      className="mt-3 text-xs font-semibold text-rose-400 hover:text-rose-600 transition"
                    >
                      Set as Default →
                    </button>
                  )}
                </div>
              ))}

              {/* Add */}
              <button
                onClick={() => setAdding(true)}
                className="mt-2 py-3 rounded-2xl border-2 border-dashed border-rose-200 text-rose-400 flex justify-center gap-2 hover:bg-rose-50"
              >
                <Plus /> Add Method
              </button>
            </>
          )}

          {/* FORM */}
          {adding && (
            <div className="flex flex-col gap-4">
              <input
                placeholder="Visa / PromptPay"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="px-3 py-2 rounded-xl border border-rose-100 bg-rose-50 text-sm focus:border-rose-300 outline-none"
              />

              <input
                placeholder="Last 4 digits"
                value={last4}
                onChange={(e) => setLast4(e.target.value)}
                className="px-3 py-2 rounded-xl border border-rose-100 bg-rose-50 text-sm focus:border-rose-300 outline-none"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setAdding(false)}
                  className="flex-1 border border-rose-200 text-rose-400 rounded-xl py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-rose-500 text-white rounded-xl py-2 font-bold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;