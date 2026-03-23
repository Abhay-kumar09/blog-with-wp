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

export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost {
  post(id: "${slug}", idType: SLUG) {
    content(format: RENDERED)
    excerpt(format: RENDERED)
    modified
    slug
    title(format: RENDERED)
    featuredImage {
      node {
        mediaDetails {
          sizes {
            sourceUrl
            width
            height
          }
        }
      }
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

  const resJson = await graphqlRequest(query);
  const singlePost = resJson.data.post;

  return singlePost
}

export async function getPostSlugs() {
  const query = {
    query: `query getPostSlugs {
  posts {
    nodes {
      slug
    }
  }
}`
  }
  const resJson = await graphqlRequest(query);
  const slugs = resJson.data.posts.nodes;
  return slugs;
}