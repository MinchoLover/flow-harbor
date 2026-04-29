# FLOW:HARBOR

포항 관광객의 이동과 소비가 특정 핫스팟에 집중되는 문제를 해결하기 위한 데이터 기반 관광 흐름 재분배 서비스입니다.

## 핵심 문제

포항 관광은 영일대, 죽도시장, 호미곶 등 일부 관광지에 집중되어 있으며, 이로 인해 혼잡과 지역 상권 소외가 발생합니다.

## 해결 방식

FLOW:HARBOR는 관광지 방문 데이터, 위치 정보, 시간/요일/시즌 가중치를 활용해 가상의 실시간 혼잡도 지수를 계산하고, 비핫스팟 로컬 장소로 관광 흐름을 분산시킵니다.

## 주요 기능

1. Congestion Index  
   관광지별 예상 혼잡도 계산

2. Mission Recommendation  
   혼잡 핫스팟 주변의 대체 로컬 장소 추천

3. Local Impact Score  
   사용자의 관광 분산 기여도 점수화

4. GSAP Hero Visualization  
   관광 흐름 집중 → 분산 과정을 시각화

## Tech Stack

- Next.js App Router
- TypeScript
- PostgreSQL
- Prisma
- GSAP
- Vercel

## Demo Flow

1. `/` : 관광 흐름 집중/분산 시각화
2. `/places` : 포항 관광지 혼잡도 확인
3. `/missions` : 대체 로컬 미션 추천
4. `/impact` : Local Impact Score 확인