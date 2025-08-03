import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/styles/login.css'
import { UserContext } from '../context/UserContext'

function Login({ switchForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError(false)
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        formData,
      )
      console.log('Login response:', response.data)

      const message = response.data.message?.toLowerCase()
      if (message === 'login successfully') {
        const token = response.data.token

        if (token) {
          localStorage.setItem('token', token)

          const profileRes = await axios.get('http://localhost:3000/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          const userData = profileRes.data.result[0]
          setUser(userData)
        }

        setMessage('Logged in successfully!')
        setError(false)
        setLoading(false)
        navigate('/home', { replace: true })
      }
    } catch (err) {
      console.error('Login error:', err)
      setMessage(err.response?.data?.message || 'Login failed')
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && (
        <p className={`message ${error ? 'error' : 'success'}`}>{message}</p>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <p>
          Don&apos;t have an account?{' '}
          <span
            onClick={switchForm}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            Sign up
          </span>
        </p>

        <button type="submit">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login
