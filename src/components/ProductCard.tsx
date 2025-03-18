import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';


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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-square overflow-hidden  rounded-lg flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-auto object-contain transition-transform hover:scale-105"
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={addToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}