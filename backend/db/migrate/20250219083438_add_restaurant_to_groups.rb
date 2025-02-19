class AddRestaurantToGroups < ActiveRecord::Migration[8.0]
  def change
    add_reference :groups, :restaurant, null: false, foreign_key: true
  end
end
