import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <CheckCircle className="w-16 h-16 text-primary" />
      <h1 className="font-serif text-3xl">Request Received</h1>
      <p className="text-muted-foreground max-w-md">
        Thank you for your interest. Our team will contact you within 24 hours to confirm your order and arrange payment.
      </p>
      <Button variant="outline" onClick={() => navigate('/')}>
        Return Home
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
