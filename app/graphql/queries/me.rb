module Queries
  class Me < GraphQL::Schema::Resolver
  
    type Types::UserType, null: true
    description 'Returns the current user'

    def resolve
      puts context[:current_user]
      context[:current_user]
    end
  end
end