module Types
  class GameScore < Types::BaseObject
    field :user, Types::UserType, null: false
    field :score, Integer, null: false
    field :created_at, String, null: false
  end
  
  class GameHighScores < Types::BaseObject
    field :game_code, String, null: false
    field :score_code, String, null: false
    field :game_title, String, null: false
    field :my_high_scores, [Types::GameScore], null: true
    field :high_scores_week, [Types::GameScore], null: false
    field :high_scores_all_time, [Types::GameScore], null: false
  end
end
