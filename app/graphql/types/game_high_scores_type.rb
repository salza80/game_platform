module Types
  class GameScoreType < Types::BaseObject
    field :user, Types::UserType, null: false
    field :score, Integer, null: false
    field :created_at, String, null: false
  end
  
  class GameHighScoresType < Types::BaseObject
    field :game_code, String, null: false
    field :game_options, [Types::GameOptionType], null: true
    field :my_high_scores, [Types::GameScoreType], null: true
    field :high_scores_week, [Types::GameScoreType], null: true
    field :high_scores_all_time, [Types::GameScoreType], null: true
  end
end
