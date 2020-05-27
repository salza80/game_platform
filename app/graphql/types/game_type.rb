module Types
  class GameType < Types::BaseObject
    field :game_code, String, null: false
    field :game_title, String, null: false
    field :game_short_desc, String, null:false
    field :game_desc, String, null:false
  end
end