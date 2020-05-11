module Types
  class UserType < Types::BaseObject
  	field :id, Integer, null: true
    field :email, String, null: true
    field :displayName, String, null: true
    field :token, String, null: false
  end
end