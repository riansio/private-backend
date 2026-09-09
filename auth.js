// auth.js - Cloudflare Worker
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const REQUEST_TYPE = url.searchParams.get("REQUEST_TYPE");
    const method = request.method; // "GET", "POST", "PUT", "DELETE", etc.

    const headers = { "content-type": "application/json" };

    if (path === "/api/auth") {
      // Handle GET (loader uses this)
      if (method === "GET") {
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
      }

      // Handle POST
      if (method === "POST") {
        const body = await request.json().catch(() => ({}));
        return new Response(JSON.stringify({
          success: true,
          received: body,
          message: "POST handled successfully"
        }), { headers });
      }

      // Handle PUT
      if (method === "PUT") {
        const body = await request.json().catch(() => ({}));
        return new Response(JSON.stringify({
          success: true,
          updated: body,
          message: "PUT handled successfully"
        }), { headers });
      }

      // Handle DELETE
      if (method === "DELETE") {
        return new Response(JSON.stringify({
          success: true,
          message: "DELETE handled successfully"
        }), { headers });
      }

      // Fallback for unsupported methods
      return new Response(JSON.stringify({
        success: false,
        error: "Unsupported method or REQUEST_TYPE"
      }), { headers });
    }

    return new Response("Not Found", { status: 404 });
  }
};
