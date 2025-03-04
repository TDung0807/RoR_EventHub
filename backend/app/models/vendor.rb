class Vendor < ApplicationRecord
    has_many :transports, dependent: :destroy
    validates :name, presence: true, allow_blank: false
    validates :contact, presence: true, allow_blank: false, format: { with: /\A\d{10,15}\z/, message: "must be a valid phone number" }
    validates :distance_limit, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :time_limit, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :service, presence: true, allow_blank: false
  end
  