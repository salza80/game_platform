module Types
  class FallingTextWords < Types::BaseObject
    field :question, String, null: false
    field :answer, String, null: false
    field :tip, String, null: false
  end
  
	class FallingTextGame < Types::BaseObject
    field :game_code, String, null: false
    field :score_code, String, null: false
    field :game_title, String, null: false
    field :game_short_desc, String, null:false
    field :game_desc, String, null:false
    field :words, [Types::FallingTextWords], null: false
  end
end