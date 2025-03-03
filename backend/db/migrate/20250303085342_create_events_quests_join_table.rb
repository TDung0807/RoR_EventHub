class CreateEventsQuestsJoinTable < ActiveRecord::Migration[8.0]
  def change
    create_table :events_quests, id: false do |t|
      t.references :event, null: false, foreign_key: true
      t.references :quest, null: false, foreign_key: true

      t.index [:event_id, :quest_id], unique: true
    end
  end
end
