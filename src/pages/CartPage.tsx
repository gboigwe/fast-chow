import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const transactionFee = 0.00001; // Placeholder fee
  const total = getTotalPrice() + transactionFee;

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/order/confirm');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingCart className="h-32 w-32 text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some delicious snacks to your cart to get started
          </p>
          <Link to="/">
            <Button size="lg">Browse Packages</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.description}</p>
                    <p className="text-lg font-semibold text-primary mt-1">
                      {item.product.price} XLM
                    </p>
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
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right w-24">
                    <p className="font-bold text-xl text-primary">
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">XLM</p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.product.id)}
                    className="flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="space-y-2 py-4 border-y border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{getTotalPrice().toFixed(5)} XLM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Fee</span>
                  <span className="font-semibold">{transactionFee.toFixed(5)} XLM</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{total.toFixed(5)}</p>
                  <p className="text-sm text-gray-600">XLM</p>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Link to="/">
                  <Button variant="outline" className="w-full" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
