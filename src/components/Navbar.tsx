import { CartDrawer } from '@/components/CartDrawer';
import { Store } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50  border-b bg-background/95 ">
      <div className="container flex h-14 items-center pl-6">
        <div className="flex items-center space-x-2">
          <Store className="h-6 w-6" />
          <span className="font-bold">SHOPPING</span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-4 pr-12">
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
}