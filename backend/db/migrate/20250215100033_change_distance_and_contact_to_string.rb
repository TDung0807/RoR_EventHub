class ChangeDistanceAndContactToString < ActiveRecord::Migration[8.0]
  def change
    change_column :your_table_name, :distance, :string
    change_column :your_table_name, :contact, :string
  end
end
