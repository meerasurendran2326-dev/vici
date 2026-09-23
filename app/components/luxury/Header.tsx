export function Header() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <div className="brand-mark">VINI VICI VIDI</div>
        <div className="nav-links">
          <a href="#collection">Collections</a>
          <a href="#craft">Craftsmanship</a>
          <a href="#story">Story</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-meta">
          <span>WHATSAPP</span>
          <button type="button" className="nav-cart">
            Cart (0)
          </button>
        </div>
      </nav>
    </header>
  );
}
