export const SiteFooter = () => {
  return (
    <footer className="bg-[#022c22] border-t border-[#6ee7b7]/10 py-32 px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-20">
        <div className="max-w-sm">
          <div className="text-4xl font-black text-white mb-8 tracking-tighter">Academic<span className="text-[#fbbf24]">Nexus</span></div>
          <p className="text-[#6ee7b7]/40 leading-relaxed font-medium">
            Advancing record integrity through specialized cryptographic storage solutions. Part of the Global Academic Data Initiative.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fbbf24] mb-8">Infrastructure</h4>
            <ul className="space-y-4 text-sm font-bold text-[#6ee7b7]/40">
              <li>Vault 1</li>
              <li>Nexus Node</li>
              <li>Sentinel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fbbf24] mb-8">Compliance</h4>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Encryption</li>
          </div>
        </div>
      </div>
      
      <div className="mt-32 pt-12 border-t border-[#6ee7b7]/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#6ee7b7]/20">
        <span>© {new Date().getFullYear()} Nexus Governance Board. All rights reserved.</span>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-[#fbbf24] transition-colors">Archive</a>
          <a href="#" className="hover:text-[#fbbf24] transition-colors">Connect</a>
        </div>
      </div>
    </footer>
  );
};
