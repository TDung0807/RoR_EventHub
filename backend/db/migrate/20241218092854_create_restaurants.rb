class CreateRestaurants < ActiveRecord::Migration[8.0]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :contact
      t.string :cuisine
      t.timestamps
    end
  end
end
