class CreateGroupsDishesJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :groups_dishes do |t|
      t.references :group, null: false, foreign_key: true
      t.references :dish, null: false, foreign_key: true

      t.timestamps
    end

    add_index :groups_dishes, [:group_id, :dish_id], unique: true
  end
end
