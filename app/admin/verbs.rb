ActiveAdmin.register Verb do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :infinitive, :english, :auxiliary_verb, :regular, :language_level_id
  #
  # or
  #
  permit_params do
    permitted = [:english, :auxiliary_verb, :regular, :language_level_id]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end

  form do |f|
    f.inputs do
      f.input :infinitive, input_html: { disabled: true }
      f.input :english
      f.input :auxiliary_verb
      f.input :regular
      f.input :language_level
    end
    f.actions
  end 
  
end
