class AddUniqueIndexToIngredientsName < ActiveRecord::Migration[8.0]
  def change
    add_index :ingredients, :name, unique: true
  end
end
