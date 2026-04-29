async function getMissions() {
  const res = await fetch(
    "http://localhost:3000/api/missions",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function MissionsPage() {
  const data = await getMissions();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-cyan-300 text-sm">
          FLOW:HARBOR / Day 3
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          관광 흐름 재분배 미션
        </h1>

        <p className="mt-3 text-slate-300">
          {data.hotspot}의 혼잡을 완화하기 위한
          대체 로컬 경험 추천입니다.
        </p>

        <div className="mt-8 grid gap-4">
          {data.recommendations.map((item: any) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                  Score {item.recommendationScore}
                </span>
              </div>

              <p className="mt-2 text-slate-400">
                {item.description}
              </p>

              <div className="mt-4 flex gap-4 text-sm">
                <p>거리: {item.distanceKm}km</p>
                <p>카테고리: {item.category}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}