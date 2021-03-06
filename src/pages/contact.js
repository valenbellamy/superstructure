import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/logo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query {
    contentfulContact {
      contenuTexte {
        json
      }
    }
  }
`
const ContactPage = ({ location, data }) => {
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
          retour
        </Link>
        <div className="info">
          {/* <p>{data.contentfulContact.contenu.contenu}</p> */}
          <div className="rich-content">
            {documentToReactComponents(
              data.contentfulContact.contenuTexte.json
            )}
          </div>
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
            Design par{" "}
            <a
              href="https://studiomitsu.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Studio Mitsu
            </a>
            <br></br>Code par{" "}
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
