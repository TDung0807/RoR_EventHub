class AddRemarkToTransports < ActiveRecord::Migration[8.0]
  def change
    add_column :transports, :remark, :string
  end
end
