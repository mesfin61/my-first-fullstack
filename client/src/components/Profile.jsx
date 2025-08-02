import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import AccountManagement from '../components/AccountManagement'
import { GrFormNext } from 'react-icons/gr'
import { TbLockPassword } from 'react-icons/tb'
import { CiLogout } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { IoIosArrowRoundBack } from 'react-icons/io'
import '../assets/styles/profile.css'

function PasswordChange({ onBack }) {
  const [userInput, setUserInput] = useState({
    password: '',
    new_password: '',
    confirm_password: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (userInput.new_password !== userInput.confirm_password) {
      alert('New passwords do not match.')
      return
    }

    try {
      setSubmitting(true)
      const token = localStorage.getItem('token')
      await axios.patch(
        'http://localhost:3001/profile/update/password',
        userInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      alert('Password changed successfully')
      setUserInput({ password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to change password')
    } finally {
      setSubmitting(false)
    }
  }

  const canEdit = userInput.password.trim() !== ''

  return (
    <div className="password-change">
      <h2>Password Change</h2>

      <p>Current Password:</p>
      <input
        type="password"
        name="password"
        value={userInput.password}
        onChange={handleChange}
      />

      <p>New Password:</p>
      <input
        type="password"
        name="new_password"
        value={userInput.new_password}
        onChange={handleChange}
        disabled={!canEdit}
      />

      <p>Confirm New Password:</p>
      <input
        type="password"
        name="confirm_password"
        value={userInput.confirm_password}
        onChange={handleChange}
        disabled={!canEdit}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleSubmit} disabled={!canEdit || submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onBack()
        }}
      >
        <IoIosArrowRoundBack /> back to profile
      </a>
    </div>
  )
}

function Profile() {
  const { user, setUser } = useContext(UserContext)
  const [showActivity, setShowActivity] = useState(false)
  const [showPasswordActivity, setShowPasswordActivity] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/' // or use navigate('/')
  }

  if (!user) return <p>Loading profile...</p>

  if (showPasswordActivity) {
    return <PasswordChange onBack={() => setShowPasswordActivity(false)} />
  }

  if (showActivity) {
    return (
      <AccountManagement
        user={user}
        setUser={setUser}
        onBack={() => setShowActivity(false)}
      />
    )
  }

  return (
    <div className="profile-info">
      <h2>User Information</h2>
      <div className="info">
        <p>User ID: {user.userId}</p>
        <p>
          Name: {user.first_name} {user.last_name}
        </p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>

      <a
        href="#"
        className="account-link"
        onClick={(e) => {
          e.preventDefault()
          setShowActivity(true)
        }}
      >
        Account Management <GrFormNext />
      </a>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setShowPasswordActivity(true)
        }}
      >
        Change Password <TbLockPassword />
      </a>

      <button onClick={handleLogout}>
        Log Out <CiLogout />
      </button>

      <button type="button">
        Delete Account <MdDelete />
      </button>
    </div>
  )
}

export default Profile
