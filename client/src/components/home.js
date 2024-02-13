import React from 'react';
import './home.css';
import resortImg from './resort.png';

const HomePage = () => {
  return (
    <div className="home">
      <header>
      </header>
      
      <body>
        <div className="content">
          <h1>EdenVista Retreat: Unveiling Nature&apos;s Elegance in El Nido</h1>
          <img src={resortImg} alt="resort" />
          <p>Discover paradise at our brand-new resort nestled in the heart of El Nido, where luxury meets nature&apos;s breathtaking beauty. Immerse yourself in the serenity of pristine beaches, turquoise waters, and lush landscapes that define this tropical haven. Our resort offers an unparalleled escape with meticulously designed accommodations, each thoughtfully crafted to provide comfort and elegance. Indulge in a variety of world-class amenities, including spa services, exquisite dining options, and personalized concierge services, ensuring a seamless and unforgettable experience. Whether you seek relaxation on the sun-kissed shores or crave adventure exploring the wonders of El Nido, our resort is the perfect gateway to an idyllic retreat. Embrace the allure of paradise and create lasting memories at our exquisite El Nido resort.</p>
        </div>
      </body>
      
      <footer className="footer" id="contact">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>123 Resort Way, Paradise Island</p>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@resort.com</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
