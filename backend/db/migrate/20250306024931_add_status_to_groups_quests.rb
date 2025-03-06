class AddStatusToGroupsQuests < ActiveRecord::Migration[8.0]
  def change
    add_column :groups_quests, :status, :string, default: "pending", null: false
  end
end
