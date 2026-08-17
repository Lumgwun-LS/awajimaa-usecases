export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">A</div>
            <span className="font-bold text-xl tracking-tight">Awajimaa</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground font-mono">
            <a href="#" className="hover:text-primary transition-colors">GOVERNMENT</a>
            <a href="#" className="hover:text-secondary transition-colors">ENTERPRISE</a>
            <a href="#" className="hover:text-primary transition-colors">INVESTORS</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Awajimaa App. All rights reserved.</p>
          <p>usecases.awajimaaapp.io</p>
        </div>
      </div>
    </footer>
  );
}