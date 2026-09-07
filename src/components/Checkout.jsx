
import { useEffect, useState } from "react";

function Checkout({
  cart,
  cartTotal,
  checkoutOpen,
  setCheckoutOpen,
  onBackToCart,
  onOrderComplete,
  restaurantSettings,
}) {
  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [completedOrderTotal, setCompletedOrderTotal] =
    useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [orderError, setOrderError] =
    useState("");

  const [orderType, setOrderType] =
    useState("Delivery");

  // =========================
  // AVAILABLE ORDER TYPES
  // =========================

 const deliveryEnabled = true;
const pickupEnabled = true;

  // =========================
  // SET DEFAULT ORDER TYPE
  // =========================

  useEffect(() => {
    if (deliveryEnabled) {
      setOrderType("Delivery");
    } else if (pickupEnabled) {
      setOrderType("Pickup");
    }
  }, [
    deliveryEnabled,
    pickupEnabled,
  ]);

  // =========================
  // WHATSAPP NUMBER
  // =========================

  const whatsappNumber =
    restaurantSettings?.phone?.replace(
      /\D/g,
      ""
    ) || "923235162155";

  // =========================
  // RESTAURANT NAME
  // =========================

  const restaurantName =
    restaurantSettings?.restaurantName ||
    "Asad Lahori Nashta Centre";

  // =========================
  // CHECKOUT CLOSED
  // =========================

  if (!checkoutOpen) {
    return null;
  }

  // =========================
  // SUBMIT ORDER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setOrderError("");

    // =========================
    // CHECK ORDER TYPE
    // =========================

    if (
      !deliveryEnabled &&
      !pickupEnabled
    ) {
      setOrderError(
        "Online ordering is currently unavailable."
      );
      return;
    }

    if (
      orderType === "Delivery" &&
      !deliveryEnabled
    ) {
      setOrderError(
        "Delivery is currently unavailable."
      );
      return;
    }

    if (
      orderType === "Pickup" &&
      !pickupEnabled
    ) {
      setOrderError(
        "Pickup is currently unavailable."
      );
      return;
    }

    const formData = new FormData(
      e.currentTarget
    );

    const customer = {
      name:
        formData.get("name")?.trim() || "",

      phone:
        formData.get("phone")?.trim() || "",

      address:
        formData.get("address")?.trim() || "",

      notes:
        formData.get("notes")?.trim() || "",

      orderType,
    };

    // =========================
    // VALIDATION
    // =========================

    if (!customer.name) {
      setOrderError(
        "Please enter your full name."
      );
      return;
    }

    if (!customer.phone) {
      setOrderError(
        "Please enter your phone number."
      );
      return;
    }

    // Address required only for delivery
    if (
      orderType === "Delivery" &&
      !customer.address
    ) {
      setOrderError(
        "Please enter your delivery address."
      );
      return;
    }

    if (!/^03\d{9}$/.test(customer.phone)) {
      setOrderError(
        "Please enter a valid Pakistani mobile number, e.g. 03001234567."
      );
      return;
    }

    if (!cart || cart.length === 0) {
      setOrderError(
        "Your cart is empty."
      );
      return;
    }

    // =========================
    // SAVE TOTAL
    // =========================

    const totalAtSubmission =
      cartTotal;

    setCompletedOrderTotal(
      totalAtSubmission
    );

    setIsSubmitting(true);

    try {
      // =========================
      // SEND TO BACKEND
      // =========================

      const result =
        await onOrderComplete(
          customer
        );

      console.log(
        "Order completed:",
        result
      );

      // =========================
      // SHOW SUCCESS
      // =========================

      setOrderPlaced(true);
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      setOrderError(
        error.message ||
          "Order place nahi ho saka. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // CLOSE CHECKOUT
  // =========================

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    setOrderPlaced(false);
    setCompletedOrderTotal(0);
    setOrderError("");

    setCheckoutOpen(false);
  };

  // =========================
  // BACK TO CART
  // =========================

  const handleBackToCart = () => {
    if (isSubmitting) {
      return;
    }

    setOrderPlaced(false);
    setCompletedOrderTotal(0);
    setOrderError("");

    onBackToCart();
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="checkout-overlay">

      <div className="checkout-modal">

        {/* =========================
            CLOSE
        ========================= */}

        <button
          className="checkout-close"
          onClick={handleClose}
          aria-label="Close checkout"
          disabled={isSubmitting}
        >
          ✕
        </button>

        {/* =========================
            CHECKOUT FORM
        ========================= */}

        {!orderPlaced ? (
          <>
            <div className="checkout-header">

              <span className="section-label">
                CHECKOUT
              </span>

              <h2>
                Complete Your{" "}
                <span>Order</span>
              </h2>

              <p>
                Please enter your details so we
                can prepare your order.
              </p>

            </div>

            <div className="checkout-content">

              {/* =========================
                  FORM
              ========================= */}

              <form
                className="checkout-form"
                onSubmit={handleSubmit}
              >

                {/* =========================
                    ORDER TYPE
                ========================= */}

                <div className="checkout-field">

                  <label>
                    Order Type{" "}
                    <span>*</span>
                  </label>

                  <div className="checkout-order-types">

                    {deliveryEnabled && (
                      <label
                        className={`checkout-order-type ${
                          orderType === "Delivery"
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value="Delivery"
                          checked={
                            orderType ===
                            "Delivery"
                          }
                          onChange={(e) =>
                            setOrderType(
                              e.target.value
                            )
                          }
                          disabled={
                            isSubmitting
                          }
                        />

                        <span className="checkout-order-type-icon">
                          🚚
                        </span>

                        <span>
                          <strong>
                            Delivery
                          </strong>

                          <small>
                            Delivered to your address
                          </small>
                        </span>

                      </label>
                    )}

                    {pickupEnabled && (
                      <label
                        className={`checkout-order-type ${
                          orderType === "Pickup"
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value="Pickup"
                          checked={
                            orderType ===
                            "Pickup"
                          }
                          onChange={(e) =>
                            setOrderType(
                              e.target.value
                            )
                          }
                          disabled={
                            isSubmitting
                          }
                        />

                        <span className="checkout-order-type-icon">
                          🏪
                        </span>

                        <span>
                          <strong>
                            Pickup
                          </strong>

                          <small>
                            Collect from restaurant
                          </small>
                        </span>

                      </label>
                    )}

                  </div>

                </div>

                {/* NAME */}

                <div className="checkout-field">

                  <label>
                    Full Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    required
                  />

                </div>

                {/* PHONE */}

                <div className="checkout-field">

                  <label>
                    Phone Number{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="03001234567"
                    autoComplete="tel"
                    maxLength="11"
                    inputMode="numeric"
                    pattern="03[0-9]{9}"
                    disabled={isSubmitting}
                    required
                  />

                </div>

                {/* ADDRESS */}

                {orderType ===
                  "Delivery" && (
                  <div className="checkout-field">

                    <label>
                      Delivery Address{" "}
                      <span>*</span>
                    </label>

                    <textarea
                      name="address"
                      rows="4"
                      placeholder="Enter your complete delivery address"
                      autoComplete="street-address"
                      disabled={
                        isSubmitting
                      }
                      required
                    ></textarea>

                  </div>
                )}

                {/* PICKUP MESSAGE */}

                {orderType ===
                  "Pickup" && (
                  <div className="checkout-pickup-note">

                    <span>
                      🏪
                    </span>

                    <div>
                      <strong>
                        Restaurant Pickup
                      </strong>

                      <p>
                        Your order will be prepared
                        for collection at{" "}
                        {restaurantName}.
                      </p>
                    </div>

                  </div>
                )}

                {/* NOTES */}

                <div className="checkout-field">

                  <label>
                    Additional Instructions

                    <small>
                      Optional
                    </small>
                  </label>

                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Any special instructions? e.g. Less spicy"
                    disabled={isSubmitting}
                  ></textarea>

                </div>

                {/* ERROR */}

                {orderError && (
                  <div className="checkout-error">

                    <span>
                      !
                    </span>

                    <p>
                      {orderError}
                    </p>

                  </div>
                )}

                {/* ACTION BUTTONS */}

                <div className="checkout-actions">

                  <button
                    type="button"
                    className="checkout-back"
                    onClick={
                      handleBackToCart
                    }
                    disabled={isSubmitting}
                  >
                    ← Back to Cart
                  </button>

                  <button
                    type="submit"
                    className="checkout-submit"
                    disabled={
                      isSubmitting ||
                      (!deliveryEnabled &&
                        !pickupEnabled)
                    }
                  >

                    {isSubmitting ? (
                      <>
                        <span className="checkout-spinner"></span>

                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order
                        <span>
                          →
                        </span>
                      </>
                    )}

                  </button>

                </div>

              </form>

              {/* =========================
                  ORDER SUMMARY
              ========================= */}

              <div className="checkout-summary">

                <span className="section-label">
                  YOUR ORDER
                </span>

                <h3>
                  Order Summary
                </h3>

                <div className="checkout-items">

                  {cart.map((item) => (
                    <div
                      className="checkout-item"
                      key={`${item.id}-${item.size || ""}`}
                    >

                      <div className="checkout-item-info">

                        <strong className="checkout-item-name">
                          {item.name}
                        </strong>

                        <div className="checkout-item-meta">

                          {item.size !==
                            "1 عدد" &&
                            item.size && (
                              <span className="checkout-item-size">
                                {item.size}
                              </span>
                            )}

                          <span className="checkout-item-quantity">
                            Qty:{" "}
                            {item.quantity}
                          </span>

                        </div>

                      </div>

                      <strong className="checkout-item-price">
                        Rs.{" "}
                        {item.price *
                          item.quantity}
                      </strong>

                    </div>
                  ))}

                </div>

                <div className="checkout-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    Rs. {cartTotal}
                  </strong>

                </div>

                <div className="checkout-payment">

                  <span>
                    💵
                  </span>

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order is
                      delivered.
                    </small>

                  </div>

                </div>

              </div>

            </div>
          </>
        ) : (

          /* =========================
             ORDER SUCCESS
          ========================= */

          <div className="order-success">

            <div className="success-icon">
              ✓
            </div>

            <span className="section-label">
              ORDER RECEIVED
            </span>

            <h2>
              Thank You!{" "}
              <span>
                Your Order Has Been Received
              </span>
            </h2>

            <p>
              We have received your order
              details. Our team will contact
              you shortly.
            </p>

            <div className="success-total">

              <span>
                Order Total
              </span>

              <strong>
                Rs. {completedOrderTotal}
              </strong>

            </div>

            <div className="success-actions">

              <button
                className="success-home"
                onClick={handleClose}
              >
                Back to Website
                <span>
                  →
                </span>
              </button>

              {restaurantSettings?.whatsappOrders !==
                false && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="success-whatsapp"
                >
                  💬 Contact Us on WhatsApp
                </a>
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Checkout;

