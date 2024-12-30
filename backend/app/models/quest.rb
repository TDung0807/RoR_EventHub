class Quest < ApplicationRecord
  
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :phone, presence: true, length: { is: 10 }
  
    has_and_belongs_to_many :groups,
                           join_table: :groups_quests,
                           foreign_key: :quest_id, 
                           association_foreign_key: :group_id
  end
  