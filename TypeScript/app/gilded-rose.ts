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

export class UpdateStrategy {
  update(item: Item): void {
    throw new Error("Not implemented");
  }
}

export class BrieUpdateStrategy extends UpdateStrategy {
  update(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}

export class BackstagePassesUpdateStrategy extends UpdateStrategy {
  update(item: Item): void {
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
}

export class LegendaryUpdateStrategy extends UpdateStrategy {
  update(item: Item): void {
    // do nothing
  }
}

export class NormalUpdateStrategy extends UpdateStrategy {
  update(item: Item): void {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
}

export class GildedRose {
  items: Array<Item>;
  strategies: { [key: string]: UpdateStrategy };

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.strategies = {
      "Aged Brie": new BrieUpdateStrategy(),
      "Backstage passes to a TAFKAL80ETC concert": new BackstagePassesUpdateStrategy(),
      "Sulfuras, Hand of Ragnaros": new LegendaryUpdateStrategy(),
    };
  }

  updateQuality(): Array<Item> {
    this.items.forEach((item) => {
      const strategy = this.strategies[item.name] || new NormalUpdateStrategy();
      strategy.update(item);
    });

    return this.items;
  }
}
