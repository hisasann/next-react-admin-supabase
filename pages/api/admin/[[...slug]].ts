import { NextApiRequest, NextApiResponse } from "next";

// routing example:
// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segmentss

// CURL example:
// データ書き換え
// curl -X POST URL_TO_MY_DB_AND_TABLE \
// -H "apikey: SUPABASE_KEY" \
// -H "Authorization: Bearer SUPABASE_KEY" \
// -H "Content-Type: application/json" \
// -H "Prefer: return=minimal" \
// -d '{ "name": "yoda"}'
// データ取得
// curl 'https://fbiglpriomgxqtetajea.supabase.co/rest/v1/users' \
// -H "apikey: SUPABASE_KEY" \
// -H "Authorization: Bearer SUPABASE_KEY" \

// http://localhost:3000/api/admin/users?limit=10&offset=0&order=id.asc
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get the incoming request URL, e.g. 'posts?limit=10&offset=0&order=id.asc'
  const requestUrl = req.url?.substring("/api/admin/".length);
  // build the CRUD request based on the incoming request
  // https://supabase.com/docs/guides/api#rest-api-overview
  const url = `${process.env.SUPABASE_URL}/rest/v1/${requestUrl}`;
  const options: RequestInit = {
    method: req.method,
    headers: {
      prefer: req.headers["prefer"] as string ?? "",
      accept: req.headers["accept"] ?? "application/json",
      ["content-type"]: req.headers["content-type"] ?? "application/json",
      // supabase authentication
      apiKey: process.env.SUPABASE_SERVICE_ROLE ?? '',
      // ここ重要、サンプルだとここがないケースが多く動かない
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE ?? ''}`,
    },
  };
  if (req.body) {
    options.body = JSON.stringify(req.body);
  }
  // call the CRUD API
  const response = await fetch(url, options);
  // send the response back to the client
  const contentRange = response.headers.get("content-range");
  if (contentRange) {
    res.setHeader("Content-Range", contentRange);
  }
  const text = await response.text()
  console.log(111, requestUrl, url, text);
  res.end(text);
}