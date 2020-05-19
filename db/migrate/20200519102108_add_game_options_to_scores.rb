class AddGameOptionsToScores < ActiveRecord::Migration[6.0]
  def change
  	add_column :scores, :game_options, :jsonb, default: "{}"
  	add_index :scores, :game_options, using: :gin
  end
end
