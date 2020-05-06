import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";

import "intersection-observer";

// Components
import Layout from "../components/Layout";
import Article from "../components/Article";

const Horizontal = styled.div`
  display: flex;
`;

const Navigation = styled.nav`
  margin: 30px;
`;

const ScrollArea = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

const Anchor = styled.a`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  ${(props) =>
    props.selected
      ? css`
          border-bottom: 1px solid #000;
          font-weight: bold;
        `
      : null};
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();

    this.state = {
      activeThing: { id: null, ratio: 0 },
    };

    this.singleRefs = this.props.data.allMarkdownRemark.edges.reduce(
      (acc, value) => {
        acc[value.node.id] = {
          ref: React.createRef(),
          id: value.node.id,
          ratio: 0,
        };

        return acc;
      },
      {}
    );

    const callback = (entries) => {
      entries.forEach((entry) => {
        return (this.singleRefs[entry.target.id].ratio =
          entry.intersectionRatio);
      });

      const activeThing = Object.values(this.singleRefs).reduce(
        (acc, value) => (value.ratio > acc.ratio ? value : acc),
        this.state.activeThing
      );

      if (activeThing.ratio > this.state.activeThing.ratio) {
        this.setState({ activeThing });
      }
    };

    this.observer = new IntersectionObserver(callback, {
      root: this.rootRef.current,
      threshold: new Array(101).fill(0).map((v, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.singleRefs).forEach((value) =>
      this.observer.observe(value.ref.current)
    );
  }
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout id="root">
        <h2>Recent work</h2>
        <Horizontal>
          <Navigation>
            {this.props.data.allMarkdownRemark.edges.map((post) => (
              <div key={post.node.id}>
                <Anchor
                  href={`#${post.node.id}`}
                  selected={post.node.id === this.state.activeThing.id}
                >
                  {post.node.frontmatter.title}
                </Anchor>
              </div>
            ))}
          </Navigation>

          <ScrollArea ref={this.rootRef}>
            {posts.map((post) => (
              <div
                key={post.node.id}
                id={post.node.id}
                ref={this.singleRefs[post.node.id].ref}
              >
                <Article
                  key={post.node.id}
                  post={post}
                  selected={post.node.id !== this.state.activeThing.id}
                />
              </div>
            ))}
          </ScrollArea>
        </Horizontal>
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
