import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Banner Section */}
      <div className="hero-section text-white d-flex align-items-center">
        <div className="container text-center">
          <div className="hero-overline">Welcome to</div>
          <h1 className="display-3 mb-3 fw-bold">The Oasis Restaurant</h1>
          <p className="hero-subtitle mb-4">Delicious meals made with fresh, locally-sourced ingredients</p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-warning btn-lg px-4 py-2 fw-bold shadow">
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Value Propositions Grid */}
      {/* <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-3">
              <div className="text-warning mb-2 fs-1">🥦</div>
              <h4 className="fw-bold">100% Fresh</h4>
              <p className="text-muted">We partner with local organic farms to bring crisp, premium ingredients straight to your dinner plate.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <div className="text-warning mb-2 fs-1">⚡</div>
              <h4 className="fw-bold">Lightning Fast</h4>
              <p className="text-muted">Our delivery dispatch agents maintain localized routes ensuring your food arrives hot, fresh, and on schedule.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <div className="text-warning mb-2 fs-1">🍳</div>
              <h4 className="fw-bold">Master Chefs</h4>
              <p className="text-muted">Our kitchen staff consists of award-winning culinary professionals passionate about building unforgettable flavors.</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
