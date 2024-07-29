import {
  Item,
  GildedRose,
  NormalUpdateStrategy,
  BrieUpdateStrategy,
  UpdateStrategy,
  LegendaryUpdateStrategy,
  BackstagePassesUpdateStrategy,
} from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("Normal items", () => {
    it("should decrease quality by 1", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should decrease sellIn by 1", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
    });

    it("should decrease quality by 2 after sellIn", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should not decrease quality below 0", () => {
      const gildedRose = new GildedRose([new Item("foo", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should not decrease quality below 0 after sellIn", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("should increase quality by 1", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it("should increase quality by 2 after sellIn", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3);
    });
  });

  describe("Sulfuras", () => {
    it("should not change quality", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 1, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });

    it("should not change sellIn", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 1, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
    });
  });

  describe("Backstage passes", () => {
    it("should increase quality by 1", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    it("should increase quality by 2 when 10 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(3);
    });

    it("should increase quality by 3 when 5 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4);
    });

    it("should drop quality to 0 after sellIn", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  // Until the feature is developed
  describe.skip("Conjured items", () => {
    it("should decrease quality by 2", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should decrease quality by 4 after sellIn", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});

describe("Base Update Strategy", () => {
  const strategy = new UpdateStrategy();

  it("should throw an error", () => {
    const item = new Item("foo", 1, 1);
    expect(() => strategy.update(item)).toThrow();
  });
});

describe("Normal Update Strategy", () => {
  const strategy: NormalUpdateStrategy = new NormalUpdateStrategy();

  it("should decrease quality by 1", () => {
    const item = new Item("foo", 1, 1);
    strategy.update(item);
    expect(item.quality).toBe(0);
  });

  it("should decrease sellIn by 1", () => {
    const item = new Item("foo", 1, 1);
    strategy.update(item);
    expect(item.sellIn).toBe(0);
  });

  it("should decrease quality by 2 after sellIn", () => {
    const item = new Item("foo", 0, 2);
    strategy.update(item);
    expect(item.quality).toBe(0);
  });

  it("should not decrease quality below 0", () => {
    const item = new Item("foo", 1, 0);
    strategy.update(item);
    expect(item.quality).toBe(0);
  });

  it("should not decrease quality below 0 after sellIn", () => {
    const item = new Item("foo", 0, 0);
    strategy.update(item);
    expect(item.quality).toBe(0);
  });
});

describe("Aged Brie Update Strategy", () => {
  const strategy: BrieUpdateStrategy = new BrieUpdateStrategy();

  it("should increase quality by 1", () => {
    const item = new Item("Aged Brie", 1, 1);
    strategy.update(item);
    expect(item.quality).toBe(2);
  });

  it("should increase quality by 2 after sellIn", () => {
    const item = new Item("Aged Brie", 0, 1);
    strategy.update(item);
    expect(item.quality).toBe(3);
  });

  it("should not increase quality above 50", () => {
    const item = new Item("Aged Brie", 1, 50);
    strategy.update(item);
    expect(item.quality).toBe(50);
  });

  it("should not increase quality above 50 after sellIn", () => {
    const item = new Item("Aged Brie", 0, 50);
    strategy.update(item);
    expect(item.quality).toBe(50);
  });

  it("should decrease sellIn by 1", () => {
    const item = new Item("Aged Brie", 1, 1);
    strategy.update(item);
    expect(item.sellIn).toBe(0);
  });

  it("should decrease sellIn by 1 after sellIn", () => {
    const item = new Item("Aged Brie", 0, 1);
    strategy.update(item);
    expect(item.sellIn).toBe(-1);
  });
});

describe("Legendary Update Strategy", () => {
  const strategy: LegendaryUpdateStrategy = new LegendaryUpdateStrategy();

  it("should not change quality", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 1, 80);
    strategy.update(item);
    expect(item.quality).toBe(80);
  });

  it("should not change sellIn", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 1, 80);
    strategy.update(item);
    expect(item.sellIn).toBe(1);
  });
});

describe("Backstage Passes Update Strategy", () => {
  const strategy: BackstagePassesUpdateStrategy =
    new BackstagePassesUpdateStrategy();

  it("should increase quality by 1", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1);
    strategy.update(item);
    expect(item.quality).toBe(2);
  });

  it("should increase quality by 2 when 10 days or less", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1);
    strategy.update(item);
    expect(item.quality).toBe(3);
  });

  it("should increase quality by 3 when 5 days or less", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1);
    strategy.update(item);
    expect(item.quality).toBe(4);
  });

  it("should drop quality to 0 after sellIn", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50);
    strategy.update(item);
    expect(item.quality).toBe(0);
  });

  it("should decrease sellIn by 1", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1);
    strategy.update(item);
    expect(item.sellIn).toBe(0);
  });

  it("should decrease sellIn by 1 after sellIn", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1);
    strategy.update(item);
    expect(item.sellIn).toBe(-1);
  });
});
