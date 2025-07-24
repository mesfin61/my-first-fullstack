import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/usercontext'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Courses from './components/Courses'
import Header from './components/Header'
import './App.css'
import User from './components/User'
import Profile from './components/Profile'

// Layout with Header
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<User />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProvider>
                <Profile />
              </UserProvider>
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
