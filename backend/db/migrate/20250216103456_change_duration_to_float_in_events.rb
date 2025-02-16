class ChangeDurationToFloatInEvents < ActiveRecord::Migration[8.0]
  def change
    change_column :events, :duration, :float
  end
end
