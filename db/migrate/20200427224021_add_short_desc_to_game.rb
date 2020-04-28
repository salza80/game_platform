class AddShortDescToGame < ActiveRecord::Migration[6.0]
  def change
  	add_column :games, :game_short_desc, :string
  end
end
