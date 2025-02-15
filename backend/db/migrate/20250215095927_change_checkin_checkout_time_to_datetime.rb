class ChangeCheckinCheckoutTimeToDatetime < ActiveRecord::Migration[8.0]
  def change
    change_column :hotels, :checkin_time, :datetime, using: 'to_timestamp(checkin_time) AT TIME ZONE \'UTC\''
    change_column :hotels, :checkout_time, :datetime, using: 'to_timestamp(checkout_time) AT TIME ZONE \'UTC\''
  end
end
