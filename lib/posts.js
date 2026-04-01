import graphqlRequest from "./graphqlRequest"

export async function getPostList(endCursor = null) {
  const condition = `  first: 5
    after: "${endCursor}"
    where: {orderby: {field: DATE, order: DESC}}`

  const query = {
    query: `query NewQuery {
   posts(${condition}) {
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

export async function getCategorySlugs() {
  const query = {
    query: `query getCategorySlugs {
  categories {
    nodes {
      slug
    }
  }
}`
  }

  const resJson = await graphqlRequest(query);
  const categories = resJson.data.categories.nodes
  return categories;
}

export async function getCategoryDetails(categoryName) {
  const query = {
    query: `query getCategoryDetails {
  category(id: "${categoryName}", idType: SLUG) {
    count
    name
    slug
    posts {
      nodes {
        date
        slug
        title
        excerpt(format: RENDERED)
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
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
}`
  }

  const resJson = await graphqlRequest(query);
  const categoryDetails = resJson.data.category
  return categoryDetails;
}