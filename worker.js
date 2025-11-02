export default {
  async fetch(request, env) {
    if (request.method === "POST" && new URL(request.url).pathname === "/collect") {
      const body = await request.text();           // read the text body
      const key = "entry-" + Date.now();           // unique key
      await env.CHAT_KV.put(key, body);              // save to a KV namespace
      return new Response("saved " + key);
    }
    return new Response("ok");
  }
}
