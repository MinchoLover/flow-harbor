type ImpactInput = {
  distanceKm: number;
  monthlyVisitors: number;
  maxVisitors: number;
  stayMinutes: number;
  isLocalCommerce: boolean;
  congestionIndex: number;
  uniqueVisitCount: number;
};

export function calculateImpactScore(
  input: ImpactInput
) {
  const distanceScore = Math.min(
    Math.round(input.distanceKm * 4),
    20
  );

  const underVisitedScore = Math.min(
    Math.round(
      (1 - input.monthlyVisitors / Math.max(input.maxVisitors, 1)) * 25
    ),
    25
  );

  const stayTimeScore =
    input.stayMinutes >= 90
      ? 15
      : input.stayMinutes >= 60
      ? 10
      : input.stayMinutes >= 30
      ? 6
      : 2;

  const localCommerceScore =
    input.isLocalCommerce ? 20 : 5;

  const congestionAvoidanceScore =
    input.congestionIndex >= 70
      ? 15
      : input.congestionIndex >= 40
      ? 10
      : 5;

  const diversityBonus =
    input.uniqueVisitCount >= 5
      ? 10
      : input.uniqueVisitCount >= 3
      ? 6
      : 2;

  const finalScore =
    distanceScore +
    underVisitedScore +
    stayTimeScore +
    localCommerceScore +
    congestionAvoidanceScore +
    diversityBonus;

  return {
    distanceScore,
    underVisitedScore,
    stayTimeScore,
    localCommerceScore,
    congestionAvoidanceScore,
    diversityBonus,
    finalScore,
  };
}