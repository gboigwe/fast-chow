import { CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useCart } from '../hooks/useCart';

interface CheckoutProps {
  onConfirm: () => void;
}

export default function Checkout({ onConfirm }: CheckoutProps) {
  const { items, getTotalPrice } = useCart();

  const transactionFee = 0.00001;
  const total = getTotalPrice() + transactionFee;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-primary">
                {(item.product.price * item.quantity).toFixed(2)} XLM
              </p>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{getTotalPrice().toFixed(5)} XLM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction Fee</span>
              <span className="font-semibold">{transactionFee.toFixed(5)} XLM</span>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">{total.toFixed(5)} XLM</span>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <p className="font-semibold">Stellar Wallet</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connect your Stellar wallet to complete the payment. Supported wallets: Freighter, xBull, Albedo.
            </p>
            <Button variant="outline" className="w-full">
              Connect Wallet
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>

      {/* Confirm Payment Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={onConfirm}
      >
        Confirm Payment
      </Button>
    </div>
  );
}
