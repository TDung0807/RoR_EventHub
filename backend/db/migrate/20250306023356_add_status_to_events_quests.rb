class AddStatusToEventsQuests < ActiveRecord::Migration[8.0]
  def change
    add_column :events_quests, :status, :string, default: "pending", null: false
  end
end
