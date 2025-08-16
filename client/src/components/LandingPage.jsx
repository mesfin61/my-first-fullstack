import React, { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import '../assets/styles/landingpage.css'

function LandingPage() {
  const [activeForm, setActiveForm] = useState('login')

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1 className="logo">MyWay</h1>
      </header>

      <section className="motto">
        <h1>Welcome to Our Learning Platform</h1>
        <p>Your journey to knowledge starts here.</p>
      </section>

      <section className="landing-content">
        <div className="about">
          <h2>About Us</h2>
          <p>
            Welcome to our platform — your free gateway to becoming a
            professional web developer. We believe that quality education should
            be accessible to everyone, which is why we offer completely free,
            high-quality programming courses focused on building modern websites
            and web applications. Whether you're just starting out or looking to
            sharpen your skills, our video lessons cover everything from core
            languages like HTML, CSS, and JavaScript to powerful frameworks and
            technologies like React, Node.js, Express.js, and SQL. Learn at your
            own pace, build real-world projects, and join a growing community of
            passionate developers. The future of tech starts here — and it’s
            free.
          </p>
        </div>

        <div className="account">
          {activeForm === 'login' ? (
            <Login switchForm={() => setActiveForm('signup')} />
          ) : (
            <SignUp switchForm={() => setActiveForm('login')} />
          )}
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2025 Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
