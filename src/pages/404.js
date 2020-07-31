import React from "react"
import { graphql } from "gatsby"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <>
      <h1>{siteTitle} Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist at {location?.pathname}</p>
    </>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
