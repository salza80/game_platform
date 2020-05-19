module Types
  class GameOption < Types::BaseObject
    field :code, String, null: false
    field :value, String, null: false
  end
end