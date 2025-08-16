import axios from 'axios'
import { createContext, useEffect, useState, useContext } from 'react'
import { UserContext } from './UserContext'

export const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem('token')
      if (!token || !user) {
        setVideos([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`${url}/videos`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const fetchedVideos = response.data.videos
        setVideos(Array.isArray(fetchedVideos) ? fetchedVideos : [])
      } catch (err) {
        console.error('Error fetching videos', err)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [user, url])

  return (
    <VideosContext.Provider value={{ videos, setVideos, loading }}>
      {children}
    </VideosContext.Provider>
  )
}
