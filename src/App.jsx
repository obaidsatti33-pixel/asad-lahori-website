
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

import "./App.css";

import restaurantFront from "./assets/restaurant-front.png";
import restaurantInterior from "./assets/restaurant-interior.png";
import asadOwner from "./assets/asad-owner.png";

const API_URL = "https://asad-lahori-nashta-backend.vercel.app";

const defaultSettings = {
  restaurantName: "Asad Lahori Nashta Centre",
  phone: "",
  address: "Kalar Chowk, Kahuta",
  openingTime: "06:00",
  closingTime: "12:00",
  currency: "PKR",
  deliveryEnabled: true,
  pickupEnabled: true,
  whatsappOrders: true,
  orderNotifications: true,
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =========================
  // RESTAURANT SETTINGS
  // =========================

  const [restaurantSettings, setRestaurantSettings] =
    useState(defaultSettings);

  const [settingsLoading, setSettingsLoading] =
    useState(true);

  // =========================
  // LOAD SETTINGS FROM BACKEND
  // =========================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setSettingsLoading(true);

        const response = await fetch(
          `${API_URL}/api/settings`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load settings"
          );
        }

        setRestaurantSettings({
          ...defaultSettings,
          ...data,
        });
      } catch (error) {
        console.error(
          "Restaurant settings error:",
          error
        );

        // Keep default settings if backend is unavailable
        setRestaurantSettings(defaultSettings);
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // =========================
  // CART
  // =========================

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(
        "asadLahoriCart"
      );

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error("Cart load error:", error);
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // =========================
  // SCROLL ANIMATIONS
  // =========================

  useEffect(() => {
    const animatedElements =
      document.querySelectorAll(
        ".hero-content, .about-section, .gallery-section, .menu-section, .contact-section, .footer"
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "section-visible"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("section-hidden");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "asadLahoriCart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id, size) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id &&
        item.size === size
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id, size) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id &&
          item.size === size
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (id, size) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  };

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =========================
  // CART TOTAL
  // =========================

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        item.quantity,
    0
  );

  // =========================
  // WHATSAPP NUMBER
  // =========================

  const whatsappNumber =
    restaurantSettings?.phone?.replace(
      /\D/g,
      ""
    ) || "923235162155";

  // =========================
  // WHATSAPP ORDER
  // =========================

  const orderOnWhatsApp = () => {
    if (cart.length === 0) return;

    if (
      restaurantSettings?.whatsappOrders ===
      false
    ) {
      alert(
        "WhatsApp ordering is currently unavailable."
      );
      return;
    }

    const items = cart
      .map(
        (item) =>
          `${item.name} × ${item.quantity} = Rs. ${
            item.price *
            item.quantity
          }`
      )
      .join("\n");

    const message = `${
      restaurantSettings?.restaurantName ||
      "Asad Lahori Nashta Centre"
    },

I would like to place an order:

${items}

Total: Rs. ${cartTotal}

Thank you.`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      "_blank"
    );
  };

  // =========================
  // SUBMIT ORDER TO BACKEND
  // =========================

  const submitOrderToBackend = async (
    customer
  ) => {
    try {
      // =========================
      // GET PRODUCTS
      // =========================

      const productsResponse =
        await fetch(
          `${API_URL}/api/products`
        );

      if (!productsResponse.ok) {
        throw new Error(
          "Could not connect to menu API."
        );
      }

      const productsData =
        await productsResponse.json();

      const backendProducts =
        productsData.value ||
        productsData ||
        [];

      // =========================
      // NAME MAP
      // =========================

      const nameMap = {
        "سادہ چنے": "Sada Chana",
        "انڈہ چنے": "Anda Chana",
        "کوفتہ چنے": "Kofta Chana",
        "پائے": "Paye",
        "نہاری": "Nihari",
        "سپیشل چائے": "Special Chai",
        "نان": "Nan",
        "روٹی": "Roti",
        "پراٹھہ": "Paratha",
        "روغنی": "Roghni",
        "کلچہ": "Kulcha",
        "رائتہ": "Raita",
      };

      // =========================
      // CART → BACKEND
      // =========================

      const orderProducts =
        cart.map((item) => {
          const backendName =
            nameMap[item.name] ||
            item.name;

          const backendProduct =
            backendProducts.find(
              (product) =>
                product.name
                  ?.trim()
                  .toLowerCase() ===
                backendName
                  .trim()
                  .toLowerCase()
            );

          if (!backendProduct) {
            throw new Error(
              `Product not found in database: ${item.name}`
            );
          }

          return {
            productId:
              backendProduct._id,

            name: item.name,

            price: Number(
              item.price
            ),

            quantity:
              item.quantity,
          };
        });

      // =========================
      // SAVE ORDER TOTAL
      // =========================

      const orderTotal =
        cart.reduce(
          (total, item) =>
            total +
            Number(item.price) *
              item.quantity,
          0
        );

      // =========================
      // ORDER TYPE
      // =========================

      const orderType =
        customer.orderType ||
        "Delivery";

      // =========================
      // ORDER DATA
      // =========================

      const orderData = {
        customerName:
          customer.name,

        customerPhone:
          customer.phone,

        customerAddress:
          customer.address,

        orderType,

        products:
          orderProducts,

        totalAmount:
          orderTotal,

        notes:
          customer.notes || "",
      };

      console.log(
        "Sending order:",
        orderData
      );

      // =========================
      // POST ORDER
      // =========================

      const response =
        await fetch(
          `${API_URL}/api/orders`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              orderData
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to place order."
        );
      }

      // =========================
      // SUCCESS
      // =========================

      console.log(
        "Order saved successfully:",
        data
      );

      console.log(
        "Order ID:",
        data._id ||
          data.order?._id ||
          "Created"
      );

      // Clear cart
      setCart([]);

      localStorage.removeItem(
        "asadLahoriCart"
      );

      // IMPORTANT:
      // Do NOT close checkout here.
      // Checkout.jsx will show success screen.

      return {
        success: true,

        orderId:
          data._id ||
          data.order?._id ||
          null,

        total:
          orderTotal,
      };
    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      throw error;
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="restaurant">

      {/* NAVBAR */}

      <Navbar
        mobileMenuOpen={
          mobileMenuOpen
        }
        setMobileMenuOpen={
          setMobileMenuOpen
        }
        cartCount={cartCount}
        setCartOpen={
          setCartOpen
        }
        restaurantSettings={
          restaurantSettings
        }
      />

      {/* HERO */}

      <Hero />

      {/* ABOUT */}

      <About
        restaurantInterior={
          restaurantInterior
        }
        asadOwner={asadOwner}
        restaurantFront={
          restaurantFront
        }
      />

      {/* GALLERY */}

      <Gallery
        restaurantFront={
          restaurantFront
        }
        restaurantInterior={
          restaurantInterior
        }
      />

      {/* MENU */}

      <Menu
        addToCart={addToCart}
      />

      {/* CONTACT */}

      <Contact
        restaurantSettings={
          restaurantSettings
        }
      />

      {/* CART */}

      <Cart
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={
          setCartOpen
        }
        increaseQuantity={
          increaseQuantity
        }
        decreaseQuantity={
          decreaseQuantity
        }
        removeFromCart={
          removeFromCart
        }
        cartTotal={cartTotal}
        onCheckout={() => {
          if (
            cart.length === 0
          ) {
            return;
          }

          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onWhatsApp={
          orderOnWhatsApp
        }
        whatsappEnabled={
          restaurantSettings?.whatsappOrders !==
          false
        }
      />

      {/* CHECKOUT */}

      <Checkout
        cart={cart}
        cartTotal={cartTotal}
        checkoutOpen={
          checkoutOpen
        }
        setCheckoutOpen={
          setCheckoutOpen
        }
        onBackToCart={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        onOrderComplete={
          submitOrderToBackend
        }
        restaurantSettings={
          restaurantSettings
        }
      />

      {/* FOOTER */}

      <Footer
        restaurantSettings={
          restaurantSettings
        }
      />

    </div>
  );
}

export default App;

