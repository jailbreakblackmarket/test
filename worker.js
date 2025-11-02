export default {
  async fetch(request, env) {
    if (request.method === "POST" && new URL(request.url).pathname === "/collect") {
      try {
        const data = await request.json();
        const messages = data.messages || [];
        
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("No messages provided", { status: 400 });
        }

        const key = `chat-${Date.now()}`;
        await env.CHAT_KV.put(key, JSON.stringify(messages));

        console.log(`Saved ${messages.length} messages to KV key: ${key}`);

        return new Response(JSON.stringify({ status: "ok", saved: messages.length }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response("Invalid JSON or server error", { status: 500 });
      }
    }

    return new Response("Not found", { status: 404 });
  }
}
