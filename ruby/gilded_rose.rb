class GildedRose

  def initialize(items)
    @items = items
  end
  
  def update_quality()
    @items.each do |item|
      case item.name
      when  "Aged Brie"
        update_aged_brie(item)
      when "Sulfuras, Hand of Ragnaros"
        update_legendary_item(item)
      when "Backstage passes to a TAFKAL80ETC concert"
        update_backstage_passes(item)
      else
        update_normal_item(item)
      end
    end
  end

  private

  def update_normal_item(item)
    if item.quality > 0
      item.quality -= 1
    end
    item.sell_in -= 1
    if item.sell_in < 0
      if item.quality > 0
        item.quality = 0
      end
    end
  end

  def update_aged_brie(item)
    if item.quality < 50
      item.quality += 1
    end
    item.sell_in -= 1
    if item.sell_in < 0
      if item.quality < 50
        item.quality += 1
      end
    end
  end

  def update_legendary_item(item)
    # do nothing
  end

  def update_backstage_passes(item)
    item.sell_in -= 1
    if item.sell_in < 0
      item.quality = 0
    else
      item.quality += 1 if item.quality < 50
      item.quality += 1 if item.sell_in < 10 && item.quality < 50
      item.quality += 1 if item.sell_in < 5 && item.quality < 50
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
