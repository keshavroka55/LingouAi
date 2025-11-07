import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In production, verify Stripe webhook signature
    if (body.type === "charge.succeeded") {
      const { customer_email, amount } = body.data.object

      // In production, update user credits in database
      console.log(`Payment received from ${customer_email} for $${amount / 100}`)

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
