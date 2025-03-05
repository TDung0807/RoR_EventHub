class AddEventIdToGroups < ActiveRecord::Migration[8.0]
  def change
    add_column :groups, :event_id, :bigint
  end
end
