class ChangeDistanceAndContactToString < ActiveRecord::Migration[8.0]
  def change
    change_column :hotels, :distance, :string
    change_column :hotels, :contact, :string
  end
end
