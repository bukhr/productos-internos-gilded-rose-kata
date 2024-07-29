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
  update(_item: Item): Item {
    throw new Error("Not implemented");
  }
}

export class BrieUpdateStrategy extends UpdateStrategy {
  update(item: Item): Item {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1;
    }

    return item;
  }
}

export class BackstagePassesUpdateStrategy extends UpdateStrategy {
  changeRate(item: Item): number {
    if (item.sellIn < 6) {
      return 3;
    } else if (item.sellIn < 11) {
      return 2;
    }
    return 1;
  }

  update(item: Item): Item {
    const changeRate = this.changeRate(item);

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
      return item;
    }

    item.quality = Math.min(50, item.quality + changeRate);
    return item;
  }
}

export class LegendaryUpdateStrategy extends UpdateStrategy {
  update(item: Item): Item {
    return item;
  }
}

export class ConjuredUpdateStrategy extends UpdateStrategy {
  changeRate(item: Item): number {
    return item.sellIn < 0 ? -4 : -2;
  }

  update(item: Item): Item {
    item.sellIn = item.sellIn - 1;
    item.quality = Math.max(0, item.quality + this.changeRate(item));
    return item;
  }
}

export class NormalUpdateStrategy extends UpdateStrategy {
  changeRate(item: Item): number {
    return item.sellIn < 0 ? -2 : -1;
  }

  update(item: Item): Item {
    item.sellIn = item.sellIn - 1;
    item.quality = Math.max(0, item.quality + this.changeRate(item));
    return item;
  }
}

export class GildedRose {
  items: Array<Item>;
  strategies: { [key: string]: UpdateStrategy };

  constructor(items = [] as Array<Item>) {
    this.items = items;
    this.strategies = {
      "Aged Brie": new BrieUpdateStrategy(),
      "Backstage passes to a TAFKAL80ETC concert":
        new BackstagePassesUpdateStrategy(),
      "Sulfuras, Hand of Ragnaros": new LegendaryUpdateStrategy(),
      "Conjured Mana Cake": new ConjuredUpdateStrategy(),
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
