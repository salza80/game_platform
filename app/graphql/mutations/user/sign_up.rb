class Mutations::User::SignUp < GraphQL::Schema::Mutation

  null true
  description "Sign up for users"
  argument :attributes, Types::UserInputType, required: true
  payload_type Types::UserType 

  def resolve(attributes:)
    user = context[:current_user]
    raise Errors::ValidationError.new  "You are already logged in!  Sign out first to create a new account." if user
    User.create!(attributes.to_kwargs)
  end
end