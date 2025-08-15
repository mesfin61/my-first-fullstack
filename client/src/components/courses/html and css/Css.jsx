import React, { useContext, useEffect, useState } from 'react'
import { VideosContext } from '../../../context/videosContext'
import '../../../assets/styles/courses.css'

function Css({ onBack }) {
  const { videos, loading } = useContext(VideosContext)
  const [message, setMessage] = useState('')

  const cssVideos = videos.filter((video) =>
    video.public_id?.toLowerCase().includes('css'),
  )

  useEffect(() => {
    if (!loading && cssVideos.length === 0) {
      setMessage('No videos available for CSS.')
    } else {
      setMessage('')
    }
  }, [cssVideos, loading])

  return (
    <div className="video-section">
      <button className="back-button" onClick={onBack}>
        back
      </button>

      {message && <p className="video-message">{message}</p>}

      <div className="video-grid">
        {cssVideos.map((video, index) => (
          <div className="video-card" key={index}>
            <p>{video.public_id}</p>
            <video src={video.secure_url} controls />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Css
