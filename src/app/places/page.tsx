import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PlacesPage() {
  const places = await prisma.place.findMany({
    orderBy: {
      monthlyVisitors: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm text-cyan-300">
          FLOW:HARBOR / Day 1
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          포항 관광 장소 데이터
        </h1>

        <p className="mt-3 text-slate-300">
          관광 흐름 재분배를 위한
          핫스팟 / 비핫스팟 기초 데이터입니다.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {places.map((place) => (
            <article
              key={place.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {place.name}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    place.isHotspot
                      ? "bg-red-500/20 text-red-300"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  {place.isHotspot ? "HOTSPOT" : "LOCAL"}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                {place.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-800 p-3">
                  <p className="text-slate-400">카테고리</p>
                  <p>{place.category}</p>
                </div>

                <div className="rounded-xl bg-slate-800 p-3">
                  <p className="text-slate-400">월 방문자</p>
                  <p>
                    {place.monthlyVisitors.toLocaleString()}명
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800 p-3">
                  <p className="text-slate-400">로컬 상권</p>
                  <p>
                    {place.isLocalCommerce ? "Yes" : "No"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-800 p-3">
                  <p className="text-slate-400">혼잡도</p>
                  <p>{place.congestionIndex}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href="/missions"
            className="rounded-full bg-cyan-400 px-8 py-4 font-semibold text-black"
          >
            대체 관광 미션 보기
          </Link>
        </div>
      </section>
    </main>
  );
}