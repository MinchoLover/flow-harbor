type CongestionInput = {
  monthlyVisitors: number;
  averageVisitors: number;
  isWeekend: boolean;
  isSaturday: boolean;
  isHoliday: boolean;
  hour: number;
  month: number;
  hasNearbyEvent: boolean;
  nearbyHotspotCount: number;
};

export function calculateCongestionIndex(
  input: CongestionInput
): number {
  const baseDemand =
    input.monthlyVisitors /
    Math.max(input.averageVisitors, 1);

  const dayWeight = input.isHoliday
    ? 1.4
    : input.isSaturday
    ? 1.35
    : input.isWeekend
    ? 1.25
    : 1.0;

  const timeWeight =
    input.hour >= 14 && input.hour <= 18
      ? 1.3
      : input.hour >= 11 && input.hour <= 13
      ? 1.1
      : input.hour >= 19 && input.hour <= 21
      ? 1.15
      : input.hour >= 6 && input.hour <= 10
      ? 0.85
      : 0.7;

  const seasonWeight =
    [7, 8].includes(input.month)
      ? 1.4
      : [4, 5, 10].includes(input.month)
      ? 1.2
      : [12, 1, 2].includes(input.month)
      ? 0.9
      : 1.0;

  const eventWeight = input.hasNearbyEvent
    ? 1.3
    : 1.0;

  const nearbyHotspotWeight = Math.min(
    1 + input.nearbyHotspotCount * 0.08,
    1.3
  );

  const raw =
    baseDemand *
    dayWeight *
    timeWeight *
    seasonWeight *
    eventWeight *
    nearbyHotspotWeight;

  return Math.min(
    Math.round(raw * 50),
    100
  );
}