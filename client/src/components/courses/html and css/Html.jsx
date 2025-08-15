import React, { useContext, useEffect, useState } from 'react'
import { VideosContext } from '../../../context/videosContext'
import '../../../assets/styles/courses.css'

function Html({ onBack }) {
  const { videos } = useContext(VideosContext)
  const { loading } = useContext(VideosContext)
  const [message, setMessage] = useState('')

  const htmlVideos = videos.filter((video) =>
    video.public_id?.toLowerCase().includes('html-'),
  )

  useEffect(() => {
    if (!loading && htmlVideos.length === 0) {
      setMessage('No videos available for HTML.')
    } else {
      setMessage('')
    }
  }, [videos, loading])

  return (
    <div className="video-section">
      <button className="back-button" onClick={onBack}>
        Back
      </button>

      {message && <p className="video-message">{message}</p>}

      {videos &&
        videos
          .filter((video) => video.public_id.toLowerCase().startsWith('html-'))
          .map((video, index) => (
            <div className="video-card" key={index}>
              <p>{video.public_id}</p>
              <video src={video.secure_url} />
            </div>
          ))}
    </div>
  )
}

export default Html
