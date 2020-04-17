module Types
  class GameOne < Types::BaseObject
    field :question, String, null: false
    field :answer, String, null: false
    field :tip, String, null: false
  end
end