import React, { useContext, useEffect, useState } from 'react'
import { VideosContext } from '../../../context/videosContext'
import '../../../assets/styles/courses.css'

function Sql() {
  const { videos } = useContext(VideosContext)
  const { loading } = useContext(VideosContext)
  const [message, setMessage] = useState('')

  const mssqlVideos = videos.filter((video) =>
    video.public_id?.toLowerCase().includes('sql-'),
  )

  useEffect(() => {
    if (!loading && mssqlVideos.length === 0) {
      setMessage('No videos available for SQL.')
    } else {
      setMessage('')
    }
  }, [videos, loading])

  return (
    <div className="video-section">
      {message && <p className="video-message">{message}</p>}

      <div className="video-grid">
        {videos &&
          videos
            .filter((video) => video.public_id.toLowerCase().startsWith('sql'))
            .map((video, index) => (
              <div className="video-card" key={index}>
                <p>{video.public_id}</p>
                <video src={video.secure_url} controls />
              </div>
            ))}
      </div>
    </div>
  )
}

export default Sql
