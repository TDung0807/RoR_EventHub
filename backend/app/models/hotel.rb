class Hotel < ApplicationRecord
  has_many :rooms, dependent: :destroy
  has_many :groups
  def destroy
    rooms.each do |room|
      room.hotel = nil 
    end
    groups.each do |group|
      group.hotel = nil 
    end
    super 
  end
end
    