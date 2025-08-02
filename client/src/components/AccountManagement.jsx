import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { IoIosArrowRoundBack } from 'react-icons/io'
import '../assets/styles/profile.css'

function AccountManagement({ onBack }) {
  const { user, setUser } = useContext(UserContext)

  const [editing, setEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.put('http://localhost:3001/profile/update', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('profile updated successfully')
      setEditing(false)
    } catch (err) {
      console.error(err)
      alert('Error updating profile')
    }
  }

  return (
    <div className="account-management">
      <h2>Account Management</h2>

      <label>First Name:</label>
      <input
        type="text"
        value={user.first_name}
        onChange={handleChange}
        name="first_name"
        disabled={!editing}
      />

      <label>Last Name:</label>
      <input
        type="text"
        value={user.last_name}
        onChange={handleChange}
        name="last_name"
        disabled={!editing}
      />

      <label>Email:</label>
      <input
        type="email"
        value={user.email}
        onChange={handleChange}
        name="email"
        disabled={!editing}
      />

      <label>Username:</label>
      <input
        type="text"
        value={user.username}
        onChange={handleChange}
        name="username"
        disabled={!editing}
      />

      <label>Phone Number:</label>
      <input
        type="text"
        value={user.phone_number}
        onChange={handleChange}
        name="phone_number"
        disabled={!editing}
      />

      <div className="button-group">
        {editing ? (
          <>
            <button onClick={handleSave}>save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onBack()
        }}
      >
        <IoIosArrowRoundBack /> Back to Profile
      </a>
    </div>
  )
}

export default AccountManagement
