class GildedRose

  MAX_QUALITY = 50
  MIN_QUALITY = 0
  QUALITY_CHANGE = 1
  SELL_IN_EXPIRED = 0
  SELL_IN_10_DAYS = 10
  SELL_IN_5_DAYS = 5


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
    if item.quality > MIN_QUALITY
      item.quality -= QUALITY_CHANGE
    end
    item.sell_in -= 1
    if item.sell_in < SELL_IN_EXPIRED
      if item.quality > MIN_QUALITY
        item.quality = MIN_QUALITY
      end
    end
  end

  def update_aged_brie(item)
    if item.quality < MAX_QUALITY
      item.quality += QUALITY_CHANGE
    end
    item.sell_in -= 1
    if item.sell_in < SELL_IN_EXPIRED
      if item.quality < MAX_QUALITY
        item.quality += QUALITY_CHANGE
      end
    end
  end

  def update_legendary_item(item)
    # do nothing
  end

  def update_backstage_passes(item)
    item.sell_in -= 1
    if item.sell_in < SELL_IN_EXPIRED
      item.quality = MIN_QUALITY
    else
      item.quality += QUALITY_CHANGE if item.quality < MAX_QUALITY
      item.quality += QUALITY_CHANGE if item.sell_in < SELL_IN_10_DAYS && item.quality < MAX_QUALITY
      item.quality += QUALITY_CHANGE if item.sell_in < SELL_IN_5_DAYS && item.quality < MAX_QUALITY
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
