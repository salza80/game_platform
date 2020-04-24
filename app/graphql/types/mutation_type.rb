module Types
  class MutationType < Types::BaseObject
    field :create_score, mutation: Mutations::CreateScore
  end
end
