class RenameTypeColumnInRooms < ActiveRecord::Migration[8.0]
  def change
    rename_column :rooms, :type, :room_type 
  end
end
