class Group < ApplicationRecord
  # Relationships
  has_and_belongs_to_many :quests, 
                          join_table: :groups_quests, 
                          foreign_key: :group_id, 
                          association_foreign_key: :quest_id

  has_and_belongs_to_many :events, join_table: 'events_groups'
  has_and_belongs_to_many :dishes, join_table: 'groups_dishes'

  belongs_to :hotel
  belongs_to :restaurant
  belongs_to :transport, optional: true

  # Validations
  validates :group, presence: true, uniqueness: true, allow_blank: false
  validates :groupStatus, presence: true, allow_blank: false
  validates :quantity, numericality: { greater_than_or_equal_to: 0}
  validates :description, length: { maximum: 500 }, allow_blank: true
end
