/**
 * 시니어 여행 가이드 - 건강·성향 기반 여행 계획 및 AI 가이드
 * 모바일 최적화 SPA
 */

(function () {
  'use strict';

  const DOM = {
    sectionSurvey: document.getElementById('section-survey'),
    sectionPlan: document.getElementById('section-plan'),
    sectionGuide: document.getElementById('section-guide'),
    surveyForm: document.getElementById('survey-form'),
    planContent: document.getElementById('plan-content'),
    guideDestination: document.getElementById('guide-destination'),
    guideContent: document.getElementById('guide-content'),
    btnBackSurvey: document.getElementById('btn-back-survey'),
    btnBackPlan: document.getElementById('btn-back-plan'),
    btnToGuide: document.getElementById('btn-to-guide'),
    btnRefreshGuide: document.getElementById('btn-refresh-guide'),
  };

  let lastSurvey = null;
  let lastPlan = null;

  // 건강·성향에 맞는 국내 추천 여행지 데이터
  const DESTINATIONS = [
    { id: 'jeju', name: '제주도', tags: ['nature', 'relax', 'culture'], mobility: ['full', 'moderate'], rest: ['low', 'medium', 'high'] },
    { id: 'gangneung', name: '강릉·동해안', tags: ['nature', 'relax', 'food'], mobility: ['full', 'moderate'], rest: ['low', 'medium', 'high'] },
    { id: 'busan', name: '부산', tags: ['culture', 'food', 'relax'], mobility: ['full', 'moderate', 'limited'], rest: ['low', 'medium', 'high'] },
    { id: 'gyeongju', name: '경주', tags: ['culture', 'nature'], mobility: ['full', 'moderate'], rest: ['low', 'medium'] },
    { id: 'jeonju', name: '전주', tags: ['culture', 'food'], mobility: ['full', 'moderate', 'limited'], rest: ['low', 'medium', 'high'] },
    { id: 'sokcho', name: '속초·설악', tags: ['nature', 'relax'], mobility: ['full', 'moderate'], rest: ['medium', 'high'] },
    { id: 'tongyeong', name: '통영·거제', tags: ['nature', 'relax', 'food'], mobility: ['full', 'moderate'], rest: ['low', 'medium', 'high'] },
    { id: 'pyeongchang', name: '평창·대관령', tags: ['nature', 'relax'], mobility: ['full', 'moderate'], rest: ['medium', 'high'] },
    { id: 'yangyang', name: '양양·낙산', tags: ['nature', 'relax'], mobility: ['full', 'moderate'], rest: ['low', 'medium', 'high'] },
    { id: 'suncheon', name: '순천·여수', tags: ['nature', 'culture', 'food'], mobility: ['full', 'moderate'], rest: ['low', 'medium', 'high'] },
  ];

  const STYLE_MAP = {
    relax: '휴양·힐링',
    culture: '문화·역사',
    nature: '자연·산책',
    food: '맛집·음식',
  };

  const MOBILITY_MAP = {
    full: '걷기·계단 자유로움',
    moderate: '짧은 거리 보행 가능',
    limited: '휠체어·보조기 사용',
  };

  function getSurveyData() {
    const form = DOM.surveyForm;
    if (!form) return null;
    const fd = new FormData(form);
    return {
      mobility: fd.get('mobility') || 'moderate',
      rest: fd.get('rest') || 'medium',
      diet: fd.get('diet') || 'none',
      medical: fd.get('medical') || 'none',
      style: fd.get('style') || 'relax',
      duration: parseInt(fd.get('duration') || '3', 10),
      keyword: (fd.get('keyword') || '').trim(),
    };
  }

  function matchDestinations(survey) {
    const styleTag = survey.style;
    const mobilityOk = (d) => d.mobility.includes(survey.mobility);
    const restOk = (d) => d.rest.includes(survey.rest);
    const styleOk = (d) => d.tags.includes(styleTag);

    let list = DESTINATIONS.filter((d) => mobilityOk(d) && restOk(d) && styleOk(d));

    if (survey.keyword) {
      const kw = survey.keyword.toLowerCase();
      const byKeyword = DESTINATIONS.filter(
        (d) => d.name.toLowerCase().includes(kw) && mobilityOk(d) && restOk(d)
      );
      if (byKeyword.length > 0) list = byKeyword;
    }

    if (list.length === 0) {
      list = DESTINATIONS.filter((d) => mobilityOk(d) && restOk(d)).slice(0, 5);
    }
    return list.slice(0, 6);
  }

  function buildPlanHTML(survey, destinations) {
    const durationText =
      survey.duration === 1 ? '당일치기' : survey.duration <= 3 ? `${survey.duration - 1}박 ${survey.duration}일` : `${survey.duration}일 내외`;
    const styleText = STYLE_MAP[survey.style] || survey.style;

    let destList = destinations.map((d) => `<li>${d.name}</li>`).join('');

    let tips = [];
    if (survey.rest === 'high') {
      tips.push('일정에 휴식 시간을 충분히 넣고, 오전·오후 한 곳씩만 움직이면 좋습니다.');
    }
    if (survey.mobility === 'limited') {
      tips.push('휠체어 접근 가능 시설·교통을 미리 확인하시면 편합니다.');
    }
    if (survey.diet !== 'none') {
      tips.push('식이 제한이 있으시면 숙소 근처 병원·약국 위치를 미리 알아두세요.');
    }
    if (survey.medical !== 'none') {
      tips.push('복용 약은 여행 기간+여유분을 챙기고, 병원 연락처를 저장해 두세요.');
    }
    tips.push('날씨와 체력에 맞춰 일정을 조절하시는 것이 좋습니다.');

    const tipsHTML = tips.map((t) => `<li>${t}</li>`).join('');

    return `
      <h3>${styleText}에 맞는 추천 여행</h3>
      <p>선택하신 <strong>${durationText}</strong>, 이동 편의성·휴식 필요도를 반영해 아래 여행지를 추천드립니다.</p>
      <ul class="plan-destinations">${destList}</ul>
      <div class="plan-tips">
        <h4>건강 맞춤 팁</h4>
        <ul>${tipsHTML}</ul>
      </div>
    `;
  }

  function showSection(section) {
    [DOM.sectionSurvey, DOM.sectionPlan, DOM.sectionGuide].forEach((el) => {
      if (el) el.classList.add('hidden');
    });
    if (section) section.classList.remove('hidden');
  }

  function fillGuideSelect(destinations) {
    if (!DOM.guideDestination) return;
    DOM.guideDestination.innerHTML = '<option value="">여행지 선택</option>' + destinations.map((d) => `<option value="${d.id}">${d.name}</option>`).join('');
  }

  function generateGuideHTML(destId, destName, survey) {
    const guides = {
      jeju: {
        intro: '제주도는 휴양과 자연을 동시에 즐기기 좋은 곳입니다. 건강과 이동성을 고려한 코스를 추천해 드립니다.',
        highlights: ['성산일출봉(전동차·쉬는 구간 활용 가능)', '섭지코지 산책', '오설록 티뮤지엄', '한담해안산책로'],
        tips: survey.rest === 'high' ? ['성산·서귀포 중 한 권역만 묶어서 움직이세요.', '렌터카·대절이 있으면 피로가 덜합니다.'] : ['일출·일몰 중 하나만 보셔도 충분합니다.'],
        caution: survey.medical !== 'none' ? '제주시·서귀포 시내에 대학병원·종합병원이 있으니 위치만 미리 확인하세요.' : '날씨가 변할 수 있으니 겉옷을 준비하세요.',
      },
      gangneung: {
        intro: '강릉·동해안은 바다와 커피, 맛집이 어우러진 휴양지입니다. 짧은 구간만 걸어도 경치를 즐기실 수 있습니다.',
        highlights: ['정동진·주문진 해변', '강릉 중앙시장', '경포대·안목해변', '오죽헌·선교장'],
        tips: ['해안도로 드라이브만 해도 힐링이 됩니다.', '중앙시장은 점심 시간대가 붐비니 오전을 추천합니다.'],
        caution: '동해안은 바람이 부는 날이 많아 겉옷을 챙기세요.',
      },
      busan: {
        intro: '부산은 대중교통이 잘 갖춰져 있어 이동이 수월합니다. 해운대·광안리·태종대 등 해변이 많아 휴양과 문화를 함께 즐기기 좋습니다.',
        highlights: ['해운대 해수욕장·동백섬', '광안리·달맞이길', '태종대', '자갈치시장·BIFF거리'],
        tips: survey.mobility === 'limited' ? ['지하철·버스 휠체어 이용 가능 노선을 미리 확인하세요.', '해운대·광안리 해변은 휠체어 접근 구간이 있습니다.'] : ['해운대와 광안리를 나눠서 가면 하루에 한 곳씩 여유 있게 다닐 수 있습니다.'],
        caution: '여름에는 자외선과 더위에 주의하세요.',
      },
      gyeongju: {
        intro: '경주는 역사와 자연을 함께 느낄 수 있는 도시입니다. 대릉원·첨성대·불국사 등 이동 거리를 줄이면 무리 없이 다니실 수 있습니다.',
        highlights: ['대릉원·첨성대', '불국사·석굴암', '양동마을', '경주월드(선택)'],
        tips: ['대릉원·첨성대 구간은 평지가 많아 걸어다니기 좋습니다.', '불국사는 계단이 있으니 체력에 맞춰 오르시면 됩니다.'],
        caution: '여름에는 그늘과 물 보충을 꼭 챙기세요.',
      },
      jeonju: {
        intro: '전주는 한옥마을과 맛집이 어우러진 도시입니다. 구도심이 좁아 걸어서 한 바퀴 도는 코스가 무난합니다.',
        highlights: ['전주한옥마을', '전주전통시장·경기전', '한지원·오목대', '풍남문 일대'],
        tips: ['한옥마을은 오전에 가면 인파가 덜합니다.', '전통시장에서 한정식·비빔밥을 맛보시면 좋습니다.'],
        caution: '한옥마을 내 골목은 비포장이 있을 수 있어 신발을 편하게 신으세요.',
      },
      sokcho: {
        intro: '속초·설악은 바다와 산을 동시에 즐길 수 있는 지역입니다. 해변 위주로만 다녀도 충분히 힐링이 됩니다.',
        highlights: ['속초해변·영금정', '설악산(케이블카)·비룡폭포', '청호동 해맞이공원', '속초중앙시장'],
        tips: survey.rest === 'high' ? ['설악산은 케이블카만 타고 내려다보는 코스로도 만족도가 높습니다.', '속초 해변만 산책해도 좋습니다.'] : ['영금정·청호동을 이어서 해안 산책을 즐겨보세요.'],
        caution: '가을·봄에는 일교차가 커서 겉옷을 준비하세요.',
      },
      tongyeong: {
        intro: '통영·거제는 남해의 푸른 바다와 섬이 인상적입니다. 배 타기와 해안 드라이브를 조합하면 무리 없이 다닐 수 있습니다.',
        highlights: ['통영케이블카·동피랑', '거제 외도·해금강', '한산도·미륵산', '통영中央시장'],
        tips: ['선박 일정은 날씨에 따라 변경될 수 있으니 전날 확인하세요.', '통영과 거제 중 하루에 한 곳씩 여유 있게 다니세요.'],
        caution: '선박 이용 시 멀미가 있으시면 멀미약을 준비하세요.',
      },
      pyeongchang: {
        intro: '평창·대관령은 시원한 고원과 숲이 있는 휴양지입니다. 짧은 산책과 드라이브 위주로 즐기기 좋습니다.',
        highlights: ['대관령 sheep farm·하늘목장', '알펜시아·휘닉스', '평창송어축제(시즌)', '용평·대명 리조트'],
        tips: ['고도가 높아 일교차가 크니 겉옷을 꼭 챙기세요.', '목장·리조트 위주로 가면 이동이 적어 편합니다.'],
        caution: '겨울에는 빙판에 주의하고, 평소 혈압·심장 관리가 있으시면 고도 변화를 고려하세요.',
      },
      yangyang: {
        intro: '양양·낙산은 동해안의 한적한 해변과 사찰이 있는 지역입니다. 해안 산책과 문화 탐방을 함께 즐기기 좋습니다.',
        highlights: ['낙산사·의상대', '죽도해변·하조대', '양양중앙시장', '서피비치'],
        tips: ['낙산사는 해안 절경이 좋고, 계단이 있는 구간은 체력에 맞춰 오르시면 됩니다.', '죽도·하조대는 해안 도로 드라이브만 해도 좋습니다.'],
        caution: '해안가 바람이 부는 날이 많아 겉옷을 준비하세요.',
      },
      suncheon: {
        intro: '순천·여수는 정원과 바다를 함께 즐길 수 있는 남해 지역입니다. 순천만·여수 해상케이블카 등 이동이 편한 코스가 많습니다.',
        highlights: ['순천만정원·순천만습지', '여수 해상케이블카·오동도', '선암사·송광사', '여수 오동도·예술랜드'],
        tips: ['순천만은 전동차·자전거로 넓은 구간을 편하게 둘러보실 수 있습니다.', '여수는 해상케이블카와 오동도만 가도 하루 코스로 충분합니다.'],
        caution: '습지는 모기와 햇빛에 대비하세요.',
      },
    };

    const g = guides[destId] || {
      intro: `${destName}은(는) 건강과 성향에 맞춰 여유 있게 다니시면 좋은 여행지입니다.`,
      highlights: ['대표 관광지 2~3곳을 골라 하루에 한 곳씩 여유 있게 다니세요.'],
      tips: ['휴식과 수분 섭취를 자주 하시고, 무리하지 마세요.'],
      caution: '날씨와 체력에 맞춰 일정을 조절하세요.',
    };

    const highlightsList = g.highlights.map((h) => `<li>${h}</li>`).join('');
    const tipsList = g.tips.map((t) => `<li>${t}</li>`).join('');

    return `
      <h3>${destName} AI 가이드</h3>
      <p>${g.intro}</p>
      <div class="guide-section">
        <h4>추천 코스·볼거리</h4>
        <ul>${highlightsList}</ul>
      </div>
      <div class="guide-section">
        <h4>이동·일정 팁</h4>
        <ul>${tipsList}</ul>
      </div>
      <div class="guide-section">
        <h4>건강·주의사항</h4>
        <p>${g.caution}</p>
      </div>
    `;
  }

  function renderGuide(destId, destName) {
    if (!lastSurvey) return;
    const html = generateGuideHTML(destId, destName, lastSurvey);
    DOM.guideContent.innerHTML = html;
  }

  function showLoadingGuide() {
    DOM.guideContent.innerHTML = '<p class="guide-loading">가이드를 생성하고 있습니다...</p>';
  }

  // Form submit → plan
  DOM.surveyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const survey = getSurveyData();
    if (!survey) return;

    lastSurvey = survey;
    const destinations = matchDestinations(survey);
    lastPlan = { survey, destinations };

    DOM.planContent.innerHTML = buildPlanHTML(survey, destinations);
    fillGuideSelect(destinations);
    showSection(DOM.sectionPlan);
  });

  // Back to survey
  DOM.btnBackSurvey.addEventListener('click', function () {
    showSection(DOM.sectionSurvey);
  });

  // Plan → Guide
  DOM.btnToGuide.addEventListener('click', function () {
    if (!lastPlan) return;
    fillGuideSelect(lastPlan.destinations);
    DOM.guideDestination.value = lastPlan.destinations[0] ? lastPlan.destinations[0].id : '';
    if (lastPlan.destinations[0]) {
      renderGuide(lastPlan.destinations[0].id, lastPlan.destinations[0].name);
    } else {
      DOM.guideContent.innerHTML = '<p class="guide-placeholder">추천 여행지가 없습니다. 설문을 다시 진행해 주세요.</p>';
    }
    showSection(DOM.sectionGuide);
  });

  // Back to plan
  DOM.btnBackPlan.addEventListener('click', function () {
    showSection(DOM.sectionPlan);
  });

  // Guide destination change
  DOM.guideDestination.addEventListener('change', function () {
    const id = this.value;
    if (!id) {
      DOM.guideContent.innerHTML = '<p class="guide-placeholder">위에서 여행지를 선택하면 건강·성향에 맞는 AI 가이드를 보여드립니다.</p>';
      return;
    }
    const dest = (lastPlan && lastPlan.destinations.find((d) => d.id === id)) || DESTINATIONS.find((d) => d.id === id);
    const name = dest ? dest.name : id;
    renderGuide(id, name);
  });

  // Refresh guide (재생성 느낌으로 약간 지연 후 다시 렌더)
  DOM.btnRefreshGuide.addEventListener('click', function () {
    const id = DOM.guideDestination.value;
    if (!id) return;
    showLoadingGuide();
    const dest = (lastPlan && lastPlan.destinations.find((d) => d.id === id)) || DESTINATIONS.find((d) => d.id === id);
    const name = dest ? dest.name : id;
    setTimeout(function () {
      renderGuide(id, name);
    }, 600);
  });
})();
