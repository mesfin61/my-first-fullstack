import React, { useContext, useEffect, useState } from 'react'
import { VideosContext } from '../../../context/videosContext'
import '../../../assets/styles/courses.css'

function Nodejs({ onBack }) {
  const { videos } = useContext(VideosContext)
  const { loading } = useContext(VideosContext)
  const [message, setMessage] = useState('')

  const mssqlVideos = videos.filter((video) =>
    video.public_id?.toLowerCase().startsWith('nodejs-'),
  )

  useEffect(() => {
    if (!loading && mssqlVideos.length === 0) {
      setMessage('No videos available for Node js.')
    } else {
      setMessage('')
    }
  }, [videos, loading])

  return (
    <div className="video-section">
      <button className="back-button" onClick={onBack}>
        back
      </button>

      {message && <p className="video-message">{message}</p>}

      <div className="video-grid">
        {videos &&
          videos
            .filter((video) =>
              video.public_id.toLowerCase().startsWith('nodejs-'),
            )
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

export default Nodejs
