import { CreditCard } from 'lucide-react';
import { Button } from './ui/button';

export default function WalletConnect() {
  // Placeholder - wallet integration will be added with smart contracts
  const handleConnect = () => {
    alert('Wallet connection will be implemented with Stellar integration');
  };

  return (
    <Button onClick={handleConnect} className="flex items-center gap-2">
      <CreditCard className="h-5 w-5" />
      Connect Wallet
    </Button>
  );
}
