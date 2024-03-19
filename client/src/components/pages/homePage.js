import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/home.css';
import cottageImg from '../../resources/images/cottage.png';
import { Logout } from '../../api/user';

// Default website information
const defaultWebsiteInfo = {
    title: "EdenVista Retreat: Unveiling Nature's Elegance in El Nido",
    description:
        "Discover paradise at our brand-new resort nestled in the heart of El Nido, where luxury meets nature's breathtaking beauty. Immerse yourself in the serenity of pristine beaches, turquoise waters, and lush landscapes that define this tropical haven. Our resort offers an unparalleled escape with meticulously designed accommodations, each thoughtfully crafted to provide comfort and elegance. Indulge in a variety of world-class amenities, including spa services, exquisite dining options, and personalized concierge services, ensuring a seamless and unforgettable experience. Whether you seek relaxation on the sun-kissed shores or crave adventure exploring the wonders of El Nido, our resort is the perfect gateway to an idyllic retreat. Embrace the allure of paradise and create lasting memories at our exquisite El Nido resort.",
    address: '123 Resort Way, Paradise Island',
    phone: '123-456-7890',
    email: 'info@resort.com',
};

const handleLogout = async (e) => {
    e.preventDefault();
    await Logout().then(
        (result) => {
            window.location.href = '/login';
        },
        (error) => {
            window.location.href = '/home';
        },
    );
};

const handleAdminPanel = (e) => {
    e.preventDefault();
    window.location.href = '/admin';
};

const HomePage = ({ websiteInfo = defaultWebsiteInfo }) => (
    <div className="home">
        <header>
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/roomreservation">Room Reservation</a>
                    </li>
                    <li>
                        <a href="/inquiries">Inquiries</a>
                    </li>
                </ul>
            </nav>
        </header>

        <body>
            <div className="content">
                <img src={cottageImg} alt="cottage" />
                <h1>{websiteInfo.title}</h1>
                <p>{websiteInfo.description}</p>
            </div>
        </body>

        <footer className="footer" id="contact">
            <div className="contact-info">
                <h3>Contact Us</h3>
                <p>Address: {websiteInfo.address}</p>
                <p>Phone: {websiteInfo.phone}</p>
                <p>Email: {websiteInfo.email}</p>
                <button onClick={handleLogout} className="btn" type="submit">
                    Logout
                </button>
                <button
                    onClick={handleAdminPanel}
                    className="btn"
                    type="submit"
                >
                    Admin Access
                </button>
            </div>
        </footer>
    </div>
);

HomePage.propTypes = {
    websiteInfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
};

export default HomePage;
