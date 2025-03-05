class AddCascadeDeleteToEventGroupJoin < ActiveRecord::Migration[6.0]
  def change
    # Remove the existing foreign key constraint
    remove_foreign_key :events_groups, :events

    # Add the foreign key constraint with ON DELETE CASCADE
    add_foreign_key :events_groups, :events, on_delete: :cascade
  end
end
