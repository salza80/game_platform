ActiveAdmin.register Noun do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :word, :english, :gender_id, :language_level_id
  #
  # or
  #
  permit_params do
    permitted = [:word, :english, :gender_id, :language_levels_id]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end

  
end
