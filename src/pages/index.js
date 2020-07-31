import React from "react"
import { graphql } from "gatsby"

import styles from "./blogIndex.module.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteSummary = data.site.siteMetadata.author.summary
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark?.edges

  return (
    <div className={styles.postList}>
      <h2>{siteTitle}</h2>
      <h3>{siteSummary}</h3>
      <h4>{siteDescription}</h4>
      <div className={styles.spacer}>
        <a className={styles.navbarItem} href="https://github.com/lxm7">
          Github
        </a>
        <a
          className={styles.navbarItem}
          href="https://www.linkedin.com/in/alex-moreton-3519633b/"
        >
          LinkedIn
        </a>
        <a
          className={styles.navbarItem}
          href="https://stackoverflow.com/users/1341935/lxm7?tab=profile"
        >
          Stackoverflow
        </a>
      </div>
      {posts.map(({ node }, i) => {
        return (
          <div key={i} className={styles.spacer}>
            <a href={node.fields.slug} className={styles.title}>
              {node.frontmatter.title}
            </a>
            <a href={node.frontmatter.url} className={styles.imgWrap}>
              <img
                src={node.frontmatter?.image?.publicURL}
                alt={node.frontmatter?.image?.absolutePath}
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          summary
        }
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date
            description
            image {
              id
              publicURL
              absolutePath
            }
            url
          }
        }
      }
    }
  }
`
