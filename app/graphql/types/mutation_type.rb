module Types
  class MutationType < Types::BaseObject
    field :create_score, mutation: Mutations::CreateScore

    field :login, mutation: Mutations::User::Login
  end
end
