import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/login.css'

function Login({switchForm}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] =useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));
  }

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      const message = response.data.message?.toLowerCase();
      if (message === 'login successful') {
        setMessage('logged in successfully!');
        setTimeout (() => {
          navigate('home')
        }, 1500)
        
        setError(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setError(true);
      setLoading(false);
    }
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p className='message'>{message}</p> }
      <form onSubmit={handleSubmit} className='login-form'>
        <label>Email</label>
        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />

        <label>Password</label>
        <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />

        <p> Don't have an account?
          <span onClick={switchForm} style={{ color: 'blue', cursor: 'pointer' }} >Sign up</span>
        </p>
        <button type='submit'>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login;