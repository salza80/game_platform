class AddUnconfirmedEmailToUsers < ActiveRecord::Migration[6.0]
  def change
  	add_column :users, :unconfirmed_email, :string
  end
end
