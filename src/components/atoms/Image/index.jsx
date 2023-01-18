import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

function Image({ src, className, alt }) {
    return (
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
                const image = data.images.edges.find((n) => {
                    return n.node.relativePath.includes(src);
                });
                if (!image) {
                    return null;
                }
                if (src.includes('svg')) {
                    return (
                        <img className={className} src={image.node.publicURL} alt={alt} />
                    );
                }
                return (
                    <Img className={className} fluid={image.node.childImageSharp.fluid} alt={alt} />
                );
            }}
        />
    );
}
export default Image;
