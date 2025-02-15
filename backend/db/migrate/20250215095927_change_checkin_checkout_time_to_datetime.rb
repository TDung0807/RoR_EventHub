class ChangeCheckinCheckoutTimeToDatetime < ActiveRecord::Migration[8.0]
  def change
    change_column :hotels, :checkin_time, :datetime, using: 'checkin_time AT TIME ZONE \'UTC\' AT TIME ZONE \'+07:00\''
    change_column :hotels, :checkout_time, :datetime, using: 'checkin_time AT TIME ZONE \'UTC\' AT TIME ZONE \'+07:00\''
  end
end
