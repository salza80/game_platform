class AddUserToScores < ActiveRecord::Migration[6.0]
  def change
  	add_reference :scores, :user, index: true
  	remove_column :scores, :user_name, :string
  end
end
