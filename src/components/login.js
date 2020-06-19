import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

const Login = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulProjetPrive(ordre: { eq: 1 }) {
        slug
      }
    }
  `)

  const [state, setState] = useState({ username: "", password: "" })

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/prive/${data.contentfulProjetPrive.slug}`)
    }
  }, [])

  const handleUpdate = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleLogin(state)
    navigate(`/prive/${data.contentfulProjetPrive.slug}`)
  }

  return (
    <div className="form__wrapper">
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Identifiant</label>
          <input
            id="username"
            type="text"
            value={state.username || ""}
            name="username"
            onChange={handleUpdate}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="text"
            value={state.password || ""}
            name="password"
            onChange={handleUpdate}
          />
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  )
}

export default Login
