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
  validates :groupStatus, presence: true
  validates :quantity, numericality: { only_integer: true }
end
