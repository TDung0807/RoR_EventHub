class UpdateEventsColumns < ActiveRecord::Migration[8.0]
  def change
    rename_column :events, :name, :label
    rename_column :events, :startAt, :startHour
    rename_column :events, :address, :location

    add_column :events, :groupLabel, :string
    add_column :events, :endHour, :float
  end
end
