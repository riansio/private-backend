// auth.js - Cloudflare Worker for Roblox loader
// Only allows the game's creator to run elevators

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const type = url.searchParams.get("REQUEST_TYPE");

    // Loader must send the game's creatorId in the query string
    // Example call: https://your-worker-url/api/auth?REQUEST_TYPE=CHECK&creatorId=2776050820
    const creatorId = parseInt(url.searchParams.get("creatorId"), 10);
    const playerId = parseInt(url.searchParams.get("playerId"), 10);

    let response = {};

    if (type === "CHECK") {
      if (playerId === creatorId) {
        // ✅ Only the creator is authorized
        response = {
          success: true,
          productsOwned: {
            monospace0: true,
            polaris0: true
          },
          WHITELIST: [true, [creatorId]],
          BLACKLIST: [false, []]
        };
      } else {
        // ❌ Everyone else is denied
        response = {
          success: false,
          productsOwned: {},
          WHITELIST: [true, [creatorId]],
          BLACKLIST: [false, []]
        };
      }
    }

    else if (type === "CHECK_BLACKLIST") {
      response = {
        enabled: false,
        reason: "None",
        level: 0,
        WHITELIST: [true, [creatorId]],
        BLACKLIST: [false, []]
      };
    }

    else {
      response = { error: "Invalid REQUEST_TYPE" };
    }

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
