module Types
  class UserType < Types::BaseObject
    field :email, String, null: true
    field :token, String, null: false
  end
end