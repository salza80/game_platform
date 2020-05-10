class Mutations::User::UpdateUser < GraphQL::Schema::Mutation

  null true
  description "Update user"
  argument :displayName, String, required: true
  payload_type Types::UserType 

  def resolve(display_name:)
    user = context[:current_user]
    raise Errors::ValidationError.new  "User Update Failed - Not logged in" unless user
    user.update!(display_name: display_name)
    user
  end

end