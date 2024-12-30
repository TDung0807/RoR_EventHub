class RenameTypeColumnInTransports < ActiveRecord::Migration[8.0]
  def change
    rename_column :transports, :type, :transport_type
  end
end
