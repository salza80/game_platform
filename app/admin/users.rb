ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email, :display_name
  #
  # or
  #
  permit_params do
    permitted = [:email, :confirmed_at, :unconfirmed_email, :display_name]
    permitted << :other if params[:action] == 'create' && current_user.admin?
    permitted
  end


  form do |f|
    f.inputs do
      f.input :email
      f.input :confirmed_at
      f.input :unconfirmed_email
      f.input :display_name
    end
    f.actions
  end 
end
