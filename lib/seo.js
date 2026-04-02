import graphqlRequest from "./graphqlRequest";

export async function getSeo(pageType = 'post', slug = "/") {
  const query = {
    query: `query getSeo {
  ${pageType}(id: "${slug}", idType: SLUG) {
    seo {
      title
      metaDesc
      schema {
        raw
      }
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphImage {
        mediaItemUrl
      }
      opengraphType
      opengraphSiteName
    }
  }
}`
  }

  const response = await graphqlRequest(query);

  if (response?.errors || !response?.data || !response?.data[pageType] || !response?.data[pageType]?.seo) {
    return null;
  }

  const seoData = response.data[pageType].seo
  return seoData
}