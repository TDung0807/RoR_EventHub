class Hotel < ApplicationRecord
    has_many :rooms, dependent: :destroy
    has_many :groups
    validates :name, presence: true, uniqueness: true, allow_blank: false
    validates :address, presence: true, allow_blank: false
    validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true
    validates :star, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 5 }, allow_nil: true
    validates :checkout_time, presence: true, allow_blank: false
    validates :checkin_time, presence: true, allow_blank: false
    validates :distance, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
    validates :contact, presence: true, allow_blank: false
  end
      