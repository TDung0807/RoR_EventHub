class ChangeStatusToIntegerInGroupsQuests < ActiveRecord::Migration[8.0]
  def up
    # Step 1: Remove the default constraint
    change_column_default :groups_quests, :status, nil

    # Step 2: Convert existing values from string to integer manually
    execute <<-SQL
      UPDATE groups_quests 
      SET status = 
        CASE 
          WHEN status = 'pending' THEN 0 
          WHEN status = 'accepted' THEN 1 
          WHEN status = 'declined' THEN 2 
          ELSE 0 
        END
    SQL

    # Step 3: Change column type to integer
    change_column :groups_quests, :status, 'integer USING status::integer', null: false

    # Step 4: Reapply the default value
    change_column_default :groups_quests, :status, 0
  end

  def down
    # Reverse the process in case of rollback
    change_column_default :groups_quests, :status, nil

    execute <<-SQL
      UPDATE groups_quests 
      SET status = 
        CASE 
          WHEN status = 0 THEN 'pending' 
          WHEN status = 1 THEN 'accepted' 
          WHEN status = 2 THEN 'declined' 
          ELSE 'pending' 
        END
    SQL

    change_column :groups_quests, :status, :string, null: false
    change_column_default :groups_quests, :status, "pending"
  end
end
