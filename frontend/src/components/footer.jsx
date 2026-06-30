import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer py-3">
      <div className="container px-3 mx-0" style={{maxWidth: '100%'}}>
        <div className="row gy-3 justify-content-between gx-0">
          <div className="col-12 col-md-5 text-start ps-0">
            <h5 className="mb-2">The Oasis Restaurant</h5>
            <p className="footer-text-muted mb-0 small">
              Delicious meals made with love and fresh ingredients. Experience the taste of tradition with every bite.
            </p>
          </div>

          <div className="col-12 col-md-2 text-center text-md-start">
            <h5 className="mb-2">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-wrap gap-3 small">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="footer-link">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-3 text-end pe-0">
            <h5 className="mb-3">Contact Info</h5>
            <p className="footer-text-muted mb-1">123 Main Street, City, State 12345</p>
            <p className="footer-text-muted mb-1">(555) 123-4567</p>
            <p className="footer-text-muted mb-0">info@oasisrestaurant.com</p>
          </div>
        </div>

        <hr className="my-2" />
        <div className="footer-bottom text-center mb-o small">
          <p className="footer-text-muted mb-0">&copy; 2026 The Oasis Restaurant. All rights reserved.</p>
          <p className="footer-text-muted mb-0">
            Crafted with <span style={{ color: 'var(--color-primary)' }}>&hearts;</span> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
