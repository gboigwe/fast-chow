import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants/products';
import type { CategoryType } from '../types';

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const validCategory = categoryId as CategoryType;

  // Filter products by category
  const categoryProducts = PRODUCTS.filter(
    (product) => product.category === validCategory
  );

  // Get category info
  const categoryInfo = CATEGORIES[validCategory];

  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">Categories</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-primary font-medium">{categoryInfo.title}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{categoryInfo.title}</h1>
        <p className="text-xl text-gray-600 mb-2">{categoryInfo.description}</p>
        <p className="text-lg">
          <span className="text-gray-600">Price Range:</span>{' '}
          <span className="font-semibold text-primary">{categoryInfo.priceRange}</span>
        </p>
        <p className="text-gray-600 mt-4">
          {categoryProducts.length} package{categoryProducts.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
