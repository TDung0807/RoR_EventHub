class RenameGroupColumns < ActiveRecord::Migration[8.0]
  def change
    rename_column :groups, :name, :group
    rename_column :groups, :status, :groupStatus
    rename_column :groups, :participants, :quantity
  end
end
