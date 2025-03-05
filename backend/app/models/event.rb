class Event < ApplicationRecord
  # Validations
  validates :label, presence: true
  validates :date, presence: true
  validates :location, presence: true
  validates :participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :start_hour, presence: true
  validates :end_hour, presence: true

  validate :start_and_end_hour_are_valid_times

  # Callbacks
  before_save :parse_and_calculate_duration

  # Associations
  belongs_to :user
  has_and_belongs_to_many :groups, join_table: 'events_groups', dependent: :destroy
  has_and_belongs_to_many :quests
  # Overriding the destroy method
  def destroy
    # First, dissociate the event from its groups
    groups.each do |group|
      group.events.delete(self)
    end
    super # Then, delete the event
  end
  private

  def start_and_end_hour_are_valid_times
    if start_hour.present?
      begin
        Time.parse(start_hour.to_s) 
      rescue ArgumentError
        errors.add(:start_hour, "must be a valid time")
      end
    end

    if end_hour.present?
      begin
        Time.parse(end_hour.to_s)
      rescue ArgumentError
        errors.add(:end_hour, "must be a valid time")
      end
    end
  end

  def parse_and_calculate_duration
    if start_hour.present? && end_hour.present?
      start_time = Time.parse(start_hour.to_s)
      end_time = Time.parse(end_hour.to_s)
      self.duration = ((end_time - start_time) / 1.hour).to_f.round(2)
    end
  end
end
