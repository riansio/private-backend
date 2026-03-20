// auth.js - Cloudflare Worker
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const REQUEST_TYPE = url.searchParams.get("REQUEST_TYPE");

    const headers = { "content-type": "application/json" };

    if (REQUEST_TYPE === "CHECK") {
      return new Response(JSON.stringify({
        success: true,
        productsOwned: {
          monospace0: true,
          polaris0: true,
          POLARIS_SYSTEM: true
        },
        error: "None"
      }), { headers });
    }

    if (REQUEST_TYPE === "CHECK_BLACKLIST") {
      return new Response(JSON.stringify({
        enabled: false,
        reason: "None",
        level: 0
      }), { headers });
    }

    // Default fallback for invalid requests
    return new Response(JSON.stringify({
      success: false,
      error: "Invalid REQUEST_TYPE"
    }), { headers });
  }
};
