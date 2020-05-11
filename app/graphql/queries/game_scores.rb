module Queries
  class GameScores < GraphQL::Schema::Resolver

    type Types::GameHighScores, null: false 
    description "A query to provide high score list for a game / score code"
    argument :gameCode, String, required: true
    argument :scoreCode, String, required: true
    
    def resolve(game_code:, score_code:)
      strfCode = '%d %b %y %I:%M %p'
      game = Game.find_by(game_code: game_code)
      user = context[:current_user]

      myHighScores = nil
      if user 
        myHighScores = game.scores.includes(:user).where("score_code= :score_code AND user_id=:user", { score_code: score_code, user: user }).eager_load(:user).order(score: :desc).limit(20).map do |score|
          OpenStruct.new({
            :user => score.user,
            :score => score.score,
            :created_at => score.created_at.strftime(strfCode)
          })
        end
      end

      highScoresAllTime = game.scores.where("score_code=:score_code", { score_code: score_code }).eager_load(:user).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user => score.user,
          :score => score.score,
          :created_at => score.created_at.strftime(strfCode)
        })
      end

      highScoresWeek = game.scores.where("score_code= :score_code AND scores.created_at >= :last_week", { score_code: score_code, last_week: Date.today - 1.week }).eager_load(:user).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user => score.user,
          :score => score.score,
          :created_at => score.created_at.strftime(strfCode)
        })
      end

      OpenStruct.new ({
        :game_code => game_code,
        :score_code => score_code,
        :game_title => game.game_title,
        :my_high_scores => myHighScores,
        :high_scores_week => highScoresWeek,
        :high_scores_all_time => highScoresAllTime
      })  
    end
  end
end


