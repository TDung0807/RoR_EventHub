class Restaurant < ApplicationRecord
  has_many :dishes, dependent: :destroy
  has_many :groups, dependent: :destroy
end
