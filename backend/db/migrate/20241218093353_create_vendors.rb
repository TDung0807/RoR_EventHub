class CreateVendors < ActiveRecord::Migration[8.0]
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :contact
      t.integer :distance_limit
      t.integer :time_limit
      t.string :service
      t.timestamps
    end
  end
end
