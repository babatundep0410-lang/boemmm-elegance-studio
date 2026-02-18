import { useCurrency } from '@/contexts/CurrencyContext';

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <button
      onClick={() => setCurrency(currency === 'GHS' ? 'USD' : 'GHS')}
      className="text-xs uppercase tracking-wider border border-border px-3 py-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      title={currency === 'GHS' ? 'Switch to USD' : 'Switch to GHS'}
    >
      {currency === 'GHS' ? 'View in USD' : 'View in GH₵'}
    </button>
  );
};

export default CurrencyToggle;
