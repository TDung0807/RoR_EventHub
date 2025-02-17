class ChangeDurationStartHourEndHourToTimeInEvents < ActiveRecord::Migration[8.0]
  def change
    change_column :events, :startHour, :time, using: 'to_timestamp("startHour") AT TIME ZONE \'UTC\''
    change_column :events, :endHour, :time, using: 'to_timestamp("endHour") AT TIME ZONE \'UTC\''
  end
end
