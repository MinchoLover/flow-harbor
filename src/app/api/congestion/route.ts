import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateCongestionIndex } from "@/lib/congestion";

export async function GET() {
  const places = await prisma.place.findMany();

  const now = new Date();

  const hour = now.getHours();
  const month = now.getMonth() + 1;
  const day = now.getDay();

  const isWeekend = day === 0 || day === 6;
  const isSaturday = day === 6;

  const updated = await Promise.all(
    places.map(async (place) => {
      const congestionIndex =
        calculateCongestionIndex({
          monthlyVisitors: place.monthlyVisitors,
          averageVisitors: place.averageVisitors,
          isWeekend,
          isSaturday,
          isHoliday: false,
          hour,
          month,
          hasNearbyEvent: false,
          nearbyHotspotCount: place.isHotspot ? 2 : 1,
        });

      return prisma.place.update({
        where: {
          id: place.id,
        },
        data: {
          congestionIndex,
        },
      });
    })
  );

  return NextResponse.json(updated);
}