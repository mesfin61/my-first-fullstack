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

function PasswordChange({ onBack, setSuccessMessage }) {
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
      const response = await axios.put(
        'http://localhost:3000/profile/update/password',
        userInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.message === 'password update') {
        setSuccessMessage('Password updated successfully.')
        setTimeout(() => {
          onBack()
        }, 1500)
      }

      setUserInput({ password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      console.error(err)
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

function DeleteAccount({ onBack }) {
  const [message, setMessage] = useState('')

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(
        'http://localhost:3000/profile/delete',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.message === 'Account deleted successfully') {
        setMessage('Account deleted successfully. Redirecting to home...')
        localStorage.removeItem('token')
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete account')
    }
  }

  return (
    <div className="delete-account">
      <h2>Are sure you want to delete the account</h2>
      <p>once you delete account you will not get access to this account</p>

      <div className="delete-button">
        <button type="button" onClick={handleDelete} defaultChecked>
          yes
        </button>
        <button onClick={onBack} type="button">
          no
        </button>
      </div>
    </div>
  )
}

function Profile() {
  const { user, setUser } = useContext(UserContext)
  const [showActivity, setShowActivity] = useState(false)
  const [showPasswordActivity, setShowPasswordActivity] = useState(false)
  const [showDeleteActivity, setShowDeleteActivity] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/'
  }

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  if (showPasswordActivity) {
    return (
      <PasswordChange
        onBack={() => setShowPasswordActivity(false)}
        setSuccessMessage={setSuccessMessage}
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

  if (showDeleteActivity) {
    return <DeleteAccount onBack={() => setShowDeleteActivity(false)} />
  }

  return (
    <div className="profile-info">
      <h2>User Information</h2>

      {successMessage && (
        <p
          className="success-message"
          style={{ color: 'green', marginBottom: '10px' }}
        >
          {successMessage}
        </p>
      )}

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

      <button
        onClick={() => {
          setShowDeleteActivity(true)
        }}
        type="button"
      >
        Delete Account <MdDelete />
      </button>
    </div>
  )
}

export default Profile
