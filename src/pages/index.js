import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    const rows = [...Array( Math.ceil(posts.length / 4) )];
    const postRows = rows.map( (_, idx) => posts.slice(idx * 4, idx * 4 + 4) );

    return (
      <Layout>
        {
          <section className="section">
            {postRows.map((row, idx) => (
              <div className="Grid Grid--gutters Grid--full large-Grid--fit" key={idx}>    
                {row.map(({node: post}) =>
                  <article key={post.id} className="Grid-cell content">
                    <div style={{width: '100%'}}>
                      <h3>{post.frontmatter.title}</h3>

                      <a className="image_wrap has-text-primary" href={post.frontmatter.url}>
                        <img src={post.frontmatter.image} alt='' />
                      </a>

                      <p>{post.frontmatter.tags.join(' | ')}</p>
                    </div>
                  </article>  
                )}
              </div>
            ))}
          </section>
        }
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
            url
            tags
          }
        }
      }
    }
  }
`
