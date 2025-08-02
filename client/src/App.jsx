import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Courses from './components/Courses'
import Header from './components/Header'
import './App.css'
import User from './components/User'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'

// Layout with Header
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  )
}

export default App
