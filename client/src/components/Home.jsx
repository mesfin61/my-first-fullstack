import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import axios from 'axios'
import '../assets/styles/home.css'
import { VideosContext } from '../context/videosContext'

function Home() {
  const { user } = useContext(UserContext)
  const { videos } = useContext(VideosContext)
  const [stats, setStats] = useState({
    total_users: 0,
    total_courses: 0,
    total_videos: 0,
  })

  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/status`)
        const data = response.data
        setStats(data)
      } catch (err) {
        console.log('there is an error', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="home-container">
      <div className="home-user">
        <h2>
          hello, <span>{user.first_name}</span>
        </h2>
      </div>
      <div className="about-us">
        <p>
          Welcome to CourseEra, your gateway to free, high-quality programming
          education. Our platform offers a wide range of video tutorials
          covering topics from web development and mobile app creation to data
          science and database management. You can easily sign up, explore our
          curated courses, track your progress, and access learning materials
          anytime, anywhere. We provide a seamless, user-friendly experience,
          integrating with our Telegram channel for instant video access and
          updates. Whether you’re a beginner taking your first steps into coding
          or an experienced developer seeking to refine your skills, CourseEra
          equips you with the tools, knowledge, and community support you need
          to achieve your learning goals — all without cost.
        </p>

        <Link to={'/courses'}>Get started now</Link>
      </div>
      <div className="information">
        <h2 className="total-info">About us</h2>
        <div className="stats">
          <div className="stat">
            <CountUp
              start={0}
              end={stats.total_users}
              duration={3}
              formattingFn={(value) => value.toString().padStart(2, '0')}
            />
            <h3>Total users</h3>
          </div>
          <div className="stat">
            <CountUp
              start={0o0}
              end={stats.total_courses}
              duration={3}
              formattingFn={(value) => value.toString().padStart(2, '0')}
            />
            <h3>Total courses</h3>
          </div>
          <div className="stat">
            <CountUp
              start={0o0}
              end={stats.total_videos}
              duration={3}
              formattingFn={(value) => value.toString().padStart(2, '0')}
            />
            <h3>Total videos</h3>
          </div>
        </div>
      </div>
      <div className="featured-videos">
        <h2>featured videos</h2>
        <div className="videos">
          {videos &&
            videos.slice(0, 3).map((video, index) => (
              <div key={index} className="video-card">
                <h4>{video.public_id}</h4>
                <video src={video.secure_url} controls type="video/mp4" />
              </div>
            ))}
        </div>
        <Link to={'/courses'}>More videos</Link>
      </div>
      <div className="contact-container">
        <h2>get in touch with us</h2>
        <p>
          contact us if you have any question, feedback or suggestion regarding
          to our services
        </p>

        <div className="contact-details">
          <div className="contact-form">
            <form>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your name"
              />
              <label>email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <label>subject:</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Write your subject"
              />
              <label>description:</label>
              <textarea
                name="description"
                id="description"
                placeholder="Write subject detail..."
              ></textarea>

              <button type="button">Submit</button>
            </form>
          </div>

          <div className="address-container">
            <div className="address-item">
              <div className="address-icon">📍</div>
              <div className="address-content">
                <h3>Name</h3>
                <p>Mesfin Ayele</p>
              </div>
            </div>
            <div className="address-item">
              <div className="address-icon">🏠</div>
              <div className="address-content">
                <h3>Address</h3>
                <p>Bishoftu, Ethiopia</p>
              </div>
            </div>
            <div className="address-item">
              <div className="address-icon">✉️</div>
              <div className="address-content">
                <h3>Email</h3>
                <p>Mesfinayele257@gmail.com</p>
              </div>
            </div>
            <div className="address-item">
              <div className="address-icon">📱</div>
              <div className="address-content">
                <h3>Phone</h3>
                <p>+251-961-3030-63</p>
              </div>
            </div>
            <div className="address-item">
              <div className="address-icon">ℹ️</div>
              <div className="address-content">
                <h3>Description</h3>
                <p>
                  If you have any job related to website development feel free
                  to contact me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
