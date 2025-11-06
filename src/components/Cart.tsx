import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link to="/">
          <Button>Browse Packages</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cart ({items.length} items)</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-sm text-gray-600">{item.product.price} XLM</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="font-semibold text-primary">
                {item.product.price * item.quantity} XLM
              </p>
            </div>

            {/* Remove Button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeItem(item.product.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-primary">{getTotalPrice()} XLM</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/cart" className="flex-1">
            <Button className="w-full">View Full Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
