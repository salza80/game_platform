class CreateLanguageLevels < ActiveRecord::Migration[6.0]
  def change
    create_table :language_levels do |t|
      t.string :short_desc, limit: 2

      t.timestamps
    end
  end
end
