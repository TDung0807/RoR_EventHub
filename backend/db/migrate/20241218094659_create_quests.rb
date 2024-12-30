class CreateQuests < ActiveRecord::Migration[8.0]
  def change
    create_table :quests do |t|
      t.string :email
      t.string :phone
      t.string :name
      t.timestamps
    end
  end
end
