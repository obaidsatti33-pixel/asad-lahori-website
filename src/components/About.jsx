
function About({ restaurantInterior, asadOwner, restaurantFront }) {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        <div className="about-images">

          <div className="about-main-image">
            <img
              src={restaurantInterior}
              alt="Restaurant Interior"
            />
          </div>

          <div className="about-owner-card">

            <div className="owner-image">
              <img
                src={asadOwner}
                alt="Restaurant Owner"
              />
            </div>

            <div className="owner-info">
              <span>FOUNDER &amp; OWNER</span>
              <h3>Asad Satti</h3>
              
            </div>

          </div>

          <div className="about-image-small gallery-signboard">
            <img
              src={restaurantFront}
              alt="Restaurant Front"
            />
          </div>

        </div>

        <div className="about-content">

          <span className="section-label">
            OUR STORY
          </span>

          <h2>
            لاہور کا ذائقہ، <br />
            <span>دل سے آپ تک۔</span>
          </h2>

          <p className="about-lead">
            Asad Lahori Nashta Centre میں ہمارا مقصد صرف ناشتہ
            پیش کرنا نہیں، بلکہ آپ کو خالص لاہوری ذائقے اور
            روایتی مہمان نوازی کا تجربہ دینا ہے۔
          </p>

          <p>
            تازہ چنے، خوشبودار نہاری، مزے دار پائے، گرم چائے
            اور تازہ روٹی — ہر چیز کو روایتی ذائقے اور بہترین
            معیار کے ساتھ تیار کیا جاتا ہے۔
            ہم چاہتے ہیں کہ ہر آنے والا گاہک یہاں سے صرف پیٹ
            بھر کر نہیں، بلکہ ایک اچھا ذائقہ اور یاد لے کر جائے۔
          </p>

          <div className="about-highlights">

            <div className="about-highlight">
              <strong>01</strong>

              <div>
                <h4>Fresh Every Day</h4>
                <p>روزانہ تازہ اور معیاری کھانے</p>
              </div>
            </div>

            <div className="about-highlight">
              <strong>02</strong>

              <div>
                <h4>Traditional Taste</h4>
                <p>اصل روایتی لاہوری ذائقہ</p>
              </div>
            </div>

            <div className="about-highlight">
              <strong>03</strong>

              <div>
                <h4>Made With Care</h4>
                <p>محبت اور صفائی کے ساتھ تیار</p>
              </div>
            </div>

          </div>

          <div className="about-signature">

            <div className="signature-line"></div>

            <div>
              <strong>Asad Satti</strong>
              <span>Founder &amp; Owner</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;
