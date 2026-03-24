import graphqlRequest from "./graphqlRequest"

export async function getPageSlugs() {
    const query = {
        query: `query getPageSlugs {
  pages {
    nodes {
      slug
    }
  }
}`
    }

    const resJson = await graphqlRequest(query);
    const slugs = resJson?.data?.pages?.nodes || [];
    return slugs;
}

export async function getSinglePage(slug) {
    // Use the page query by SLUG to fetch a single page reliably
    // Try several strategies to locate the page in WPGraphQL. Some WP setups
    // expose `page(id: ..., idType: SLUG)`, others respond to a filtered `pages`.
    const tryQueries = [
      // primary: single page by SLUG
      `query getSinglePageBySlug { page(id: "${slug}", idType: SLUG) { content(format: RENDERED) date modified slug title(format: RENDERED) } }`,
      // fallback: pages filtered by slug
      `query getSinglePageByFilter { pages(where: { slug: "${slug}" }) { nodes { content(format: RENDERED) date modified slug title(format: RENDERED) } } }`,
      // fallback: pages filtered by name (older schemas)
      `query getSinglePageByName { pages(where: { name: "${slug}" }) { nodes { content(format: RENDERED) date modified slug title(format: RENDERED) } } }`,
    ]

    for (const q of tryQueries) {
      try {
        const resJson = await graphqlRequest({ query: q })
        if (!resJson || !resJson.data) continue

        // If the response has `page` return it
        if (resJson.data.page) return resJson.data.page

        // If the response has `pages.nodes` return the first node
        if (resJson.data.pages && Array.isArray(resJson.data.pages.nodes) && resJson.data.pages.nodes.length) {
          return resJson.data.pages.nodes[0]
        }
      } catch (e) {
        // ignore and try the next query; errors will surface to caller if all fail
        // but log to console for local debugging
        // console.warn('getSinglePage query failed:', e)
      }
    }

    return null
}