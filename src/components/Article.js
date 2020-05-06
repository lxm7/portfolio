import React from "react";
import PropTypes from "prop-types";

import Image from "../components/Image";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Article = ({ post }) => (
  <article key={post.id} className="Grid-cell bottom5em">
    <div className="full_width">
      <h3>{post.frontmatter.title}</h3>

      <a className="image_wrap has-text-primary" href={post.frontmatter.url}>
        <Image
          key={post.id}
          className="full_width"
          src={post.frontmatter.image}
          fallbackSrc={
            "https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
          }
          // <div className="placeholder">
          //   <Loader type="TailSpin" color="gray" height={40} width={40} />
          // </div>
          isLazy
          alt={post.id}
        />
      </a>

      <p>{post.frontmatter.tags.join(" | ")}</p>
    </div>
  </article>
);

export default Article;
