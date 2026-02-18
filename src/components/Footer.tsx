import { Link } from 'react-router-dom';
import boemmLogo from '@/assets/Boemm_logoo.png';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/">
              <img src={boemmLogo} alt="BÖEMMM" className="h-8 invert" />
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Timeless furniture design emerging from West Africa. 
              Where modern elegance meets heritage craft.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Collections</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/collections" className="text-sm text-background/70 hover:text-background transition-colors">
                All Collections
              </Link>
              <Link to="/collections/wrought-lemute" className="text-sm text-background/70 hover:text-background transition-colors">
                Wrought L'émeute
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                About Us
              </Link>
              <Link to="/about/articles" className="text-sm text-background/70 hover:text-background transition-colors">
                Articles
              </Link>
              <Link to="/ar-experience" className="text-sm text-background/70 hover:text-background transition-colors">
                AR Experience
              </Link>
              <Link to="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Get in Touch</h4>
            <address className="not-italic text-sm text-background/70 space-y-2">
              <p>West Africa</p>
              <a href="mailto:hello@boemmm.com" className="block hover:text-background transition-colors">
                hello@boemmm.com
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} BÖEMMM. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-background/50 hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
