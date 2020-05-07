class Mutations::User::Logout < GraphQL::Schema::Mutation

  null true
  description "Logout for users"
  payload_type Boolean

  def resolve
    if context[:current_user]
      User.revoke_token(context[:token])
      return true
    end 
    true
  end
end