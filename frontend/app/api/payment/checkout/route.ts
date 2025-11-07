import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { planId, email } = await request.json()

    if (!planId || !email) {
      return NextResponse.json({ error: "Missing plan or email" }, { status: 400 })
    }

    // In production, integrate with Stripe
    const plans: Record<string, Record<string, unknown>> = {
      starter: { price: 900, credits: 100 },
      professional: { price: 2900, credits: 500 },
      enterprise: { price: 9900, credits: 2000 },
    }

    const plan = plans[planId]
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Simulate successful payment
    return NextResponse.json({
      success: true,
      sessionId: `session_${Date.now()}`,
      message: "Checkout initiated",
      plan,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
