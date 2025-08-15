import React, { useState } from 'react'
import '../assets/styles/courses.css'
import Css from './courses/html and css/Css'
import Html from './courses/html and css/Html'
import Sql from './courses/database/Sql'
import Reacts from './courses/javascipt/React'
import Nodejs from './courses/javascipt/Nodejs'
import Express from './courses/javascipt/Express'

function Courses() {
  const [ShowHtmlActivity, setShowHtmlActivity] = useState(false)
  const [ShowJavascriptActivity, setShowJavascriptActivity] = useState(false)
  const [ShowDatabaseActivity, setShowDatabaseActivity] = useState(false)

  if (ShowHtmlActivity) {
    return (
      <HtmlVideos
        onBack={() => {
          setShowHtmlActivity(false)
        }}
      />
    )
  }

  if (ShowJavascriptActivity) {
    return (
      <JavascriptVideos
        onBack={() => {
          setShowJavascriptActivity(false)
        }}
      />
    )
  }

  if (ShowDatabaseActivity) {
    return (
      <DatabaseVideos
        onBack={() => {
          setShowDatabaseActivity(false)
        }}
      />
    )
  }

  return (
    <div className="courses-container">
      <a
        className="course-link"
        onClick={() => {
          setShowHtmlActivity(true)
        }}
      >
        Learn HTML and CSS for free
      </a>

      <a
        className="course-link"
        onClick={() => {
          setShowJavascriptActivity(true)
        }}
      >
        Learn JavaScript for free
      </a>

      <a
        className="course-link"
        onClick={() => {
          setShowDatabaseActivity(true)
        }}
      >
        Learn SQL and MySQL for free
      </a>
    </div>
  )
}

export default Courses

function HtmlVideos({ onBack }) {
  const [showCssActivity, setShowCssActivity] = useState(false)
  const [ShowHtmlActivity, setShowHtmlActivity] = useState(false)

  if (showCssActivity) {
    return (
      <Css
        onBack={() => {
          setShowCssActivity(false)
        }}
      />
    )
  }

  if (ShowHtmlActivity) {
    return (
      <Html
        onBack={() => {
          setShowHtmlActivity(false)
        }}
      />
    )
  }

  return (
    <div className="video-container">
      <button className="back-button" onClick={onBack}>
        Back
      </button>

      <div className="button-container">
        <button onClick={() => setShowCssActivity(true)}>CSS Videos</button>
        <button onClick={() => setShowHtmlActivity(true)}>HTML Videos</button>
      </div>
    </div>
  )
}

function JavascriptVideos({ onBack }) {
  const [showReactActivity, setShowReactActivity] = useState(false)
  const [showExpressActivity, setShowExpressActivity] = useState(false)
  const [showNodeActivity, setShowNodeActivity] = useState(false)

  if (showReactActivity) {
    return (
      <Reacts
        onBack={() => {
          setShowReactActivity(false)
        }}
      />
    )
  }

  if (showNodeActivity) {
    return (
      <Nodejs
        onBack={() => {
          setShowNodeActivity(false)
        }}
      />
    )
  }

  if (showExpressActivity) {
    return (
      <Express
        onBack={() => {
          setShowExpressActivity(false)
        }}
      />
    )
  }

  return (
    <div className="video-container">
      <button className="back-button" onClick={onBack}>
        Back
      </button>

      <div className="button-container">
        <button onClick={() => setShowReactActivity(true)}>React Videos</button>
        <button onClick={() => setShowNodeActivity(true)}>
          Node js Videos
        </button>
        <button onClick={() => setShowExpressActivity(true)}>
          Express js Videos
        </button>
      </div>
    </div>
  )
}

function DatabaseVideos({ onBack }) {
  return (
    <div className="video-container">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <Sql />
    </div>
  )
}
