class Event < ApplicationRecord
    validates :label, presence: true
    validates :date, presence: true
    validates :location, presence: true
    validates :participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  
    validate :start_and_end_hour_are_valid_times
  
    before_save :parse_and_calculate_duration
  
    belongs_to :user
    has_and_belongs_to_many :groups
  
    private
  
    def start_and_end_hour_are_valid_times
      if startHour.present?
        begin
          Time.parse(startHour.to_s) 
        rescue ArgumentError
          errors.add(:startHour, "must be a valid time")
        end
      end
  
      if endHour.present?
        begin
          Time.parse(endHour.to_s)
        rescue ArgumentError
          errors.add(:endHour, "must be a valid time")
        end
      end
    end
  
    def parse_and_calculate_duration
        if startHour.present? && endHour.present?
          start_time = Time.parse(startHour.to_s)
          end_time = Time.parse(endHour.to_s)
      
          self.duration = ((end_time - start_time) / 1.hour).to_f.round(2) # Ensure it's a float
        end
      end
  end
  