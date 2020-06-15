const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projetTemplate = path.resolve("./src/templates/projet.js")

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
    }
  `)
  const projects = res.data.allContentfulProjet.edges
  const home = res.data.contentfulProjet
  projects.forEach((edge, index) => {
    console.log(home.slider.couleur)
    createPage({
      component: projetTemplate,
      path: `/projet/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        // prevColor: "#098765",
        // nextColor: "#123456",
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
        // prev:
        //   index === 0
        //     ? projects[projects.length - 1].node
        //     : projects[index - 1].node,
        // next:
        //   index === projects.length - 1
        //     ? projects[0].node
        //     : projects[index + 1].node,
      },
    })
  })
}
