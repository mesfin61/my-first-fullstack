import axios from 'axios'
import { useEffect, useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const users = response.data.result
        if (users && users.length > 0) {
          setUser(users[0])
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        localStorage.removeItem('token')
        setUser({})
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
