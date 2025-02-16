class Event < ApplicationRecord
    validates :label, presence: true
    validates :date, presence: true
    validates :description, presence: false
    validates :duration, numericality: { greater_than: 0 }, allow_nil: true
    validates :address, presence: true
    validates :participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
    validates :startAt, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
    belongs_to :user
    has_and_belongs_to_many :groups
end
