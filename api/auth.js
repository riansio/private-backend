export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const type = url.searchParams.get("REQUEST_TYPE");

    if (type === "CHECK") {
      return new Response(JSON.stringify({
        success: true,
        productsOwned: {
          monospace0: true,
          polaris0: true
        }
      }), { headers: { "Content-Type": "application/json" } });
    }

    if (type === "CHECK_BLACKLIST") {
      return new Response(JSON.stringify({
        enabled: false,
        reason: "None",
        level: 0
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Invalid request" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
};
