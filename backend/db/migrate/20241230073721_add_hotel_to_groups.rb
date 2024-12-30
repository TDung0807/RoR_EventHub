class AddHotelToGroups < ActiveRecord::Migration[8.0]
  def change
    add_reference :groups, :hotel, null: false, foreign_key: true
  end
end
