class GroupQuest < ApplicationRecord
    self.table_name = "groups_quests"
  
    belongs_to :group
    belongs_to :quest
  
    enum :status, { pending: 0, accepted: 1, declined: 2 }
  
    before_create :set_default_status
  
    private
  
    def set_default_status
      self.status ||= :pending # Use symbol instead of string
    end
  end
  