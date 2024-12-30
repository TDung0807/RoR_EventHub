class CreateJoinTableGroupQuest < ActiveRecord::Migration[8.0]
  def change
    create_join_table :groups, :quests do |t|
      t.index [:group_id, :quest_id] 
      t.index [:quest_id, :group_id] 
    end
  end
end
