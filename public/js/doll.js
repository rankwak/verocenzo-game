class Doll {
    constructor(baseImageSrc) {
        this.baseImageSrc = baseImageSrc;
        this.clothes = {
            top: null,
            bottom: null,
            shoes: null,
            accessory: null
        };
    }

    wearItem(item) {
        if (this.clothes.hasOwnProperty(item.type)) {
            this.clothes[item.type] = item;
        } else {
            console.error(`Invalid clothing type: ${item.type}`);
        }
    }

    removeItem(type) {
        if (this.clothes.hasOwnProperty(type)) {
            this.clothes[type] = null;
        } else {
            console.error(`Invalid clothing type: ${type}`);
        }
    }

    removeAllClothes() {
        for (let type in this.clothes) {
            this.clothes[type] = null;
        }
    }

    getHTML() {
        let html = `<div class="doll" style="position: relative;">`;
        html += `<img src="${this.baseImageSrc}" alt="Base doll" style="position: absolute; top: 0; left: 0;">`;
        
        for (let type in this.clothes) {
            if (this.clothes[type]) {
                html += `<img src="${this.clothes[type].src}" alt="${type}" style="position: absolute; top: 0; left: 0;">`;
            }
        }
        
        html += `</div>`;
        return html;
    }

    toJSON() {
        return {
            baseImageSrc: this.baseImageSrc,
            clothes: {
                top: this.clothes.top ? this.clothes.top.id : null,
                bottom: this.clothes.bottom ? this.clothes.bottom.id : null,
                shoes: this.clothes.shoes ? this.clothes.shoes.id : null,
                accessory: this.clothes.accessory ? this.clothes.accessory.id : null
            }
        };
    }

    static fromJSON(json, clothingItems) {
        const doll = new Doll(json.baseImageSrc);
        for (let type in json.clothes) {
            if (json.clothes[type]) {
                const item = clothingItems.find(item => item.id === json.clothes[type]);
                if (item) {
                    doll.wearItem(item);
                }
            }
        }
        return doll;
    }
}
