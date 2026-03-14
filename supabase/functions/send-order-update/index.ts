import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ORDER_STAGE_LABELS: Record<string, string> = {
  confirmed: "Order Confirmed",
  procurement: "Procurement",
  production: "Production",
  shipping: "Shipping",
  delivered: "Delivered",
};

const stageDescriptions: Record<string, string> = {
  confirmed: "Your order has been confirmed and is being processed.",
  procurement: "We are sourcing the materials for your order.",
  production: "Your items are currently being crafted.",
  shipping: "Your order is on its way to you!",
  delivered: "Your order has been delivered. We hope you love it!",
};

interface OrderUpdatePayload {
  customerName: string;
  customerEmail: string;
  orderId: string;
  newStatus: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { customerName, customerEmail, orderId, newStatus }: OrderUpdatePayload = await req.json();

    const label = ORDER_STAGE_LABELS[newStatus] || newStatus;
    const description = stageDescriptions[newStatus] || "Your order status has been updated.";

    const stages = ["confirmed", "procurement", "production", "shipping", "delivered"];
    const currentIdx = stages.indexOf(newStatus);

    const progressBar = stages
      .map((stage, idx) => {
        const isCompleted = idx <= currentIdx;
        const bgColor = isCompleted ? "#1a1a1a" : "#e5e5e5";
        const textColor = isCompleted ? "#ffffff" : "#999999";
        return `<td style="text-align:center;padding:4px">
          <div style="width:36px;height:36px;border-radius:50%;background:${bgColor};color:${textColor};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold">${idx + 1}</div>
          <div style="font-size:10px;color:${isCompleted ? '#333' : '#999'};margin-top:4px">${ORDER_STAGE_LABELS[stage]}</div>
        </td>`;
      })
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <h1 style="font-size:24px;margin-bottom:4px">Order Update</h1>
        <p>Hi ${customerName},</p>
        <p>${description}</p>
        <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin:24px 0">
          <p style="margin:0 0 4px;font-size:13px;color:#888">Current Status</p>
          <p style="margin:0;font-size:20px;font-weight:bold">${label}</p>
        </div>
        <table style="width:100%;margin:24px 0"><tr>${progressBar}</tr></table>
        <p style="font-size:13px;color:#888">Order ID: ${orderId.slice(0, 8).toUpperCase()}</p>
        <p style="color:#888;font-size:13px">If you have any questions, reply to this email.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BOEMMM <onboarding@resend.dev>",
        to: [customerEmail],
        subject: `Order Update: ${label}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("send-order-update error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
