import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Link } from 'react-router'
import '../assets/styles/header.css'

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">MyWay</h1>
      <div className="nav-link">
        <Link to="/home">home</Link>
        <Link to="/courses">courses</Link>
      </div>
      <div className="profile">
        <Link to="/profile">
          <AccountCircleIcon className="pro" />
        </Link>
      </div>
    </header>
  )
}
