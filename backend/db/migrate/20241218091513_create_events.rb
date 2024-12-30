class CreateEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :date
      t.string :description
      t.float :duration
      t.string :address
      t.integer :participants
      t.float :startAt
      t.timestamps
    end
  end
end
