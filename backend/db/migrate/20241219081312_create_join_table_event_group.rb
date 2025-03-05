class CreateJoinTableEventGroup < ActiveRecord::Migration[8.0]
  def change
    create_join_table :events, :groups do |t|
      t.references :event, null: false, foreign_key: { on_delete: :cascade }
      t.references :group, null: false, foreign_key: { on_delete: :cascade }
      
      t.index [:event_id, :group_id], unique: true
      t.index [:group_id, :event_id]
    end
  end
end
