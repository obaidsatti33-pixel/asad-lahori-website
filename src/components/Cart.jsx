
function Cart({
  cart,
  cartOpen,
  setCartOpen,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  cartTotal,
  onCheckout,
}) {
  return (
    <>
      {/* Cart Backdrop */}
      {cartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
        ></div>
      )}

      {/* =========================
          CART DRAWER
      ========================= */}

      <aside
        className={`cart-drawer ${
          cartOpen ? "cart-open" : ""
        }`}
      >

        {/* =========================
            CART HEADER
        ========================= */}

        <div className="cart-header">

          <div>
            <span className="section-label">
              YOUR ORDER
            </span>

            <h2>
              Your Cart
            </h2>
          </div>

          <button
            className="cart-close"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>

        </div>

        {/* =========================
            EMPTY CART
        ========================= */}

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h3>
              Your Cart is Empty
            </h3>

            <p>
              Explore our menu and add your
              favourite Lahori breakfast items.
            </p>

            <button
              className="empty-cart-button"
              onClick={() => {
                setCartOpen(false);

                document
                  .getElementById("menu")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Explore Menu →
            </button>

          </div>

        ) : (

          /* =========================
             CART WITH ITEMS
          ========================= */

          <>

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.size || ""}`}
                >

                  {/* Item Information */}

                  <div className="cart-item-info">

                    <span className="cart-item-number">
                      {String(item.id).padStart(2, "0")}
                    </span>

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      {item.size && (
                        <span className="cart-item-size">
                          {item.size}
                        </span>
                      )}

                      <strong>
                        Rs. {item.price * item.quantity}
                      </strong>

                    </div>

                  </div>

                  {/* Item Actions */}

                  <div className="cart-item-actions">

                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* =========================
                CART FOOTER
            ========================= */}

            <div className="cart-footer">

              <div className="cart-total-row">

                <span>
                  Total
                </span>

                <strong>
                  Rs. {cartTotal}
                </strong>

              </div>

              <p className="cart-note">
                Review your order before
                proceeding to checkout.
              </p>

              <button
                className="whatsapp-checkout"
                onClick={onCheckout}
              >
                <span>✓</span>

                Proceed to Checkout

                <strong>
                  →
                </strong>
              </button>

            </div>

          </>

        )}

      </aside>
    </>
  );
}

export default Cart;

