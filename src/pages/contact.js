import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"

const ContactPage = ({ location }) => {
  console.log(location.state.backUrl)
  return (
    <Layout>
      <SEO title="Contact" />
      <section className="contact">
        <div className="logo">
          <Logo currentColor="#000" />
        </div>
        {/* <button
          type="button"
          onClick={() => {
            typeof history !== "undefined" && history.go(-1)
          }}
        >
          back
        </button> */}
        <Link to={`${location.state.backUrl}`}>back</Link>
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
