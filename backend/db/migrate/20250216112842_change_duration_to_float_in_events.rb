class ChangeDurationToFloatInEvents < ActiveRecord::Migration[7.0]
  def change
    change_column :events, :duration, 'float USING duration::float'
  end
end
