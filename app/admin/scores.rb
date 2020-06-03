ActiveAdmin.register Score do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :score_code, :user_name, :score, :game_id
  #
  # or
  #
  permit_params do
    permitted = [:score]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end

  form do |f|
    f.inputs do
      f.input :game, input_html: { disabled: true }
      f.input :user, input_html: { disabled: true }
      f.input :game_options, as: :string, input_html: { disabled: true }
      f.input :score
    end
    f.actions
  end 
  
end
