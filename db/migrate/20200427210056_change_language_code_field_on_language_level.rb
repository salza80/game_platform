class ChangeLanguageCodeFieldOnLanguageLevel < ActiveRecord::Migration[6.0]
  def change
  	rename_column :language_levels, :short_desc, :level_code
  end
end
