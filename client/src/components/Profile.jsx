import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/usercontext'
import axios from 'axios'
import AccountManagement from '../components/AccountManagement'
import { GrAlert, GrFormNext } from 'react-icons/gr'
import { TbLockPassword } from 'react-icons/tb'
import { CiLogout } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { IoIosArrowRoundBack } from 'react-icons/io'
import '../assets/styles/profile.css'

function PasswordChange({ onBack }) {
  const [user, setUser] = useState({
    password: '',
    new_password: '',
    confirm_password: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (user.new_password !== user.confirm_password) {
      alert('New passwords do not match.')
      return
    }

    try {
      setSubmitting(true)
      await axios.patch('http://localhost:3001/profile/update/password', user)
      alert('Password changed successfully')
      setUser({ password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      console.error(err)
      alert('Failed to change password')
    } finally {
      setSubmitting(false)
    }
  }

  const canEdit = user.password.trim() !== ''

  return (
    <div className="password-change">
      <h2>Password Change</h2>

      <p>Current Password:</p>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />

      <p>New Password:</p>
      <input
        type="password"
        name="new_password"
        value={user.new_password}
        onChange={handleChange}
        disabled={!canEdit}
      />

      <p>Confirm New Password:</p>
      <input
        type="password"
        name="confirm_password"
        value={user.confirm_password}
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

  if (showPasswordActivity) {
    return (
      <PasswordChange
        user={user}
        setUser={setUser}
        onBack={() => setShowPasswordActivity(false)}
      />
    )
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
      <h2>user information</h2>
      <div className="info">
        <p>user id: {user.userId}</p>
        <p>
          Name: {user.first_name} {user.last_name}{' '}
        </p>
        <p>Email: {user.email} </p>
        <p>username: {user.username} </p>
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
        Change password <TbLockPassword />{' '}
      </a>
      <button>
        Log Out <CiLogout />{' '}
      </button>
      <button type="button">
        Delete Account <MdDelete />{' '}
      </button>
    </div>
  )
}

export default Profile
