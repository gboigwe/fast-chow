import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Check, Zap, Shield, DollarSign, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants/products';

export default function Home() {
  // Get featured products (2 from each category)
  const featuredProducts = [
    ...PRODUCTS.filter(p => p.category === 'budget').slice(0, 2),
    ...PRODUCTS.filter(p => p.category === 'middle').slice(0, 2),
    ...PRODUCTS.filter(p => p.category === 'bulk').slice(0, 2),
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-accent to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary">Fast Snacks</span>{' '}
                <span className="text-gray-900">On Chain</span>
              </h1>
              <p className="text-xl text-gray-600">
                Order snacks, pay with crypto, delivered fast. Experience the future of food ordering on the Stellar blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/category/budget">
                  <Button size="lg">Browse Packages</Button>
                </Link>
                <Button size="lg" variant="outline">
                  How It Works
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <Package className="h-64 w-64 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your favorite snacks is as easy as 1-2-3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <Package className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Browse Packages</h3>
              <p className="text-gray-600">
                Choose from budget-friendly to bulk event packages
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Add to Cart</h3>
              <p className="text-gray-600">
                Select your packages and review your order
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <Check className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Pay & Confirm</h3>
              <p className="text-gray-600">
                Pay with XLM and get instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We have packages for every budget and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Budget Category */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-primary">{CATEGORIES.budget.title}</CardTitle>
                <CardDescription>{CATEGORIES.budget.description}</CardDescription>
                <p className="text-2xl font-bold text-gray-900 mt-2">{CATEGORIES.budget.priceRange}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {PRODUCTS.filter(p => p.category === 'budget').slice(0, 2).map(p => (
                    <li key={p.id} className="text-sm text-gray-600">• {p.name}</li>
                  ))}
                </ul>
                <Link to="/category/budget">
                  <Button className="w-full">View All</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Middle Category */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-primary">{CATEGORIES.middle.title}</CardTitle>
                <CardDescription>{CATEGORIES.middle.description}</CardDescription>
                <p className="text-2xl font-bold text-gray-900 mt-2">{CATEGORIES.middle.priceRange}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {PRODUCTS.filter(p => p.category === 'middle').slice(0, 2).map(p => (
                    <li key={p.id} className="text-sm text-gray-600">• {p.name}</li>
                  ))}
                </ul>
                <Link to="/category/middle">
                  <Button className="w-full">View All</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Bulk Category */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-primary">{CATEGORIES.bulk.title}</CardTitle>
                <CardDescription>{CATEGORIES.bulk.description}</CardDescription>
                <p className="text-2xl font-bold text-gray-900 mt-2">{CATEGORIES.bulk.priceRange}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {PRODUCTS.filter(p => p.category === 'bulk').slice(0, 2).map(p => (
                    <li key={p.id} className="text-sm text-gray-600">• {p.name}</li>
                  ))}
                </ul>
                <Link to="/category/bulk">
                  <Button className="w-full">View All</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our most popular snack packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/category/budget">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of blockchain-powered food delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>

            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Blockchain Secure</h3>
              <p className="text-gray-600">All transactions secured on Stellar blockchain</p>
            </div>

            <div className="text-center">
              <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Low Fees</h3>
              <p className="text-gray-600">Minimal transaction fees with crypto payments</p>
            </div>

            <div className="text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Checkout</h3>
              <p className="text-gray-600">Simple wallet integration for quick payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg px-6">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I place an order?</AccordionTrigger>
                <AccordionContent>
                  Browse our packages, add items to your cart, connect your Stellar wallet, and confirm your payment. It's that simple!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept payments in XLM (Stellar Lumens) through your Stellar-compatible wallet like Freighter or xBull.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does delivery take?</AccordionTrigger>
                <AccordionContent>
                  Most orders are delivered within 30-60 minutes depending on your location and the package size.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are the prices in XLM or Naira?</AccordionTrigger>
                <AccordionContent>
                  All prices are displayed in XLM (Stellar Lumens). The XLM amount is equivalent to the Naira value at current exchange rates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I cancel my order?</AccordionTrigger>
                <AccordionContent>
                  Orders can be cancelled within 5 minutes of placement. After that, the order is already being prepared for delivery.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start enjoying fast, secure, and delicious snack delivery today
          </p>
          <Link to="/category/budget">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
              Browse Packages
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
