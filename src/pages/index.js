import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Article from "../components/Article";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const rows = [...Array(Math.ceil(posts.length / 4))];
    const postRows = rows.map((_, idx) => posts.slice(idx * 4, idx * 4 + 4));

    return (
      <Layout>
        <h2>Recent work</h2>
        <section className="section">
          {postRows.map((
            row,
            idx // Remove large-Grid--fit styles, show lazy load single col instead
          ) => (
            <div key={idx}>
              {row.map(({ node: post }) => (
                <Article post={post} />
              ))}
            </div>
          ))}
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
`;
