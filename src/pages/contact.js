import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"

const ContactPage = ({ location }) => {
  const [backUrl, setBackUrl] = useState(null)
  useEffect(() => {
    if (location.state) {
      setBackUrl(location.state.backUrl)
    } else {
      setBackUrl("/")
    }
  }, [])
  return (
    <Layout>
      <SEO title="Contact" />
      <section className="contact">
        <Logo currentColor="#000" />
        {/* <button
          type="button"
          onClick={() => {
            typeof history !== "undefined" && history.go(-1)
          }}
        >
          back
        </button> */}
        <Link to={`${backUrl}`}>back</Link>
        <div>
          <p>
            Pierre Grimaux et Jean Dathanat<br></br>11 rue Amelot, 75003 Paris -
            France <br></br>contact@superstructure.tv
          </p>
          <p>
            Instagram<br></br>
            <a href="#" target="_blank" rel="noreferrer noopener">
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
