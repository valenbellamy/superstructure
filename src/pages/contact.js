import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"

const ContactPage = ({ location }) => {
  const [backUrl, setBackUrl] = useState(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state) {
      setBackUrl(location.state.backUrl)
    } else {
      setBackUrl("/")
    }
  }, [location.state])

  return (
    <Layout>
      <SEO title="Contact" />
      <section className={`contact ${active ? "--active" : ""}`}>
        <Logo currentColor="#000" />
        <Link to={`${backUrl}`} className="link">
          back
        </Link>
        <div className="info">
          <p>
            Pierre Grimaux et Jean Dathanat<br></br>11 rue Amelot, 75003 Paris -
            France <br></br>contact@superstructure.tv
          </p>
          <p>
            Instagram<br></br>
            <a
              href="https://www.instagram.com/superstructure.tv/"
              target="_blank"
              rel="noreferrer noopener"
            >
              @superstructure.tv
            </a>
          </p>
          <p className="--small">
            Design by{" "}
            <a
              href="https://studiomitsu.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Studio Mitsu
            </a>
            <br></br>Code by{" "}
            <a
              href="https://valentinbellamy.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Valentin Bellamy
            </a>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage
