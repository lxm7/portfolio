import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// Components
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Article from "../components/Article";

// Hooks
import { useIntersectionObserver } from "../components/useIntersectionObserver";

const IndexPage = ({ data }) => {
  // Fetch data
  const { edges: posts } = data.allMarkdownRemark;

  // Set options for grid (disabled currently via minimal CSS)
  const rows = [...Array(Math.ceil(posts.length / 4))];
  const postRows = rows.map((_, idx) => posts.slice(idx * 4, idx * 4 + 4));

  // Fetch and sets entries when they are being observed
  const [observer, setElements, entries] = useIntersectionObserver({
    threshold: 0.8,
    root: document.querySelector("#root"), // useRef
  });

  // Collect all elements with `lazy` className for intersection
  useEffect(() => {
    if (posts.length) {
      let img = Array.from(document.getElementsByClassName("lazy")); // useRef
      setElements(img);
    }
  }, [posts, setElements]);

  // Here we actually load/set the data src once in view. We know this from
  // the useIntersectionObserver hook. Once in View, remove class and observing.
  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    });
  }, [entries, observer]);

  return (
    <Layout id="root">
      <h2>Recent work</h2>
      <section className="section">
        {postRows.map((
          row,
          idx // Remove large-Grid--fit styles, show lazy load single col instead
        ) => (
          <div key={idx}>
            {row.map(({ node: post }) => (
              <Article key={post.id} post={post} />
            ))}
          </div>
        ))}
      </section>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default IndexPage;

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
