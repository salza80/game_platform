class CreateNouns < ActiveRecord::Migration[6.0]
  def change
    create_table :nouns do |t|
      t.string :word
      t.string :english
      t.references :gender, foreign_key: true, index:true
      t.references :language_level, foreign_key: true, index:true
      t.timestamps
    end
  end
end
