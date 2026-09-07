
function Hero() {
  return (
    <main id="home">
      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-badge">
            <span></span>
            AUTHENTIC LAHORI BREAKFAST
          </div>

          <h1>
            Asad
            <span>Lahori Nashta Centre</span>
          </h1>

          <p className="hero-urdu">
            ذائقہ جو لاہور کی یاد دلا دے
          </p>

          <p className="hero-description">
            تازہ، روایتی اور خالص لاہوری ناشتے کا اصل ذائقہ۔
            ہر نوالے میں محبت، روایت اور لاہوری انداز۔
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="primary-button">
              مینو دیکھیں
              <span>→</span>
            </a>

            <a href="#contact" className="secondary-button">
              رابطہ کریں
            </a>
          </div>

          <div className="hero-features">

            <div>
              <strong>100%</strong>
              <span>Fresh &amp; Tasty</span>
            </div>

            <div className="feature-line"></div>

            <div>
              <strong>Since 2018</strong>
              <span>Traditional Taste</span>
            </div>

            <div className="feature-line"></div>

            <div>
              <strong>Daily</strong>
              <span>Fresh Breakfast</span>
            </div>

          </div>

        </div>

        <div className="scroll-indicator">
          <span></span>
          SCROLL TO EXPLORE
        </div>

      </section>
    </main>
  );
}

export default Hero;

