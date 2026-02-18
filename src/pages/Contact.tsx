import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('inquiries').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' });
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We'd love to hear from you. Whether you have questions about our 
            collections or need assistance with an order, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-2xl mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-secondary/50 p-8 text-center">
                <h3 className="font-serif text-xl mb-4">Thank You</h3>
                <p className="text-muted-foreground">
                  Your message has been received. We'll be in touch within 
                  1-2 business days.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-6"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-foreground transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="orders">Order Support</option>
                    <option value="trade">Trade & Wholesale</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-sm uppercase tracking-wider"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-2xl mb-8">Get in Touch</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Location</h3>
                  <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                    Accra, Ghana<br />
                    West Africa
                  </address>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Email</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>General: <a href="mailto:hello@boemmm.com" className="hover:text-foreground transition-colors">hello@boemmm.com</a></p>
                    <p>Orders: <a href="mailto:orders@boemmm.com" className="hover:text-foreground transition-colors">orders@boemmm.com</a></p>
                    <p>Press: <a href="mailto:press@boemmm.com" className="hover:text-foreground transition-colors">press@boemmm.com</a></p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Phone</h3>
                  <p className="text-muted-foreground text-sm">
                    <a href="tel:+233000000000" className="hover:text-foreground transition-colors">
                      +233 (0) 00 000 0000
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monday - Friday, 9am - 6pm GMT
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
