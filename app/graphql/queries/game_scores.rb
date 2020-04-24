module Queries
  class GameScores < GraphQL::Schema::Resolver

    type Types::GameHighScores, null: false 
    description "A query to provide high score list for a game / score code"
    argument :gameCode, String, required: true
    argument :scoreCode, String, required: true
    
    def resolve(game_code:, score_code:)
      game = Game.find_by(game_code: game_code)
      highScoresAllTime = game.scores.where("score_code= :score_code", { score_code: score_code }).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user_name => score.user_name,
          :score => score.score,
          :created_at => score.created_at
        })
      end

      highScoresWeek = game.scores.where("score_code= :score_code AND created_at >= :last_week", { score_code: score_code, last_week: Date.today - 1.week }).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user_name => score.user_name,
          :score => score.score,
          :created_at => score.created_at
        })
      end

      OpenStruct.new ({
        :game_code => game_code,
        :score_code => score_code,
        :game_title => game.game_title,
        :high_scores_week => highScoresWeek,
        :high_scores_all_time => highScoresAllTime
      })  
    end
  end
end


