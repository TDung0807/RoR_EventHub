class Restaurant < ApplicationRecord
  has_many :dishes, dependent: :destroy
  has_many :groups, dependent: :destroy
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 100 }, allow_blank: false
  validates :address, presence: true, length: { maximum: 255 }, allow_blank: false
  validates :contact, presence: true, format: { with: /\A\d{10,15}\z/, message: "must be a valid phone number" }, allow_blank: false
  validates :cuisine, presence: true, length: { maximum: 50 }, allow_blank: false
end
