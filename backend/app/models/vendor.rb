class Vendor < ApplicationRecord
  has_many :transports, dependent: :destroy
end
