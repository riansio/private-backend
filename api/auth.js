// auth.js - Cloudflare Worker backend for Roblox loader
// Only authorizes the game creator

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const type = url.searchParams.get("REQUEST_TYPE");

    // 🔒 Hardcoded Roblox creator ID
    const OWNER_ID = 2776050820;

    let response = {};

    if (type === "CHECK") {
      response = {
        success: true,
        productsOwned: {
          monospace0: true,
          polaris0: true
        },
        WHITELIST: [true, [
          {
            TYPE: "CREATOR",
            ID: OWNER_ID,
            ID_TYPE: "User"
          }
        ]],
        BLACKLIST: [false, []]
      };
    }

    else if (type === "CHECK_BLACKLIST") {
      response = {
        enabled: false,
        reason: "None",
        level: 0,
        WHITELIST: [true, [
          {
            TYPE: "CREATOR",
            ID: OWNER_ID,
            ID_TYPE: "User"
          }
        ]],
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
