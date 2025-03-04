class Dish < ApplicationRecord
  has_and_belongs_to_many :ingredients
  belongs_to :restaurant
  has_and_belongs_to_many :groups, join_table: 'groups_dishes'
end