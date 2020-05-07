module Types
  class MutationType < Types::BaseObject
    field :create_score, mutation: Mutations::CreateScore

    field :login, mutation: Mutations::User::Login
    field :logout, mutation: Mutations::User::Logout
    field :signUp, mutation: Mutations::User::SignUp
    field :updateUser, mutation: Mutations::User::UpdateUser
    field :updateUserPassword, mutation: Mutations::User::UpdateUserPassword
  end
end
