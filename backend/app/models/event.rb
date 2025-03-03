class Event < ApplicationRecord
  # Validations
  validates :label, presence: true
  validates :date, presence: true
  validates :location, presence: true
  validates :participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :start_hour, presence: true
  validates :end_hour, presence: true

  validate :start_and_endHour_are_valid_times

  # Callbacks
  before_save :parse_and_calculate_duration
  before_save :set_participants_count

  # Associations
  belongs_to :user
  has_and_belongs_to_many :groups, join_table: 'events_groups'
  has_and_belongs_to_many :quests, after_add: :set_participants_count, after_remove: :set_participants_count
  before_save :convert_hours_format

  # Custom JSON Serialization
  def as_json(options = {})
    super(options).merge({
      start_hour: self[:start_hour],
      end_hour: self[:end_hour]
    })
  end
  private
  def convert_hours_format
    self.start_hour = startHour if startHour.present?
    self.end_hour = endHour if endHour.present?
  end
  def start_and_endHour_are_valid_times
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
      self.duration = ((end_time - start_time) / 1.hour).to_f.round(2)
    end
  end

  def set_participants_count(_quest = nil)
    self.participants = quests.sum(:participants_count)
  end
end
