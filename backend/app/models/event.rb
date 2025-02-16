class Event < ApplicationRecord
    validates :label, presence: true
    validates :date, presence: true
    validates :location, presence: true
    validates :participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  
    validate :start_and_end_hour_are_valid_times
  
    before_save :calculate_duration
  
    belongs_to :user
    has_and_belongs_to_many :groups
  
    private
  
    def start_and_end_hour_are_valid_times
      if startHour && !startHour.is_a?(Time)
        errors.add(:startHour, "must be a valid time")
      end
      if endHour && !endHour.is_a?(Time)
        errors.add(:endHour, "must be a valid time")
      end
    end
  
    def calculate_duration
      if startHour.present? && endHour.present?
        self.duration = ((endHour - startHour) / 1.hour).round(2)
      end
    end
  end
  