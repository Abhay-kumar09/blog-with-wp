import graphqlRequest from "./graphqlRequest"

export  async function getAllPosts() {
  const query = {
     query: `query NewQuery {
   posts(first: 20) {
    nodes {
      date
      slug
      title
      excerpt(format: RENDERED)
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          mediaDetails {
            file
            sizes {
              sourceUrl
              width
              height
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
}`
  }

  const resjson = await graphqlRequest(query)
  const allPosts = resjson.data.posts;

  return allPosts
}