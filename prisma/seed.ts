import "dotenv/config";
import { PlaceCategory, PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const places = [
  {
    name: "영일대해수욕장",
    category: PlaceCategory.BEACH,
    address: "경북 포항시 북구 두호동",
    latitude: 36.0584,
    longitude: 129.3786,
    isHotspot: true,
    isLocalCommerce: false,
    monthlyVisitors: 120000,
    averageVisitors: 85000,
    congestionIndex: 1.41,
    description: "포항 대표 해변 관광지",
  },
  {
    name: "죽도시장",
    category: PlaceCategory.MARKET,
    address: "경북 포항시 북구 죽도시장길",
    latitude: 36.0358,
    longitude: 129.3656,
    isHotspot: true,
    isLocalCommerce: true,
    monthlyVisitors: 110000,
    averageVisitors: 80000,
    congestionIndex: 1.38,
    description: "포항 대표 전통시장",
  },
  {
    name: "호미곶 해맞이광장",
    category: PlaceCategory.LANDMARK,
    address: "경북 포항시 남구 호미곶면",
    latitude: 36.0767,
    longitude: 129.5683,
    isHotspot: true,
    isLocalCommerce: false,
    monthlyVisitors: 95000,
    averageVisitors: 70000,
    congestionIndex: 1.36,
    description: "일출 명소",
  },
  {
    name: "철길숲",
    category: PlaceCategory.WALK,
    address: "경북 포항시 남구 대잠동",
    latitude: 36.0191,
    longitude: 129.3433,
    isHotspot: false,
    isLocalCommerce: false,
    monthlyVisitors: 28000,
    averageVisitors: 30000,
    congestionIndex: 0.93,
    description: "도심 산책형 로컬 공간",
  },
];

async function main() {
  await prisma.place.deleteMany();

  await prisma.place.createMany({
    data: places,
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
