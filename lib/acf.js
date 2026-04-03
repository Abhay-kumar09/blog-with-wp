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