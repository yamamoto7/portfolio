import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({src, className, alt}) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              publicURL
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}

    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(src);
      });
      if (!image) { return null; }
      console.log(image)
      if (src.includes('svg')) {
        return (
          <img src={image.node.publicURL} alt={alt} />
        );
      } else {
        return (
          <Img fluid={image.node.childImageSharp.fluid} alt={alt} />
        );
      }
    }}
  />
)
export default Image
