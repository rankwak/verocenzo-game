// 전역 변수로 모든 의상 아이템을 저장
let allClothingItems = [];

class ClothingItem {
    constructor(id, type, src) {
        this.id = id;
        this.type = type;
        this.src = src;
    }

    getHTML() {
        return `<div id="${this.id}" class="clothes-item" data-type="${this.type}">
                    <img src="${this.src}" alt="${this.id}">
                </div>`;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            src: this.src
        };
    }

    static fromJSON(json) {
        return new ClothingItem(json.id, json.type, json.src);
    }

    static getById(id) {
        return allClothingItems.find(item => item.id === id);
    }
}

function initializeWardrobe(clothingData) {
    allClothingItems = clothingData.map(item => new ClothingItem(item.id, item.type, item.src));
}

function getClothingItemsByType(type) {
    return allClothingItems.filter(item => item.type === type);
}

function addClothingItem(id, type, src) {
    const newItem = new ClothingItem(id, type, src);
    allClothingItems.push(newItem);
    return newItem;
}

function removeClothingItem(id) {
    const index = allClothingItems.findIndex(item => item.id === id);
    if (index !== -1) {
        allClothingItems.splice(index, 1);
        return true;
    }
    return false;
}

function renderWardrobe(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    allClothingItems.forEach(item => {
        container.innerHTML += item.getHTML();
    });
}

// 드래그 앤 드롭 기능을 위한 이벤트 리스너 추가
function addDragAndDropListeners() {
    const clothesItems = document.querySelectorAll('.clothes-item');
    const dollArea = document.getElementById('doll-area');

    clothesItems.forEach(item => {
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', dragStart);
    });

    dollArea.addEventListener('dragover', dragOver);
    dollArea.addEventListener('drop', drop);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text');
    const item = ClothingItem.getById(itemId);
    if (item) {
        // Doll 인스턴스의 wearItem 메서드 호출
        // 이 부분은 main.js에서 구현해야 합니다
        console.log(`Dropped item: ${item.id}`);
    }
}

// 모듈로 내보내기
export { 
    ClothingItem, 
    initializeWardrobe, 
    getClothingItemsByType, 
    addClothingItem, 
    removeClothingItem, 
    renderWardrobe,
    addDragAndDropListeners
};
