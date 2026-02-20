// 여행 정보 큐레이션용 목 데이터 (출처: 블로그·유튜브·공공데이터 연상)
export const CURATION_BY_DESTINATION = {
  '제주도': {
    summary: '제주는 휴양과 자연, 맛집이 어우러진 시니어 친화 코스가 많습니다.',
    accommodation: [
      { id: 1, name: '제주 한담해변 펜션', type: '펜션', price: '8만원~', note: '바다 전망, 주차 가능', score: 4.8, source: '블로그' },
      { id: 2, name: '서귀포 시니어 맞춤 숙소', type: '민박', price: '5만원~', note: '조식 포함, 평탄한 출입', score: 4.6, source: '공공데이터' },
      { id: 3, name: '제주 올레길 근처 게스트하우스', type: '게스트하우스', price: '4만원~', note: '걷기 코스 인접', score: 4.5, source: '유튜브' },
    ],
    transport: [
      { id: 1, name: '제주 시외버스 (공항↔서귀포)', note: '저상버스 다수, 배차 잦음', tip: '제주버스 앱으로 실시간 확인' },
      { id: 2, name: '렌터카 (경차/소형)', note: '시니어 할인 업체 있음', tip: '주차 쉬운 숙소 추천' },
      { id: 3, name: '관광택시 (4시간/8시간)', note: '맞춤 코스 가능', tip: '체력 고려 시 추천' },
    ],
    attraction: [
      { id: 1, name: '성산일출봉', note: '완만한 산책로, 전동차 이동 가능', level: '쉬움' },
      { id: 2, name: '우도 자전거·전기차', note: '반나절 코스, 휴식 포인트 많음', level: '보통' },
      { id: 3, name: '서귀포 올레 6코스', note: '해안 산책, 구간 선택 가능', level: '쉬움~보통' },
    ],
    food: [
      { id: 1, name: '흑돼지 맛집 (서귀포)', note: '주차·대기 공간 넓음', tags: ['맛집', '주차'] },
      { id: 2, name: '해녀의 집', note: '신선한 해산물, 단체석', tags: ['해산물', '단체'] },
      { id: 3, name: '제주 전통식당', note: '담백한 국물·밥 위주', tags: ['전통', '담백'] },
    ],
  },
  '부산·경남': {
    summary: '해운대·기장·통영 등 해안과 문화시설이 잘 갖춰진 지역입니다.',
    accommodation: [
      { id: 1, name: '해운대 근처 호텔', type: '호텔', price: '12만원~', note: '엘리베이터, 해변 인접', score: 4.7, source: '블로그' },
      { id: 2, name: '기장 해변 펜션', type: '펜션', price: '7만원~', note: '조용한 해변', score: 4.5, source: '유튜브' },
      { id: 3, name: '통영 한산도 민박', type: '민박', price: '6만원~', note: '조식, 픽업 가능', score: 4.6, source: '블로그' },
    ],
    transport: [
      { id: 1, name: '부산 도시철도', note: '저상·엘리베이터 역 많음', tip: '1일권 추천' },
      { id: 2, name: '기장·통영 시외버스', note: '저상버스 노선 확인', tip: '출발 전 배차 확인' },
      { id: 3, name: '부산관광버스 (해운대·태종대)', note: '한 번에 주요 관광지', tip: '체력 절약' },
    ],
    attraction: [
      { id: 1, name: '해운대 해수욕장·동백섬', note: '평탄한 산책로', level: '쉬움' },
      { id: 2, name: '감천문화마을', note: '쉼터 많음, 구간별 이동', level: '쉬움' },
      { id: 3, name: '통영 한산도', note: '전동차·버스로 이동', level: '쉬움' },
    ],
    food: [
      { id: 1, name: '부산 밀면·돼지국밥', note: '매장 넓은 곳 다수', tags: ['밀면', '국밥'] },
      { id: 2, name: '기장 회·해산물', note: '바다 전망, 주차 가능', tags: ['회', '해산물'] },
      { id: 3, name: '통영 충무김밥·갓김치', note: '가벼운 한 끼', tags: ['김밥', '전통'] },
    ],
  },
  '강릉·동해': {
    summary: '바다와 산이 맞닿은 동해안, 휴양과 맛집이 잘 어울립니다.',
    accommodation: [
      { id: 1, name: '강릉 경포대 인근 숙소', type: '호텔/펜션', price: '10만원~', note: '해변 인접, 평탄', score: 4.6, source: '블로그' },
      { id: 2, name: '정동진 해돋이 펜션', type: '펜션', price: '8만원~', note: '해돋이 명소', score: 4.5, source: '유튜브' },
      { id: 3, name: '동해 무릉계곡 근처', type: '민박', price: '5만원~', note: '시원한 계곡', score: 4.4, source: '블로그' },
    ],
    transport: [
      { id: 1, name: '강릉 시내버스', note: '경포대·정동진 노선', tip: '버스 시간표 미리 확인' },
      { id: 2, name: '강릉·동해 KTX/무궁화호', note: '역 주변 렌터카·택시', tip: '당일 치기 시 KTX' },
      { id: 3, name: '렌터카', note: '해안도로 드라이브', tip: '주차 쉬운 곳 위주' },
    ],
    attraction: [
      { id: 1, name: '경포대·경포해수욕장', note: '평탄한 해변 산책', level: '쉬움' },
      { id: 2, name: '정동진 해돋이', note: '차량 접근 가능', level: '쉬움' },
      { id: 3, name: '주문진·안목 커피거리', note: '바다 보며 휴식', level: '쉬움' },
    ],
    food: [
      { id: 1, name: '강릉 초당두부', note: '담백한 두부 요리', tags: ['두부', '담백'] },
      { id: 2, name: '강릉 커피·빵', note: '안목·경포대 카페', tags: ['카페', '빵'] },
      { id: 3, name: '동해 회·물회', note: '신선한 횟집', tags: ['회', '물회'] },
    ],
  },
  '전주·전북': {
    summary: '한옥마을과 맛집, 역사가 있는 전주·전북은 걷기 좋은 코스가 많습니다.',
    accommodation: [
      { id: 1, name: '전주 한옥마을 한옥체험', type: '한옥숙박', price: '9만원~', note: '전통 체험, 평탄', score: 4.7, source: '블로그' },
      { id: 2, name: '전주 시내 호텔', type: '호텔', price: '7만원~', note: '역·한옥마을 가깝게', score: 4.5, source: '유튜브' },
      { id: 3, name: '군산 근대거리 인근', type: '게스트하우스', price: '5만원~', note: '거리 산책 좋음', score: 4.4, source: '블로그' },
    ],
    transport: [
      { id: 1, name: '전주 시내버스', note: '한옥마을·경기전 노선', tip: '시내 순환 활용' },
      { id: 2, name: '전주↔군산 시외버스', note: '배차 많음', tip: '당일치기 가능' },
      { id: 3, name: 'KTX 전주역', note: '역에서 택시·버스', tip: '주요 관광지 연결' },
    ],
    attraction: [
      { id: 1, name: '전주 한옥마을', note: '완만한 오솔길, 휴식 공간 많음', level: '쉬움' },
      { id: 2, name: '경기전·전동성당', note: '걷기 좋은 거리', level: '쉬움' },
      { id: 3, name: '군산 근대거리', note: '건물 감상·카페', level: '쉬움' },
    ],
    food: [
      { id: 1, name: '전주 비빔밥·한정식', note: '한옥마을 맛집', tags: ['비빔밥', '한정식'] },
      { id: 2, name: '전주 막걸리·파전', note: '한옥 분위기', tags: ['막걸리', '파전'] },
      { id: 3, name: '군산 회·갓김치', note: '해산물·전통', tags: ['회', '갓김치'] },
    ],
  },
  '경주': {
    summary: '역사와 문화가 살아 있는 경주, 넓은 공간과 쉬운 이동이 장점입니다.',
    accommodation: [
      { id: 1, name: '경주 보문단지 호텔', type: '호텔', price: '11만원~', note: '호텔 밀집, 교통 편', score: 4.6, source: '블로그' },
      { id: 2, name: '경주 시내 게스트하우스', type: '게스트하우스', price: '5만원~', note: '역 인접', score: 4.5, source: '유튜브' },
      { id: 3, name: '불국사 인근 민박', type: '민박', price: '6만원~', note: '조용한 숙소', score: 4.4, source: '블로그' },
    ],
    transport: [
      { id: 1, name: '경주 시내버스·관광버스', note: '주요 유적 연결', tip: '1일권 추천' },
      { id: 2, name: 'KTX 신경주역', note: '역에서 버스·택시', tip: '보문단지 직행' },
      { id: 3, name: '렌터카', note: '대릉원·불국사 등 넓은 이동', tip: '체력 절약' },
    ],
    attraction: [
      { id: 1, name: '대릉원·첨성대', note: '평탄한 공원 산책', level: '쉬움' },
      { id: 2, name: '불국사', note: '일부 구간 계단, 휴식 공간 있음', level: '보통' },
      { id: 3, name: '경주 월정교·동궁과월지', note: '야경·산책', level: '쉬움' },
    ],
    food: [
      { id: 1, name: '경주 한정식·황남빵', note: '전통 과자·식사', tags: ['한정식', '황남빵'] },
      { id: 2, name: '경주 불고기·갓김치', note: '맛집 다수', tags: ['불고기', '갓김치'] },
      { id: 3, name: '보문단지 회·해산물', note: '호텔 근처', tags: ['회', '해산물'] },
    ],
  },
  '기타': {
    summary: '다양한 지역의 시니어 친화 숙소·교통·관광·맛집을 추후 추가할 수 있습니다.',
    accommodation: [
      { id: 1, name: '지역별 시니어 맞춤 숙소', type: '다양', price: '문의', note: '평탄한 출입, 조식 옵션', score: 4.5, source: '공공데이터' },
      { id: 2, name: '전통 한옥·민박', type: '민박', price: '5만원~', note: '조용한 휴양', score: 4.4, source: '블로그' },
      { id: 3, name: '호텔·리조트', type: '호텔', price: '10만원~', note: '편의시설 충실', score: 4.6, source: '유튜브' },
    ],
    transport: [
      { id: 1, name: '시외버스·철도', note: '저상버스 노선 사전 확인', tip: '지역별 교통정보 앱' },
      { id: 2, name: '렌터카·관광택시', note: '맞춤 코스 가능', tip: '시니어 할인 문의' },
      { id: 3, name: '지자체 관광버스', note: '주요 관광지 순환', tip: '예약제 확인' },
    ],
    attraction: [
      { id: 1, name: '지역 공원·해변', note: '평탄한 산책로 위주', level: '쉬움' },
      { id: 2, name: '박물관·전시관', note: '실내·휴식 가능', level: '쉬움' },
      { id: 3, name: '전통시장·거리', note: '걷기·휴식 포인트', level: '쉬움' },
    ],
    food: [
      { id: 1, name: '지역 대표 음식', note: '담백·저염 옵션 요청', tags: ['지역맛'] },
      { id: 2, name: '전통시장 맛집', note: '가벼운 한 끼', tags: ['시장', '맛집'] },
      { id: 3, name: '카페·휴식', note: '중간 휴식용', tags: ['카페', '휴식'] },
    ],
  },
}
