class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
    	t.string :score_code
    	t.string :user_name
    	t.integer :score
      t.timestamps
      t.references :game, foreign_key: true, index:true
    end
  end
end
