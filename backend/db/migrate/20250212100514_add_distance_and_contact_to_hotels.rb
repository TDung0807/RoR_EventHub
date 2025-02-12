class AddDistanceAndContactToHotels < ActiveRecord::Migration[8.0]
  def change
    add_column :hotels, :distance, :float
    add_column :hotels, :contact, :string
  end
end
