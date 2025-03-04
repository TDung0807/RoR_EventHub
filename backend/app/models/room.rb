class Room < ApplicationRecord
    belongs_to :hotel
    validates :name, presence: true, allow_blank: false
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :remark, presence: true, allow_blank: true
    validates :room_type, presence: true, allow_blank: false
  end
  