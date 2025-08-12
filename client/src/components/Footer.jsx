import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/footer.css'

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>CourseEra</h3>
            <p>
              Empowering learners with free, high-quality programming education
              anytime, anywhere.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: Mesfinayele257@gmail.com</p>
            <p>Phone: +251-961-3030-63</p>
            <p>Location: Bishoftu, Ethiopia</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CourseEra. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
