class CreateGenders < ActiveRecord::Migration[6.0]
  def change
    create_table :genders do |t|
      t.string :char_desc, limit: 1
      t.string :desc

      t.timestamps
    end
  end
end
