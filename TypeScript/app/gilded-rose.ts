export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateBrie(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  updateBackstagePasses(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateLegendary(item: Item) {
    // do nothing
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == "Aged Brie") {
        this.updateBrie(this.items[i]);
        continue;
      }

      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePasses(this.items[i]);
        continue;
      }

      if (this.items[i].name == "Sulfuras, Hand of Ragnaros") {
        this.updateLegendary(this.items[i]);
        continue;
      }

      if (this.items[i].quality > 0) {
        this.items[i].quality = this.items[i].quality - 1;
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn < 0) {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }
    }

    return this.items;
  }
}
