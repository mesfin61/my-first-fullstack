import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import {} from 'react-router-dom'

export const VideosContext = createContext()

export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get('http://localhost:3000/videos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const video = response.data.videos
        setVideos(Array.isArray(video) ? video : [])
      } catch (err) {
        console.error('Error fetching videos', err)
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <VideosContext.Provider value={{ videos, setVideos, loading }}>
      {children}
    </VideosContext.Provider>
  )
}
