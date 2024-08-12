class GildedRose

  def initialize(items)
    @items = items
  end

  def update_quality()
    @items.each do |item|
      if item.name != "Aged Brie" and item.name != "Backstage passes to a TAFKAL80ETC concert"
        update_quality_for_non_legendary_item(item)
      elsif item.quality < 50
        item.quality += 1
        backstage_passes_update(item)
      end
      if item.name != "Sulfuras, Hand of Ragnaros"
        item.sell_in -= 1
      end
      if item.sell_in < 0
        if item.name == "Aged Brie"
          increase_quality_when_under_50(item)
        elsif item.name == "Backstage passes to a TAFKAL80ETC concert"
          item.quality = 0
        else
          update_quality_for_non_legendary_item(item)
        end
      end
    end
  end

  def backstage_passes_update(item)
    if item.name == "Backstage passes to a TAFKAL80ETC concert"
      increase_quality_when_under_50(item) if item.sell_in < 11
      increase_quality_when_under_50(item) if item.sell_in < 6
    end
  end

  private

  def increase_quality_when_under_50(item)
    if item.quality < 50
      item.quality += 1
    end
  end

  def update_quality_for_non_legendary_item(item)
    if item.quality > 0
      if item.name != "Sulfuras, Hand of Ragnaros"
        item.quality -= 1
      end
    end
  end
end

class Item
  attr_accessor :name, :sell_in, :quality

  def initialize(name, sell_in, quality)
    @name = name
    @sell_in = sell_in
    @quality = quality
  end

  def to_s()
    "#{@name}, #{@sell_in}, #{@quality}"
  end
end
