import React, { FunctionComponent } from "react";
import { StaticQuery, graphql } from "gatsby";
import Img, { GatsbyImageProps } from "gatsby-image";

interface ImageProps {
  src: string;
  className?: string;
  alt: string;
}

const Image: FunctionComponent<ImageProps> = ({ src, className, alt }) => {
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
        const image = data.images.edges.find(
          (n: { node: { relativePath: string | string[] } }) => {
            return n.node.relativePath.includes(src);
          }
        );
        if (!image) {
          return null;
        }
        if (src.includes("svg")) {
          return (
            <img className={className} src={image.node.publicURL} alt={alt} />
          );
        }
        const imageProps: GatsbyImageProps = {
          className,
          fluid: image.node.childImageSharp.fluid,
          alt,
        };
        return <Img {...imageProps} />;
      }}
    />
  );
};
export default Image;
