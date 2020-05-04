import React from "react";
import Img from "react-image";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Article = ({ post }) => (
  <article key={post.id} className="Grid-cell bottom5em">
    <div className="full_width">
      <h3>{post.frontmatter.title}</h3>

      <a className="image_wrap has-text-primary" href={post.frontmatter.url}>
        <Img
          className="full_width"
          src={post.frontmatter.image}
          loader={
            <div className="placeholder">
              <Loader type="TailSpin" color="gray" height={40} width={40} />
            </div>
          }
          unloader={<div className="placeholder" />}
        />
      </a>

      <p>{post.frontmatter.tags.join(" | ")}</p>
    </div>
  </article>
);

export default Article;
