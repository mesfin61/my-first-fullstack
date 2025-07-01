// import React, { useState } from 'react';
// import '../assets/styles/signup.css';

// function SignUp({ switchForm }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { username, email, password, confirmPassword } = formData;

//     if (!username || !email || !password || !confirmPassword) {
//       setMessage('All fields are required!');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match!');
//       return;
//     }

//     // Simulate API call / registration
//     setMessage('Creating account...');
//     setTimeout(() => {
//       setMessage('Account created successfully!');
//       setTimeout(() => {
//         setMessage('');
//         switchForm(); // Switch to login form after success
//       }, 1000);
//     }, 1500);
//   };

//   return (
//     <div className="signup-container">
      // <h2>SIGN UP</h2>
      // {message && (
      //   <p className={`message ${message.includes('successfully') ? '' : 'error'}`}>
      //     {message}
      //   </p>
      // )}
//       <form className="cyber-form" onSubmit={handleSubmit}>
//         <div className="input-group">
        //   <input
        //     type="text"
        //     name="username"
        //     value={formData.username}
        //     onChange={handleChange}
        //     placeholder="USERNAME"
        //     className="cyber-input"
        //   />
        //   <span className="input-highlight"></span>
        // </div>

        // <div className="input-group">
        //   <input
        //     type="email"
        //     name="email"
        //     value={formData.email}
        //     onChange={handleChange}
        //     placeholder="E-MAIL"
        //     className="cyber-input"
        //   />
        //   <span className="input-highlight"></span>
        // </div>

        // <div className="input-group">
        //   <input
        //     type="password"
        //     name="password"
        //     value={formData.password}
        //     onChange={handleChange}
        //     placeholder="PASSWORD"
        //     className="cyber-input"
        //   />
        //   <span className="input-highlight"></span>
        // </div>

        // <div className="input-group">
        //   <input
        //     type="password"
        //     name="confirmPassword"
        //     value={formData.confirmPassword}
        //     onChange={handleChange}
        //     placeholder="CONFIRM PASSWORD"
        //     className="cyber-input"
        //   />
        //   <span className="input-highlight"></span>
        // </div>

//         <button type="submit" className="cyber-button">
//           <span className="cyber-button-text">SIGN UP</span>
//           <span className="cyber-button-glitch"></span>
//           <span className="cyber-button-tag">R25</span>
//         </button>

        // <p style={{ marginTop: '1rem' }}>
        //   Already have an account?{' '}
        //   <span onClick={switchForm} className="cyber-switch-link" style={{ color: 'blue', cursor: 'pointer' }}>
        //     Login
        //   </span>
        // </p>
//       </form>
//     </div>
//   );
// }

// export default SignUp;



import React, {useState} from 'react'
import '../assets/styles/signup.css';
import axios from 'axios';

function SignUp({switchForm}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(false);
    setError(false);
    try{
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      const message = response.data.message?.toLowerCase();
      if (message === 'sign up successful') {
        setMessage('Account created successfully! redirecting to login...');
        setError(false);
        setTimeout(() => {
          switchForm();
        }, 1500);
      } else {
        setMessage(response.data.message || 'unexpected response from server');
        setError(true);
      }
    }
    catch(err) {
      const errorMessage = err.response?.data?.message || 'An error occured during sign up';
      setMessage(errorMessage);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
        <h2>SIGN UP</h2>
        {message && (
          <p className={`message ${message.includes('successfully') ? '' : 'error'}`}>
            {message}
          </p>
        )}
        <form className="cyber-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="FIRST NAME"
              className="cyber-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="LAST NAME"
              className="cyber-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="USERNAME"
              className="cyber-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-MAIL"
              className="cyber-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="input-group">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="PHONE NUMBER"
                className="cyber-input"
              />
              <span className="input-highlight"></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="PASSWORD"
                className="cyber-input"
              />
              <span className="input-highlight"></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="CONFIRM PASSWORD"
                className="cyber-input"
              />
              <span className="input-highlight"></span>
            </div>

            <button type="submit" className="cyber-button">
              <span className="cyber-button-text">SIGN UP</span>
              <span className="cyber-button-glitch"></span>
          </button>

          
          <p style={{ marginTop: '1rem' }}>
            Already have an account?{' '}
            <span onClick={switchForm} className="cyber-switch-link" style={{ color: 'blue', cursor: 'pointer' }}>
              Login
            </span>
          </p>
        </form>
    </div>
  )
}

export default SignUp;