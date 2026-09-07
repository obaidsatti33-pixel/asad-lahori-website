import { useEffect, useState } from "react";

import sadaChana from "../assets/sada-chana.png.png";
import andaChana from "../assets/anda-chana.png.png";
import koftaChana from "../assets/kofta-chana.png.png";
import paye from "../assets/paye.png.png";
import nihari from "../assets/nihari.png.png";
import specialChai from "../assets/special-chai.png.png";
import naan from "../assets/naan.png.png";
import roti from "../assets/roti.png.png";
import paratha from "../assets/paratha.png.png";
import roghni from "../assets/roghni.png.png";
import kulcha from "../assets/kulcha.png.png";
import raita from "../assets/raita.png.png";

function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // =========================
  // BACKEND API
  // =========================

  const API_URL = "https://asad-lahori-nashta-backend.vercel.app";

  // =========================
  // STATIC UI DATA
  // =========================
  // Images + Urdu content remain
  // controlled by frontend.
  // Prices/availability come from MongoDB.

  const menuData = [
    {
      name: "Sada Chana",
      urduName: "سادہ چنے",
      description: "روایتی مصالحوں کے ساتھ مزیدار چنے",
      image: sadaChana,
      category: "چنے",
      featured: false,
      type: "options",
      sizes: ["فل", "ہاف"],
    },
    {
      name: "Anda Chana",
      urduName: "انڈہ چنے",
      description: "چنوں کے ساتھ مزیدار تازہ انڈہ",
      image: andaChana,
      category: "چنے",
      featured: false,
      type: "options",
      sizes: ["فل", "ہاف"],
    },
    {
      name: "Kofta Chana",
      urduName: "کوفتہ چنے",
      description: "خاص مصالحے اور نرم کوفتوں کے ساتھ",
      image: koftaChana,
      category: "چنے",
      featured: false,
      type: "options",
      sizes: ["فل", "ہاف"],
    },
    {
      name: "Paye",
      urduName: "پائے",
      description: "روایتی لاہوری انداز میں تیار کیے گئے پائے",
      image: paye,
      category: "نہاری",
      featured: true,
      type: "options",
      sizes: ["فل", "ہاف"],
    },
    {
      name: "Nihari",
      urduName: "نہاری",
      description: "آہستہ پکائی ہوئی خوشبودار روایتی نہاری",
      image: nihari,
      category: "نہاری",
      featured: false,
      type: "options",
      sizes: ["فل", "ہاف"],
    },
    {
      name: "Special Chai",
      urduName: "سپیشل چائے",
      description: "گرم، خوشبودار اور تازہ چائے",
      image: specialChai,
      category: "چائے",
      featured: false,
      type: "options",
      sizes: ["فل کپ", "ہاف کپ"],
    },
    {
      name: "Nan",
      urduName: "نان",
      description: "تازہ اور گرم تندوری نان",
      image: naan,
      category: "روٹی / نان",
      featured: false,
      type: "single",
      size: "1 عدد",
    },
    {
      name: "Roti",
      urduName: "روٹی",
      description: "تازہ اور نرم روٹی",
      image: roti,
      category: "روٹی / نان",
      featured: false,
      type: "single",
      size: "1 عدد",
    },
    {
      name: "Paratha",
      urduName: "پراٹھہ",
      description: "گرم اور خستہ روایتی پراٹھہ",
      image: paratha,
      category: "روٹی / نان",
      featured: false,
      type: "single",
      size: "1 عدد",
    },
    {
      name: "Roghni",
      urduName: "روغنی",
      description: "مزیدار اور نرم روغنی روٹی",
      image: roghni,
      category: "روٹی / نان",
      featured: false,
      type: "single",
      size: "1 عدد",
    },
    {
      name: "Kulcha",
      urduName: "کلچہ",
      description: "تازہ اور نرم روایتی کلچہ",
      image: kulcha,
      category: "روٹی / نان",
      featured: false,
      type: "single",
      size: "1 عدد",
    },
    {
      name: "Raita",
      urduName: "رائتہ",
      description: "تازہ اور ٹھنڈا مزیدار رائتہ",
      image: raita,
      category: null,
      featured: false,
      type: "single",
      size: "1 عدد",
    },
  ];

  // =========================
  // FETCH MENU
  // =========================

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(`${API_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Failed to load menu.");
      }

      const data = await response.json();

      const products = data.value || data || [];

      // =========================
      // MERGE DATABASE + UI DATA
      // =========================

      const mergedItems = menuData
        .map((item) => {
          const backendProduct = products.find(
            (product) =>
              product.name?.trim().toLowerCase() ===
              item.name.trim().toLowerCase()
          );

          if (!backendProduct) {
            return null;
          }

          return {
            ...item,

            // MongoDB ID
            id: backendProduct._id,

            // Backend price
            price: Number(backendProduct.price || 0),

            // Backend availability
            isAvailable:
              backendProduct.isAvailable !== false,

            // Keep backend description if available
            description:
              backendProduct.description ||
              item.description,

            // Keep backend category if available
            category:
              backendProduct.category ||
              item.category,

            // Featured stays frontend controlled
            featured: item.featured,
          };
        })
        .filter(Boolean);

      setMenuItems(mergedItems);
    } catch (err) {
      console.error("Menu loading error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD MENU ON START
  // =========================

  useEffect(() => {
    fetchMenu();
  }, []);

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All",
    "چنے",
    "نہاری",
    "چائے",
    "روٹی / نان",
  ];

  // =========================
  // FILTER
  // =========================

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        );

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <section id="menu" className="menu-section">
        <div className="menu-container">

          <div className="menu-heading">
            <span className="section-label">
              OUR MENU
            </span>

            <h2>
              <span>ذائقوں کا انتخاب</span>
            </h2>

            <p>
              خالص لاہوری ذائقہ، آپ کی پسند کے مطابق
            </p>
          </div>

          <div className="menu-loading">
            <div className="menu-loading-spinner"></div>

            <p>
              مینو لوڈ ہو رہا ہے...
            </p>
          </div>

        </div>
      </section>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (error) {
    return (
      <section id="menu" className="menu-section">
        <div className="menu-container">

          <div className="menu-heading">
            <span className="section-label">
              OUR MENU
            </span>

            <h2>
              <span>ذائقوں کا انتخاب</span>
            </h2>

            <p>
              خالص لاہوری ذائقہ، آپ کی پسند کے مطابق
            </p>
          </div>

          <div className="menu-api-error">

            <div className="menu-api-error-icon">
              ⚠
            </div>

            <h3>
              مینو لوڈ نہیں ہو سکا
            </h3>

            <p>
              براہ کرم چند لمحوں بعد دوبارہ کوشش کریں۔
            </p>

            <button onClick={fetchMenu}>
              دوبارہ کوشش کریں
            </button>

          </div>

        </div>
      </section>
    );
  }

  // =========================
  // RETURN
  // =========================

  return (
    <section id="menu" className="menu-section">

      <div className="menu-container">

        {/* =========================
            MENU HEADING
        ========================= */}

        <div className="menu-heading">

          <span className="section-label">
            OUR MENU
          </span>

          <h2>
            <span>ذائقوں کا انتخاب</span>
          </h2>

          <p>
            خالص لاہوری ذائقہ، آپ کی پسند کے مطابق
          </p>

        </div>


        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="menu-tabs">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* =========================
            MENU GRID
        ========================= */}

        <div className="menu-grid">

          {filteredItems.map((item) => (

            <article
              className={`menu-card ${
                item.featured
                  ? "featured-menu-card"
                  : ""
              } ${
                !item.isAvailable
                  ? "menu-card-unavailable"
                  : ""
              }`}
              key={item.id}
            >

              {/* =========================
                  IMAGE
              ========================= */}

              <div className="menu-image-wrapper">

                <img
                  src={item.image}
                  alt={item.urduName}
                  className="menu-image"
                  loading="lazy"
                  decoding="async"
                />

                <div className="menu-image-overlay"></div>

                <span className="menu-number">
                  {String(
                    menuData.findIndex(
                      (menuItem) =>
                        menuItem.name === item.name
                    ) + 1
                  ).padStart(2, "0")}
                </span>

                {item.featured && (
                  <span className="menu-featured">
                    SIGNATURE
                  </span>
                )}

                {!item.isAvailable && (
                  <div className="menu-unavailable-overlay">
                    <span>
                      فی الحال دستیاب نہیں
                    </span>
                  </div>
                )}

              </div>


              {/* =========================
                  CONTENT
              ========================= */}

              <div className="menu-card-content">

                <h3>
                  {item.urduName}
                </h3>

                <p>
                  {item.description}
                </p>


                {/* =========================
                    FULL / HALF
                ========================= */}

                {item.type === "options" ? (

                  <div className="order-options">

                    {item.sizes.map((size, index) => {

                      const optionPrice =
                        index === 0
                          ? item.price
                          : Math.round(
                              item.price / 2
                            );

                      return (
                        <button
                          className="order-item"
                          key={size}
                          disabled={!item.isAvailable}
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.urduName,
                              price: optionPrice,
                              size,
                              backendId: item.id,
                            })
                          }
                        >

                          <span>
                            {size}
                          </span>

                          <strong>
                            Rs. {optionPrice}
                          </strong>

                        </button>
                      );
                    })}

                  </div>

                ) : (

                  /* =========================
                     SINGLE PRICE
                  ========================= */

                  <div className="single-order-row">

                    <div className="menu-prices single-price">

                      <span>
                        Price
                      </span>

                      <strong>
                        Rs. {item.price}
                      </strong>

                    </div>


                    <button
                      className="order-item single-order-button"
                      disabled={!item.isAvailable}
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.urduName,
                          price: item.price,
                          size: item.size,
                          backendId: item.id,
                        })
                      }
                    >
                      {item.isAvailable
                        ? "Add to Order →"
                        : "Currently Unavailable"}
                    </button>

                  </div>

                )}

              </div>

            </article>

          ))}

        </div>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {filteredItems.length === 0 && (

          <div className="menu-empty">

            <h3>
              اس کیٹیگری میں ابھی کوئی آئٹم نہیں۔
            </h3>

            <button
              onClick={() =>
                setActiveCategory("All")
              }
            >
              تمام آئٹمز دیکھیں
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default Menu;