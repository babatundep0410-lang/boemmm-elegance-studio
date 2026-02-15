import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalPrice: number;
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

    const { customerName, customerEmail, items, totalPrice }: OrderPayload = await req.json();

    const itemRows = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${formatPrice(item.price * item.quantity)}</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <h1 style="font-size:24px;margin-bottom:4px">Order Confirmed</h1>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order! Here's your summary:</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <thead>
            <tr style="background:#f5f5f5">
              <th style="padding:8px 12px;text-align:left">Item</th>
              <th style="padding:8px 12px;text-align:center">Qty</th>
              <th style="padding:8px 12px;text-align:right">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px;font-weight:bold;text-align:right">Total</td>
              <td style="padding:12px;font-weight:bold;text-align:right">${formatPrice(totalPrice)}</td>
            </tr>
          </tfoot>
        </table>
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
        subject: "Your BOEMMM Order Confirmation",
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
    console.error("send-order-confirmation error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
