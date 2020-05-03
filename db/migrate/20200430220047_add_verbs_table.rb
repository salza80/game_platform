class AddVerbsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :verbs do |t|
      t.string :infinitive, null: false
      t.string :english, null: false
      t.string :auxiliary_verb, null: false
      t.boolean :regular, null:false
      t.references :language_level, foreign_key: true, index:true
      t.timestamps
    end

    create_table :verb_forms do |t|
      t.string :form, null: false
      t.string :subject, null: true
      t.string :word, null: false
      t.references :verb, foreign_key: true, index:true, null: false
      t.timestamps
    end
  end
end
