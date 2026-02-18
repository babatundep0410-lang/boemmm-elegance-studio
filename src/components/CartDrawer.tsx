import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import CurrencyToggle from '@/components/CurrencyToggle';

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  // Use the first item's exchange rate as a representative rate for total
  const avgRate = items.length > 0 ? items[0].exchangeRate : 15;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-background">
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-xl tracking-wide">Your Cart</SheetTitle>
            {items.length > 0 && <CurrencyToggle />}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-muted-foreground text-center">Your cart is empty</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto py-6 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-muted flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-muted-foreground">No image</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.collection}</p>
                        <h4 className="font-serif text-sm mt-1">{item.name}</h4>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-muted transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-muted transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm">{formatPrice(item.price * item.quantity, item.exchangeRate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 pb-8 space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-serif">{formatPrice(totalPrice, avgRate)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                onClick={() => { setIsOpen(false); navigate('/checkout'); }}
              >
                Proceed to Checkout
              </Button>
              <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
