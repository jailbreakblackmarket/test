// worker.js
export default {
  async fetch(request, env) {
    if (request.method === "POST" && new URL(request.url).pathname === "/collect") {
      const text = await request.text();
      const key = "entry-" + Date.now();
      await env.MY_KV.put(key, text);
      return new Response(JSON.stringify({ status: "saved", key }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("ok");
  }
}
