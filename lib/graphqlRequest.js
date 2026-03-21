export default async function graphqlRequest(query) {
  const url = "https://dev-blog-with-wp.pantheonsite.io/graphql"
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(query),
    next: { revalidate: 0 }
  })

  const resjson = await res.json()
  return resjson
}