
function Footer({ restaurantSettings }) {
  const restaurantName =
    restaurantSettings?.restaurantName ||
    "Asad Lahori Nashta Centre";

  const openingTime =
    restaurantSettings?.openingTime ||
    "05:00";

  const closingTime =
    restaurantSettings?.closingTime ||
    "16:00";

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] =
      time.split(":");

    let hour = Number(hours);

    const period =
      hour >= 12 ? "PM" : "AM";

    hour =
      hour % 12 || 12;

    return `${String(hour).padStart(
      2,
      "0"
    )}:${minutes} ${period}`;
  };

  const formattedOpeningTime =
    formatTime(openingTime);

  const formattedClosingTime =
    formatTime(closingTime);

  const nameParts =
    restaurantName.split(" ");

  const brandMain =
    nameParts[0] || "Asad";

  const brandSub =
    nameParts.slice(1).join(" ") ||
    "Lahori Nashta Centre";

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-brand">

          <a
            href="#home"
            className="footer-logo"
          >
            <span className="footer-mark">
              A
            </span>

            <span>
              <strong>
                {brandMain}
              </strong>

              <small>
                {brandSub}
              </small>
            </span>
          </a>

          <p>
            خالص لاہوری ذائقہ، روایتی انداز اور
            تازہ ناشتہ — ہر دن دل سے۔
          </p>

          <span className="footer-tagline">
            AUTHENTIC LAHORI TASTE
          </span>

        </div>

        {/* =========================
            NAVIGATION
        ========================= */}

        <div className="footer-links">

          <span className="footer-title">
            EXPLORE
          </span>

          <a href="#home">
            Home
          </a>

          <a href="#menu">
            Our Menu
          </a>

          <a href="#about">
            Our Story
          </a>

          <a href="#gallery">
            Gallery
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

        {/* =========================
            OPENING HOURS
        ========================= */}

        <div className="footer-hours-block">

          <span className="footer-title">
            OPENING HOURS
          </span>

          <div className="footer-hours-content">

            <strong>
              Monday — Sunday
            </strong>

            <span>
              {formattedOpeningTime} —{" "}
              {formattedClosingTime}
            </span>

          </div>

          <div className="footer-status">
            <span></span>
            Open Every Day
          </div>

        </div>

        {/* =========================
            FINAL CTA
        ========================= */}

        <div className="footer-cta">

          <span className="footer-title">
            START YOUR DAY RIGHT
          </span>

          <h3>
            ایک ناشتہ،
            <br />
            <span>
              یادگار ذائقہ۔
            </span>
          </h3>

          <a
            href="#menu"
            className="footer-menu-button"
          >
            Explore Menu
            <span>→</span>
          </a>

        </div>

      </div>

      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()}{" "}
          {restaurantName}. All Rights Reserved.
        </p>

        <div className="footer-bottom-links">

          <a href="#home">
            Back to Top ↑
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

