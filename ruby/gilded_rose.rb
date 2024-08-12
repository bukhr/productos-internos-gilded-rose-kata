class GildedRose

  def initialize(items)
    @items = items
  end
  
  def update_quality()
    @items.each do |item|
      case item.name
      when  "Aged Brie"
        AgedBrie.new(item).update
      when "Sulfuras, Hand of Ragnaros"
        LegendaryItem.new(item).update
      when "Backstage passes to a TAFKAL80ETC concert"
        BackstagePass.new(item).update
      else
        NormalItem.new(item).update
      end
    end
  end
end

class Item
  attr_accessor :name, :sell_in, :quality

  MAX_QUALITY = 50
  MIN_QUALITY = 0
  QUALITY_CHANGE = 1
  SELL_IN_EXPIRED = 0
  SELL_IN_10_DAYS = 10
  SELL_IN_5_DAYS = 5

  def initialize(name, sell_in, quality)
    @name = name
    @sell_in = sell_in
    @quality = quality
  end

  def to_s()
    "#{@name}, #{@sell_in}, #{@quality}"
  end
end

class NormalItem < Item

  def initialize(item)
    @item = item
  end

  def update()
    if @item.quality > MIN_QUALITY
      @item.quality -= QUALITY_CHANGE
    end
    @item.sell_in -= 1
    if @item.sell_in < SELL_IN_EXPIRED
      if @item.quality > MIN_QUALITY
        @item.quality = MIN_QUALITY
      end
    end
  end
end

class AgedBrie < Item

  def initialize(item)
    @item = item
  end

  def update()
    if @item.quality < MAX_QUALITY
      @item.quality += QUALITY_CHANGE
    end
    @item.sell_in -= 1
    if @item.sell_in < SELL_IN_EXPIRED
      if @item.quality < MAX_QUALITY
        @item.quality += QUALITY_CHANGE
      end
    end
  end
end

class LegendaryItem < Item

  def initialize(item)
    @item = item
  end

  def update()
    # do nothing
  end
end

class BackstagePass < Item

  def initialize(item)
    @item = item
  end

  def update()
    @item.sell_in -= 1
    if @item.sell_in < SELL_IN_EXPIRED
      @item.quality = MIN_QUALITY
    else
      @item.quality += QUALITY_CHANGE if @item.quality < MAX_QUALITY
      @item.quality += QUALITY_CHANGE if @item.sell_in < SELL_IN_10_DAYS && @item.quality < MAX_QUALITY
      @item.quality += QUALITY_CHANGE if @item.sell_in < SELL_IN_5_DAYS && @item.quality < MAX_QUALITY
    end
  end
end