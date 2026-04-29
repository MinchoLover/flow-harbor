import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDistanceKm } from "@/lib/distance";

export async function GET() {
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

  const candidates = await prisma.place.findMany({
    where: {
      isHotspot: false,
    },
  });

  const maxVisitors = Math.max(
    ...candidates.map((p) => p.monthlyVisitors)
  );

  const recommendations = candidates
    .map((place) => {
      const distanceKm = getDistanceKm(
        hotspot.latitude,
        hotspot.longitude,
        place.latitude,
        place.longitude
      );

      const underVisitedScore =
        1 -
        place.monthlyVisitors /
          Math.max(maxVisitors, 1);

      const localCommerceScore =
        place.isLocalCommerce ? 0.3 : 0.1;

      const distanceBonus =
        distanceKm >= 0.7 &&
        distanceKm <= 5
          ? 0.2
          : 0;

      const recommendationScore =
        underVisitedScore * 0.5 +
        localCommerceScore +
        distanceBonus;

      return {
        id: place.id,
        name: place.name,
        category: place.category,
        description: place.description,
        distanceKm: Number(
          distanceKm.toFixed(1)
        ),
        recommendationScore: Number(
          recommendationScore.toFixed(2)
        ),
      };
    })
    .sort(
      (a, b) =>
        b.recommendationScore -
        a.recommendationScore
    )
    .slice(0, 3);

  return NextResponse.json({
    hotspot: hotspot.name,
    recommendations,
  });
}