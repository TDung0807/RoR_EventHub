class CreateGroups < ActiveRecord::Migration[8.0]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :status
      t.integer :participants
      t.string :description
      t.string :hotel_remark
      t.string :transport_remark
      t.string :dish_remark
      t.timestamps
    end
  end
end
