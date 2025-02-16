class ChangeDurationToFloatInEvents < ActiveRecord::Migration[7.0]
  def change
    change_column :events, :duration, 'float USING (EXTRACT(EPOCH FROM duration))'
  end
end
