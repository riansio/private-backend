// auth.js - Cloudflare Worker
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const REQUEST_TYPE = url.searchParams.get("REQUEST_TYPE");
    const SUBJECT_ID = url.searchParams.get("SUBJECT_ID") || "unknown";
    const SUBJECT_TYPE = url.searchParams.get("SUBJECT_TYPE") || "unspecified";

    // Helper: consistent JSON headers
    const headers = { "content-type": "application/json" };

    // Dynamic-looking response
    if (REQUEST_TYPE === "CHECK") {
      return new Response(JSON.stringify({
        success: true,
        subject: {
          id: SUBJECT_ID,
          type: SUBJECT_TYPE
        },
        productsOwned: {
          monospace0: true,
          polaris0: true
        },
        error: "None"
      }), { headers });
    }

    if (REQUEST_TYPE === "CHECK_BLACKLIST") {
      return new Response(JSON.stringify({
        enabled: false,
        reason: "None",
        level: 0,
        subject: {
          id: SUBJECT_ID,
          type: SUBJECT_TYPE
        }
      }), { headers });
    }

    // Default fallback for invalid requests
    return new Response(JSON.stringify({
      success: false,
      error: "Invalid REQUEST_TYPE",
      subject: {
        id: SUBJECT_ID,
        type: SUBJECT_TYPE
      }
    }), { headers });
  }
};
