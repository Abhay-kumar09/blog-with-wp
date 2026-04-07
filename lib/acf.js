import graphqlRequest from "./graphqlRequest"

export async function getContact(slug) {
  const query = {
    query: `
        query getContact($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                id
                title
                contactType {
                    email
                    contact
                    embed
                }
            }
        }`,
    variables: {
      slug
    }
  };

  const resJson = await graphqlRequest(query);
  return resJson.data.post;
}

export async function getSections(slug) {
  const tryQueries = [
    `query GetSections {
      page(id: "${slug}", idType: SLUG) {
        title
        slug
        pageSections {
          pageSections {
            __typename
            ... on PageSectionsPageSectionsBannerSecondLayout {
              title
              description
              backgroundImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    `query GetSectionsByURI {
      page(id: "/${slug}/", idType: URI) {
        title
        uri
        pageSections {
          pageSections {
            __typename
            ... on PageSectionsPageSectionsBannerSecondLayout {
              title
              description
              backgroundImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    `query GetSectionsByFilter {
      pages(where: { name: "${slug}" }) {
        nodes {
          title
          slug
          pageSections {
            pageSections {
              __typename
              ... on PageSectionsPageSectionsBannerSecondLayout {
                title
                description
                backgroundImage {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }`
  ];

  for (const q of tryQueries) {
    try {
      const resJson = await graphqlRequest({ query: q });
      if (!resJson || !resJson.data) continue;
      
      if (resJson.data.page) {
        return resJson.data.page;
      }
      
      if (resJson.data.pages && Array.isArray(resJson.data.pages.nodes) && resJson.data.pages.nodes.length) {
        return resJson.data.pages.nodes[0];
      }
    } catch (e) {
      console.warn("getSections query attempt failed", e);
    }
  }

  return null;
}