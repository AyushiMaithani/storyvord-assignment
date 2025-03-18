import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/lib/CartContext';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters, FilterState } from '@/components/ProductFilters';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/axios';
import { useState, useMemo } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const queryClient = new QueryClient();

function ProductList() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsApi.getAll();
      return response.data as Product[];
    },
  });

  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;

      return matchesCategory;
    });
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <>
      <ProductFilters categories={categories} onFilterChange={setFilters} />
      <div className="container py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No products found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-background ">
          <Navbar />
          <main>
            <div className="container py-6">
            </div>
            <ProductList />
          </main>
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;