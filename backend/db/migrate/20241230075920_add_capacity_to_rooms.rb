class AddCapacityToRooms < ActiveRecord::Migration[8.0]
  def change
    add_column :rooms, :capacity, :integer
  end
end
