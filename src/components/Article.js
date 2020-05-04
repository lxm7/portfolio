import React from "react";
import Img from "react-image";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Article = ({ post }) => (
  <article key={post.id} className="Grid-cell content">
    <div style={{ width: "100%" }}>
      <h3>{post.frontmatter.title}</h3>

      <a className="image_wrap has-text-primary" href={post.frontmatter.url}>
        <Img
          style={{ width: "100%" }}
          src={post.frontmatter.image}
          loader={
            <div
              style={{
                width: "100%",
                minHeight: "190px",
                background: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader type="TailSpin" color="gray" height={40} width={40} />
            </div>
          }
          unloader={
            <div
              style={{
                width: "100%",
                minHeight: "150px",
                background: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          }
        />
      </a>

      <p>{post.frontmatter.tags.join(" | ")}</p>
    </div>
  </article>
);

export default Article;
