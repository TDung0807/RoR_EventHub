class Ingredient < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 100 }, allow_blank: false
  has_and_belongs_to_many :dishes
end
