class Dish < ApplicationRecord
  belongs_to :restaurant
  has_many :dish_ingredients
  has_many :ingredients, through: :dish_ingredients

  validates :name, presence: true, uniqueness: { scope: :restaurant_id, message: "Dish name must be unique within a restaurant" }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :dish_type, presence: true, allow_blank: false
end
