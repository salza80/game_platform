ActiveAdmin.register VerbForm do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :form, :subject, :word, :verb_id
  #
  # or
  #
  permit_params do
    permitted = [:word]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end

  form do |f|
    f.inputs do
      f.input :verb, input_html: { disabled: true }
      f.input :form, input_html: { disabled: true }
      f.input :subject, input_html: { disabled: true }
      f.input :word
    end
    f.actions
  end 
  
end
