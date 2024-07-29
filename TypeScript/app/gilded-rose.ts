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

  updateNormal(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  get strategies() {
    return {
      "Aged Brie": this.updateBrie,
      "Backstage passes to a TAFKAL80ETC concert": this.updateBackstagePasses,
      "Sulfuras, Hand of Ragnaros": this.updateLegendary
    };
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      const updateItemStrategy = this.strategies[item.name];

      if (updateItemStrategy) {
        updateItemStrategy(item);
      } else {
        this.updateNormal(item);
      }
    }

    return this.items;
  }
}
