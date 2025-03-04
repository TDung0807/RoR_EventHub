class Quest < ApplicationRecord
  
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: false
    validates :phone, presence: true, length: { minimum: 10, maximum: 15 }, numericality: true, allow_blank: false
    validates :name, presence: true, allow_blank: false
    has_and_belongs_to_many :events

    has_and_belongs_to_many :groups,
                           join_table: :groups_quests,
                           foreign_key: :quest_id, 
                           association_foreign_key: :group_id
  end
  