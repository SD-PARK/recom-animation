/** 애니메이션 정보 출력 관련 Element */
const title = document.getElementById('title');
const poster = document.getElementById('poster');
const rated = document.getElementById('rated');
const aired = document.getElementById('aired');
const summary = document.getElementById('summary');
const studio = document.getElementById('studio');
const streams = document.getElementById('streams');
/** 화살표 Element */
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

const animes = [
    {title: "【최애의 아이】", image: "최애의아이.webp", rated: 15, aired: 2023, tags: ["환생", "아이돌", "연예계", "성장"], 
    summary: `"이 연예계에서 거짓말은 무기다."<br><br>
    지방 도시에서 일하는 산부인과 의사 고로.<br>
    어느 날, '최애' 아이돌 'B코마치'의 멤버 아이가 그의 앞에 나타난다.<br><br>
    그녀는 어떤 금단의 비밀을 품고 있었는데...<br>
    그런 두 사람의 '최악'의 만남에서부터 운명이 움직이기 시작한다.`,
    studio: "동화공방.svg",
    streams: ["aniplus", "laftel", "netflix", "serieson", "tving", "watcha", "wavve"],},

    {title: "빙과", image: "빙과.webp", rated: 15, aired: 2012, tags: ["추리", "청춘"],
    summary: `에너지 보존을 신조로 삼고 있는 고교생, 오레키 호타로는 누나의 명령으로 폐부 직전의 클럽, 고전부에 입부하게 된다.<br><br>
    고전부에서 만나게 된 호기심 만발의 소녀, 치탄다 에루.<br>
    그리고 중학 시절부터 함께한 후쿠베 사토시와 이바라 마야카.<br>
    이들 4명이 카미야마 고교를 무대로 벌어지는 수많은 사건들을 추리해나가는 청춘학원 미스테리.<br><br>
    '저, 신경쓰여요!' 호타로의 평온했던 잿빛 고교생활은 이 한마디로 급변하기 시작한다.`,
    studio: "교토 애니메이션.svg",
    streams: ["laftel"],},
    
    {title: "나츠메 우인장", image: "나츠메우인장.webp", rated: 15, aired: 2017, tags: ["드라마", "판타지", "일상", "치유"],
    summary: `어릴 적부터 요괴를 볼 수 있었던 소년 나츠메 타카시는,<br>
    할머니인 레이코의 유품 「우인장」을 물려받아, 자칭 경호원 야옹 선생과 함께, 우인장에 이름을 묶인 요괴들에게 이름을 돌려주는 나날을 보낸다.<br><br>
    요괴와, 그것에 관련된 인간과의 접촉을 통해, 자신이 나아가야 할 길을 모색하기 시작한 나츠메는, 생각을 공유할 수 있는 친구들에게도 도움을 받으면서, 소중한 나날을 지킬 방법을 찾으려 한다.`,
    studio: "슈카.svg",
    streams: ["laftel"],},
]
let animeCount = 0;

postAnimeInfo();

function nextAnime() {
    leftArrow.style.display = 'inline-block';
    animeCount++;
    postAnimeInfo();
    if (animes.length <= animeCount + 1) { rightArrow.style.display = 'none'; }
}

function prevAnime() {
    rightArrow.style.display = 'inline-block';
    animeCount--;
    postAnimeInfo();
    if (0 > animeCount - 1) { leftArrow.style.display = 'none'; }
}

/**
 * anime 배열과 animeCount 변수를 이용해 애니메이션 정보를 게시합니다.
 */
function postAnimeInfo() {
    title.textContent = animes[animeCount].title;
    poster.src = `./img/poster/${animes[animeCount].image}`;
    rated.src = `./img/rated/${animes[animeCount].rated}.png`;
    aired.textContent = animes[animeCount].aired + ' | ' + animes[animeCount].tags.join(', ');
    summary.innerHTML = animes[animeCount].summary;
    studio.innerHTML = `애니메이션 제작:<br><img src="./img/studio/${animes[animeCount].studio}">`;
    streams.innerHTML = `국내 스트리밍 서비스:<br>`;
    animes[animeCount].streams.forEach((stream) => {
        const imgElement = document.createElement('img');
        imgElement.src = `./img/stream/${stream}.svg`;
        streams.appendChild(imgElement);
    });
}