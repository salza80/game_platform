class RemoveScoreCode < ActiveRecord::Migration[6.0]
  def change
  	remove_column :scores, :score_code, :string
  	remove_column :games, :score_code_pattern, :string
  end
end
