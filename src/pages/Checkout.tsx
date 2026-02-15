import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      collection: item.collection,
    }));

    const { error } = await supabase.from('orders').insert({
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone || null,
      shipping_address: formData.address || null,
      order_notes: formData.notes || null,
      items: orderItems,
      total_price: totalPrice,
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: 'Failed to place order. Please try again.', variant: 'destructive' });
      return;
    }

    // Send confirmation email (fire-and-forget)
    supabase.functions.invoke('send-order-confirmation', {
      body: {
        customerName: formData.name,
        customerEmail: formData.email,
        items: orderItems,
        totalPrice,
      },
    }).catch(console.error);

    clearCart();
    navigate('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="font-serif text-2xl">Your cart is empty</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-serif text-3xl mb-10">Checkout</h1>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Full Name *
              </label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Email *
              </label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Phone
              </label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Shipping Address
              </label>
              <Textarea name="address" value={formData.address} onChange={handleChange} rows={3} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Order Notes
              </label>
              <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90 h-12"
            >
              {isSubmitting ? 'Placing Order...' : `Place Order — ${formatPrice(totalPrice)}`}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-lg mb-4">Order Summary</h2>
            <div className="space-y-4 border-t border-border pt-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-serif text-lg">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
