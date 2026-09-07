
function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
  cartCount,
  setCartOpen,
  restaurantSettings,
}) {
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const restaurantName =
    restaurantSettings?.restaurantName ||
    "Asad Lahori Nashta Centre";

  const nameParts = restaurantName.split(" ");

  const brandMain =
    nameParts[0] || "Asad";

  const brandSub =
    nameParts.slice(1).join(" ") ||
    "Lahori Nashta Centre";

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Brand */}
        <a
          href="#home"
          className="brand"
          onClick={closeMobileMenu}
        >
          <span className="brand-mark">
            A
          </span>

          <span className="brand-text">
            <strong>
              {brandMain}
            </strong>

            <small>
              {brandSub}
            </small>
          </span>
        </a>

        {/* Navigation */}
        <nav
          className={`nav-links ${
            mobileMenuOpen
              ? "mobile-open"
              : ""
          }`}
        >
          <a
            href="#home"
            onClick={closeMobileMenu}
          >
            Home
          </a>

          <a
            href="#menu"
            onClick={closeMobileMenu}
          >
            Menu
          </a>

          <a
            href="#about"
            onClick={closeMobileMenu}
          >
            About
          </a>

          <a
            href="#gallery"
            onClick={closeMobileMenu}
          >
            Gallery
          </a>

          <a
            href="#contact"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">

          <button
            className="cart-button"
            onClick={() =>
              setCartOpen(true)
            }
            aria-label={`Open cart with ${cartCount} items`}
          >
            <span className="cart-icon">
              🛒
            </span>

            <span className="cart-label">
              Order
            </span>

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            className={`menu-toggle ${
              mobileMenuOpen
                ? "active"
                : ""
            }`}
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              mobileMenuOpen
            }
          >
            <span></span>
            <span></span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;

