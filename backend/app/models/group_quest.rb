class GroupQuest < ApplicationRecord
    self.table_name = "groups_quests"
  
    belongs_to :group
    belongs_to :quest
  
    enum status: { pending: "pending", accepted: "yes", declined: "no" }
  end
  