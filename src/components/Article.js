import React from "react";
import PropTypes from "prop-types";

import Image from "../components/Image";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Article = ({ post, selected }) => (
  <article key={post.id} className="Grid-cell bottom5em">
    <div className="full_width">
      <h3>{post.node.frontmatter.title}</h3>

      <a
        className="image_wrap has-text-primary"
        href={post.node.frontmatter.url}
      >
        <Image
          key={post.node.id}
          className="full_width"
          src={post.node.frontmatter.image}
          fallbackSrc={
            "https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
          }
          // <div className="placeholder">
          //   <Loader type="TailSpin" color="gray" height={40} width={40} />
          // </div>
          isLazy={selected}
          alt={post.node.frontmatter.title}
        />
        {/* <img
          src={post.node.frontmatter.image}
          alt={post.node.frontmatter.title}
        /> */}
      </a>

      <p>{post.node.frontmatter.tags.join(" | ")}</p>
    </div>
  </article>
);

export default Article;
