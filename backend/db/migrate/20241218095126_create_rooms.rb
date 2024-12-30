class CreateRooms < ActiveRecord::Migration[8.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.float :price
      t.string :remark
      t.string :type
      t.timestamps
    end
  end
end
