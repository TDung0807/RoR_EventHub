class Transport < ApplicationRecord
    belongs_to :vendor
    has_one :group
    validates :transport_type, presence: true, allow_blank: false
    validates :brand, presence: true, allow_blank: false
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :vendor_id, presence: true
  end
  