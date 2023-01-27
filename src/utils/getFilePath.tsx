import { useStaticQuery, graphql } from "gatsby";

interface ImageData {
  relativePath: string;
  name: string;
  publicURL: string;
  childImageSharp: {
    fixed: {
      src: string;
    };
  };
}

interface ImageEdge {
  node: ImageData;
}

interface ImagesData {
  edges: ImageEdge[];
}

interface QueryData {
  images: ImagesData;
}

const getFilePath = (src: string) => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            publicURL
            childImageSharp {
              fixed {
                src
              }
            }
          }
        }
      }
    }
  `);

  const file = data.images.edges.find((edge) => {
    return edge.node.relativePath.includes(src);
  });
  if (!file) {
    return "";
  }

  return file.node.publicURL;
};

export default getFilePath;
