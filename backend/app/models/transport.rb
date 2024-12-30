class Transport < ApplicationRecord
    belongs_to :vendor
    has_one :group
  end
  