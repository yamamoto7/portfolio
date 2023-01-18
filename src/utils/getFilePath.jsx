import { useStaticQuery, graphql } from 'gatsby';

export default (src) => {
    const data = useStaticQuery(graphql`
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

    const file = data.images.edges.find((name) => {
        return name.node.relativePath.includes(src);
    });
    if (!file) {
        return null;
    }

    // console.log(file.node.publicURL);
    return file.node.publicURL;
};
