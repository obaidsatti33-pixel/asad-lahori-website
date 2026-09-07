
function Gallery({ restaurantFront, restaurantInterior }) {
  return (
    <section className="gallery-section" id="gallery">

      <div className="gallery-container">

        <div className="gallery-heading">

          <span className="section-label">
            OUR PLACE
          </span>

          <h2>
            ایک نظر <span>ہمارے گھر پر۔</span>
          </h2>

          <p>
            جہاں ہر دن تازہ ذائقے، اچھی محفل اور لاہوری
            مہمان نوازی آپ کا انتظار کرتی ہے۔
          </p>

        </div>

        <div className="gallery-grid">

          <div className="gallery-item gallery-large gallery-signboard">

            <img
              src={restaurantFront}
              alt="Restaurant Front"
            />

            <div className="gallery-overlay">

              <span>01</span>

              <h3>Our Place</h3>

              <p>
                Asad Lahori Nashta Centre
              </p>

            </div>

          </div>

          <div className="gallery-item gallery-tall">

            <img
              src={restaurantInterior}
              alt="Restaurant Interior"
            />

            <div className="gallery-overlay">

              <span>02</span>

              <h3>Our Dining Space</h3>

              <p>
                Good Food. Good Company.
              </p>

            </div>

          </div>

          <div className="gallery-placeholder">

            <div>

              <span>03</span>

              <h3>Food Gallery</h3>

              <p>
                Fresh food photography coming soon
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Gallery;

