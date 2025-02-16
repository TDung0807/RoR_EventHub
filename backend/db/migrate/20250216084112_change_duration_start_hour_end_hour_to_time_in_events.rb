class ChangeDurationStartHourEndHourToTimeInEvents < ActiveRecord::Migration[8.0]
  def change
    change_column :events, :duration, :time
    change_column :events, :startHour, :time
    change_column :events, :endHour, :time
  end
end
