const path = require("path")

module.exports.createPages = async ({ graphql, page, actions }) => {
  const { createPage } = actions
  const projetTemplate = path.resolve("./src/templates/projet.js")
  const projetPrivateTemplate = path.resolve("./src/templates/private.js")

  const res = await graphql(`
    query {
      allContentfulProjet(
        filter: { accueil: { ne: true } }
        sort: { fields: ordre, order: ASC }
      ) {
        edges {
          node {
            slug
            slider {
              couleur
            }
          }
        }
      }
      contentfulProjet(accueil: { eq: true }) {
        slider {
          couleur
        }
      }
      allContentfulProjetPrive(sort: { fields: ordre, order: ASC }) {
        edges {
          node {
            slug
            slider {
              couleur
            }
          }
        }
      }
    }
  `)

  const projects = res.data.allContentfulProjet.edges
  const home = res.data.contentfulProjet
  projects.forEach((edge, index) => {
    createPage({
      component: projetTemplate,
      path: `/projet/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        prevColor:
          index === 0
            ? home.slider[0].couleur
            : projects[index - 1].node.slider[0].couleur,
        nextColor:
          index === projects.length - 1
            ? home.slider[0].couleur
            : projects[index + 1].node.slider[0].couleur,
        prevSlug: index === 0 ? "" : projects[index - 1].node.slug,
        nextSlug:
          index === projects.length - 1 ? "" : projects[index + 1].node.slug,
      },
    })
  })

  const privateProjects = res.data.allContentfulProjetPrive.edges
  privateProjects.forEach((edge, index) => {
    createPage({
      component: projetPrivateTemplate,
      path: `/prive/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        prevColor:
          index === 0
            ? privateProjects[privateProjects.length - 1].node.slider[0].couleur
            : privateProjects[index - 1].node.slider[0].couleur,
        nextColor:
          index === privateProjects.length - 1
            ? privateProjects[0].node.slider[0].couleur
            : privateProjects[index + 1].node.slider[0].couleur,
        prevSlug:
          index === 0
            ? privateProjects[privateProjects.length - 1].node.slug
            : privateProjects[index - 1].node.slug,
        nextSlug:
          index === privateProjects.length - 1
            ? privateProjects[0].node.slug
            : privateProjects[index + 1].node.slug,
      },
    })
  })
}
