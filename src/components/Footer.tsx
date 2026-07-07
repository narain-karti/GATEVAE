import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
        
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="font-bold text-2xl tracking-widest uppercase">GateVae</span>
          </div>
          <p className="text-gray-400 max-w-sm text-lg">
            Designing the future of technology shopping.
          </p>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">SHOP</h4>
          <ul className="space-y-4">
            {['Products', 'Accessories', 'Deals'].map(link => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">COMPANY</h4>
          <ul className="space-y-4">
            {['About', 'Innovation', 'Careers'].map(link => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">SUPPORT</h4>
          <ul className="space-y-4">
            {['Contact', 'Shipping', 'Warranty'].map(link => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
        <p className="text-gray-500 text-sm">© 2026 GateVae. All Rights Reserved</p>
        <div className="flex gap-6">
          {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
            <a key={social} href="#" className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
