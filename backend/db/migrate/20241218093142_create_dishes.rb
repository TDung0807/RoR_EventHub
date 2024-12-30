class CreateDishes < ActiveRecord::Migration[8.0]
  def change
    create_table :dishes do |t|
      t.string :name
      t.float :price
      t.string :description
      t.string :dish_type
      t.timestamps
    end
  end
end
