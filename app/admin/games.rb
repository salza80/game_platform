ActiveAdmin.register Game do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :game_code, :game_title, :game_desc, :game_short_desc
  #
  # or
  #
  permit_params do
    permitted = [:game_title, :game_desc, :game_short_desc]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end


  form do |f|
    f.inputs do
      f.input :game_code, input_html: { disabled: true }
      f.input :game_title
      f.input :game_desc
      f.input :game_short_desc
    end
    f.actions
  end
  
end
