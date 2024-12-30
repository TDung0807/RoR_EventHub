class CreateTransports < ActiveRecord::Migration[8.0]
  def change
    create_table :transports do |t|
      t.string :type
      t.string :brand
      t.float :price
      t.timestamps
    end
  end
end
