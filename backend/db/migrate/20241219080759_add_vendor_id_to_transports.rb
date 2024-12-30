class AddVendorIdToTransports < ActiveRecord::Migration[8.0]
  def change
    add_reference :transports, :vendor, null: false, foreign_key: true
  end
end
