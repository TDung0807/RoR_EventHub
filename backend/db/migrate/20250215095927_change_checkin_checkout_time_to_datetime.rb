class ChangeCheckinCheckoutTimeToDatetime < ActiveRecord::Migration[8.0]
  def change
    change_column :hotels, :checkin_time, :datetime
    change_column :hotels, :checkout_time, :datetime
  end
end
