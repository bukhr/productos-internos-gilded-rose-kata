require 'rspec'

require File.join(File.dirname(__FILE__), 'gilded_rose')

describe GildedRose do
  context "update quality" do
    context "normal item" do
      it "does not change the name" do
        items = [Item.new("foo", 0, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].name).to eq "foo"
      end

      it "decreases the quality by 1" do
        items = [Item.new("foo", 0, 1)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 0
      end

      it "decreases the sell_in by 1" do
        items = [Item.new("foo", 1, 1)]
        GildedRose.new(items).update_quality()
        expect(items[0].sell_in).to eq 0
      end

      it "decreases the quality by 2 after sell_in date" do
        items = [Item.new("foo", 0, 2)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 0
      end

      it "after sell_in date, quality is 0" do
        items = [Item.new("foo", -1, 10)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 0
      end
    end

    context "Aged Brie" do
      it "increases the quality by 1" do
        items = [Item.new("Aged Brie", 2, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 1
      end

      it "decreases the sell_in by 1" do
        items = [Item.new("Aged Brie", 1, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].sell_in).to eq 0
      end

      it "increases the quality by 2 after sell_in date" do
        items = [Item.new("Aged Brie", 0, 2)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 4
      end

      it "quality is never more than 50" do
        items = [Item.new("Aged Brie", 0, 50)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 50
      end
    end

    context "Sulfuras, Hand of Ragnaros" do
      it "does not change the quality" do
        items = [Item.new("Sulfuras, Hand of Ragnaros", 0, 80)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 80
      end

      it "does not change the sell_in" do
        items = [Item.new("Sulfuras, Hand of Ragnaros", 0, 80)]
        GildedRose.new(items).update_quality()
        expect(items[0].sell_in).to eq 0
      end
    end

    context "Backstage passes to a TAFKAL80ETC concert" do
      it "increases the quality by 1 when sell_in > 10" do
        items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 11, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 1
      end

      it "increases the quality by 2 when sell_in <= 10 and > 5" do
        items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 10, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 2
      end

      it "increases the quality by 3 when sell_in <= 5 and > 0" do
        items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 5, 0)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 3
      end

      it "quality is 0 after sell_in date" do
        items = [Item.new("Backstage passes to a TAFKAL80ETC concert", 0, 10)]
        GildedRose.new(items).update_quality()
        expect(items[0].quality).to eq 0
      end
    end
  end
end
