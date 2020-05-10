class Mutations::User::UpdateUserPassword < GraphQL::Schema::Mutation

  null true
  description "Update user password"
  argument :password, String, required: false
  argument :passwordConfirmation, String, required: false
  payload_type Types::UserType 

  def resolve(
    password: context[:current_user] ? context[:current_user].password : '',
    password_confirmation: context[:current_user] ? context[:current_user].password_confirmation : ''
  )
    user = context[:current_user]
    raise Errors::ValidationError.new  "User Update Failed - Not logged in" unless user

    user.update!(
      password: password,
      password_confirmation: password_confirmation
    )
    user
  end

end