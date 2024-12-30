class CreateHotels < ActiveRecord::Migration[8.0]
  def change
    create_table :hotels do |t|
      t.string :name
      t.string :address
      t.float :rating
      t.float :star
      t.float :checkout_time
      t.float :checkin_time
      t.timestamps
    end
  end
end
