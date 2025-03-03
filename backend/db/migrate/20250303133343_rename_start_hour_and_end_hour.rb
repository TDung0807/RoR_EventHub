class RenameStartHourAndEndHour < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :startHour, :start_hour
    rename_column :events, :endHour, :end_hour
  end
end
