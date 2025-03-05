class AddCascadeDeleteToEventGroupJoin < ActiveRecord::Migration[6.0]
  def change
    # Add the foreign key constraint with ON DELETE CASCADE to events_groups
    add_foreign_key :events_groups, :events, on_delete: :cascade
  end
end
