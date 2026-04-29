async function getImpact() {
  const res = await fetch(
    "http://localhost:3000/api/impact-score",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function ImpactPage() {
  const data = await getImpact();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm text-cyan-300">
          FLOW:HARBOR / Day 4
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Local Impact Score
        </h1>

        <p className="mt-3 text-slate-300">
          {data.place} 방문을 통해 발생한
          관광 분산 기여도입니다.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-5xl font-bold text-cyan-300">
            {data.finalScore} pts
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <p>Distance: {data.distanceScore}</p>
            <p>UnderVisited: {data.underVisitedScore}</p>
            <p>Stay Time: {data.stayTimeScore}</p>
            <p>Local Commerce: {data.localCommerceScore}</p>
            <p>Congestion Avoidance: {data.congestionAvoidanceScore}</p>
          </div>
        </div>
      </section>
    </main>
  );
}