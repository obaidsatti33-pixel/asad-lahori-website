
function Contact({ restaurantSettings }) {
  const restaurantName =
    restaurantSettings?.restaurantName ||
    "Asad Lahori Nashta Centre";

  const phone =
    restaurantSettings?.phone ||
    "0323 5162155";

  // =========================
  // WHATSAPP NUMBER
  // =========================
  const getWhatsAppNumber = (value) => {
    if (!value) {
      return "923235162155";
    }

    let number = String(value).replace(/\D/g, "");

    // Pakistan local number: 0323...
    if (number.startsWith("03")) {
      number = "92" + number.slice(1);
    }

    // Already Pakistan international format
    if (number.startsWith("92")) {
      return number;
    }

    // Fallback
    return "923235162155";
  };

  const whatsappNumber = getWhatsAppNumber(
    restaurantSettings?.phone
  );

  const address =
    restaurantSettings?.address ||
    "Kalar Chowk, Kahuta";

  const openingTime =
    restaurantSettings?.openingTime ||
    "05:00";

  const closingTime =
    restaurantSettings?.closingTime ||
    "16:00";

  // =========================
  // FORMAT TIME
  // =========================
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] =
      time.split(":");

    let hour = Number(hours);

    const period =
      hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(
      2,
      "0"
    )}:${minutes} ${period}`;
  };

  const formattedOpeningTime =
    formatTime(openingTime);

  const formattedClosingTime =
    formatTime(closingTime);

  // =========================
  // GOOGLE MAPS
  // =========================
  const mapsQuery = encodeURIComponent(
    `${restaurantName}, ${address}, Punjab, Pakistan`
  );

  // =========================
  // WHATSAPP LINK
  // =========================
  const whatsappLink =
    `https://wa.me/${whatsappNumber}`;

  return (
    <section
      id="contact"
      className="contact-section"
    >

      <div className="contact-container">

        {/* =========================
            HEADING
        ========================= */}

        <div className="contact-heading">

          <span className="section-label">
            CONTACT & VISIT
          </span>

          <h2>
            تشریف لائیں،{" "}
            <span>
              ذائقہ آزمائیں۔
            </span>
          </h2>

          <p>
            خالص لاہوری ناشتے، گرم چائے اور
            روایتی ذائقے کے لیے آج ہی{" "}
            {restaurantName} تشریف لائیں۔
          </p>

        </div>

        <div className="contact-grid">

          {/* =========================
              LOCATION
          ========================= */}

          <div className="contact-card">

            <div className="contact-icon">
              📍
            </div>

            <div>

              <span>
                FIND US
              </span>

              <h3>
                ہماری لوکیشن
              </h3>

              <p>
                {restaurantName}
                <br />
                {address}
                <br />
                Punjab, Pakistan
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps پر راستہ دیکھیں →
              </a>

            </div>

          </div>

          {/* =========================
              PHONE
          ========================= */}

          <div className="contact-card">

            <div className="contact-icon">
              ☎
            </div>

            <div>

              <span>
                CALL US
              </span>

              <h3>
                فون پر رابطہ
              </h3>

              <p>
                آرڈر یا معلومات کے لیے
                <br />
                ہمیں کال کریں
              </p>

              <a
                href={`tel:${phone.replace(
                  /[^\d+]/g,
                  ""
                )}`}
              >
                {phone}
              </a>

            </div>

          </div>

          {/* =========================
              WHATSAPP
          ========================= */}

          <div className="contact-card contact-whatsapp">

            <div className="contact-icon">
              💬
            </div>

            <div>

              <span>
                ORDER ON WHATSAPP
              </span>

              <h3>
                WhatsApp پر آرڈر
              </h3>

              <p>
                گھر بیٹھے اپنا پسندیدہ ناشتہ
                <br />
                آسانی سے آرڈر کریں۔
              </p>

              {restaurantSettings?.whatsappOrders !==
                false ? (

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp پر آرڈر کریں →
                </a>

              ) : (

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    opacity: 0.6,
                  }}
                >
                  WhatsApp ordering unavailable
                </span>

              )}

            </div>

          </div>

        </div>

        {/* =========================
            OPENING HOURS
        ========================= */}

        <div className="opening-hours">

          <div className="hours-title">

            <span className="section-label">
              OPENING HOURS
            </span>

            <h3>
              ہر دن تازہ ناشتہ
            </h3>

          </div>

          <div className="hours-list">

            <div>

              <span>
                Monday — Sunday
              </span>

              <strong>
                {formattedOpeningTime} —{" "}
                {formattedClosingTime}
              </strong>

            </div>

          </div>

        </div>

        {/* =========================
            CTA
        ========================= */}

        <div className="contact-cta">

          <div>

            <span>
              READY FOR A LAHORI BREAKFAST?
            </span>

            <h3>
              آج کا ناشتہ ہمارے ساتھ۔
            </h3>

          </div>

          <a href="#menu">
            مینو دیکھیں
            <span>→</span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default Contact;


