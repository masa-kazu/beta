class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :content, null: false
      t.boolean :complete, default: false, null: false

      t.timestamps
    end
  end
end
