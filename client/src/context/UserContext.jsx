import axios from 'axios'
import { useEffect, useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile')
        const users = response.data.result
        setUser(users[0])
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
