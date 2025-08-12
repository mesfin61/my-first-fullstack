import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { VideosProvider } from './context/videosContext'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Courses from './components/Courses'
import Header from './components/Header'
import './App.css'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import Footer from './components/Footer'

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

function App() {
  return (
    <UserProvider>
      <VideosProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/home"
              element={
                <Layout>
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                </Layout>
              }
            />
            <Route
              path="/courses"
              element={
                <Layout>
                  <PrivateRoute>
                    <Courses />
                  </PrivateRoute>
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </VideosProvider>
    </UserProvider>
  )
}

export default App
