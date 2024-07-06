// 전역 변수
let currentDoll = null;
let currentClothes = [];

// DOM 요소
const dollArea = document.getElementById('doll');
const clothesItems = document.getElementById('clothes-items');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const shareBtn = document.getElementById('share-btn');

// 게임 초기화
function initGame() {
    loadDoll();
    loadClothes();
    addEventListeners();
}

// 인형 로드
function loadDoll() {
    currentDoll = new Doll('base-doll.png');
    dollArea.innerHTML = currentDoll.getHTML();
}

// 옷 아이템 로드
function loadClothes() {
    const clothes = [
        { id: 'shirt1', type: 'top', src: 'shirt1.png' },
        { id: 'pants1', type: 'bottom', src: 'pants1.png' },
        // 추가 옷 아이템들...
    ];

    clothes.forEach(item => {
        const clothingItem = new ClothingItem(item.id, item.type, item.src);
        clothesItems.innerHTML += clothingItem.getHTML();
    });
}

// 이벤트 리스너 추가
function addEventListeners() {
    clothesItems.addEventListener('click', onClothesItemClick);
    saveBtn.addEventListener('click', onSave);
    resetBtn.addEventListener('click', onReset);
    shareBtn.addEventListener('click', onShare);
}

// 옷 아이템 클릭 이벤트 핸들러
function onClothesItemClick(event) {
    if (event.target.classList.contains('clothes-item')) {
        const itemId = event.target.id;
        const item = ClothingItem.getById(itemId);
        if (item) {
            currentDoll.wearItem(item);
            updateDollDisplay();
        }
    }
}

// 인형 디스플레이 업데이트
function updateDollDisplay() {
    dollArea.innerHTML = currentDoll.getHTML();
}

// 저장 버튼 클릭 이벤트 핸들러
function onSave() {
    const saveData = {
        doll: currentDoll.toJSON(),
        clothes: currentClothes.map(item => item.toJSON())
    };
    localStorage.setItem('dollGameSave', JSON.stringify(saveData));
    alert('게임이 저장되었습니다!');
}

// 초기화 버튼 클릭 이벤트 핸들러
function onReset() {
    currentDoll.removeAllClothes();
    currentClothes = [];
    updateDollDisplay();
    alert('게임이 초기화되었습니다!');
}

// 공유 버튼 클릭 이벤트 핸들러
function onShare() {
    // 공유 기능 구현 (예: URL 생성)
    alert('공유 기능은 아직 구현되지 않았습니다.');
}

// 게임 시작
document.addEventListener('DOMContentLoaded', initGame);
