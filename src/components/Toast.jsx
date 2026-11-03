import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast, hideToast } = useCart();

  if (!toast.visible) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    info: <Info size={18} className="toast-icon info" />,
    warning: <AlertTriangle size={18} className="toast-icon warning" />,
  };

  return (
    <div className={`toast-notification toast-${toast.type}`} role="status" aria-live="polite">
      <div className="toast-body">
        {icons[toast.type] || icons.success}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button
        onClick={hideToast}
        className="toast-close"
        aria-label="Close notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}
