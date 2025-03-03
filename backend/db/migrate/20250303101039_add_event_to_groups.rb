class AddEventToGroups < ActiveRecord::Migration[8.0]
  def change
    add_reference :groups, :event, null: false, foreign_key: true
  end
end
