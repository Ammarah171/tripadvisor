

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { jwtVerify } from "jose"

export async function POST(request: Request) {
  
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || ""))
    const userId = payload.id as string
  try {
    const body = await request.json()
    const { tripId, rating, reviewType, comment = "", reviewedUserId } = body

    if (!tripId || typeof rating !== "number" || !reviewType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
 
    if (reviewType === "TRIP") {
      const review = await prisma.tripReview.upsert({
        where: { tripId_reviewerId: { tripId, reviewerId: userId } },
        update: { rating, comment },
        create: { tripId, reviewerId: userId, rating, comment },
      })
      return NextResponse.json({ ok: true, review })
    }

    if (reviewType === "BUDDY") {
      if (!reviewedUserId) {
        return NextResponse.json({ error: "Missing reviewedUserId" }, { status: 400 })
      }
      const review = await prisma.buddyReview.upsert({
        where: { tripId_reviewerId_buddyId: { tripId, reviewerId: userId, buddyId: reviewedUserId } },
        update: { rating, comment },
        create: { tripId, reviewerId: userId, buddyId: reviewedUserId, rating, comment },
      })
      return NextResponse.json({ ok: true, review })
    }

    return NextResponse.json({ error: "Invalid reviewType" }, { status: 400 })
  } catch (e) {
    return NextResponse.json({ error: "Failed to create or update review" }, { status: 500 })
  }
}
