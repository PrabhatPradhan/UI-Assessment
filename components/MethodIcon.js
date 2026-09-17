import { CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";

const icons = {
  UPI: Smartphone,
  Card: CreditCard,
  "Net Banking": Landmark,
  Wallet: Wallet,
};

export default function MethodIcon({ method, size = 16, className = "" }) {
  const Icon = icons[method] || CreditCard;
  return <Icon size={size} strokeWidth={1.75} className={className} />;
}
