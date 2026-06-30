function About() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="text-center mb-4">About Us</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h2>Our Story</h2>
              <p>
                Welcome to The Oasis Restaurant, where culinary excellence meets warm hospitality.
                Founded in 2020, we have been serving our community with passion and dedication.
              </p>
              <p>
                Our mission is to provide an exceptional dining experience with fresh, locally-sourced
                ingredients, crafted into delicious meals by our talented chefs.
              </p>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-body">
              <h2>Our Team</h2>
              <p>
                Led by Executive Chef Maria Rodriguez, our team brings over 20 years of combined
                experience in fine dining. Each member is passionate about creating memorable
                flavors that delight our guests.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h2>Our Values</h2>
              <ul>
                <li>Quality ingredients from local suppliers</li>
                <li>Sustainable practices in our kitchen</li>
                <li>Outstanding customer service</li>
                <li>Community involvement and support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;