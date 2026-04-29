import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateImpactScore } from "@/lib/impact-score";
import { getDistanceKm } from "@/lib/distance";

export async function GET() {
  const place = await prisma.place.findFirst({
    where: {
      name: "철길숲",
    },
  });

  if (!place) {
    return NextResponse.json({
      error: "Place not found",
    });
  }

  const hotspot = await prisma.place.findFirst({
    where: {
      name: "영일대해수욕장",
    },
  });

  if (!hotspot) {
    return NextResponse.json({
      error: "Hotspot not found",
    });
  }

  const maxVisitorsPlace = await prisma.place.findFirst({
    orderBy: {
      monthlyVisitors: "desc",
    },
  });

  const distanceKm = getDistanceKm(
    hotspot.latitude,
    hotspot.longitude,
    place.latitude,
    place.longitude
  );

  const result = calculateImpactScore({
    distanceKm,
    monthlyVisitors: place.monthlyVisitors,
    maxVisitors: maxVisitorsPlace?.monthlyVisitors || 1,
    stayMinutes: 75,
    isLocalCommerce: place.isLocalCommerce,
    congestionIndex: hotspot.congestionIndex,
    uniqueVisitCount: 3,
  });

  return NextResponse.json({
    place: place.name,
    ...result,
  });
}