import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <CheckCircle className="w-16 h-16 text-primary" />
      <h1 className="font-serif text-3xl">Order Placed Successfully</h1>
      <p className="text-muted-foreground max-w-md">
        Thank you for your purchase. We'll be in touch shortly with shipping details.
      </p>
      <Button variant="outline" onClick={() => navigate('/')}>
        Return Home
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
