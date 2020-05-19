module Queries
  class GameScores < GraphQL::Schema::Resolver

    type Types::GameHighScores, null: false 
    description "A query to provide high score list for a game / score code"
    argument :gameCode, String, required: true
    argument :gameOptions, [Types::GameOptionInputType], required: true
    
    def resolve(game_code:, game_options:)
      strfCode = '%d %b %y %I:%M %p'
      game = Game.find_by(game_code: game_code)
      user = context[:current_user]
      options = {}
      game_options.each do | option |
        options[option.code] = option.value
      end
      myHighScores = nil
      if user 
        myHighScores = game.scores.includes(:user).where("game_options @> :game_options AND user_id=:user", { game_options: options.to_json, user: user }).eager_load(:user).order(score: :desc).limit(20).map do |score|
          OpenStruct.new({
            :user => score.user,
            :score => score.score,
            :created_at => score.created_at.strftime(strfCode)
          })
        end
      end

      highScoresAllTime = game.scores.where("game_options @> :game_options", { game_options: options.to_json }).eager_load(:user).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user => score.user,
          :score => score.score,
          :created_at => score.created_at.strftime(strfCode)
        })
      end

      highScoresWeek = game.scores.where("game_options @> :game_options AND scores.created_at >= :last_week", { game_options: options.to_json, last_week: Date.today - 1.week }).eager_load(:user).order(score: :desc).limit(20).map do |score|
        OpenStruct.new({
          :user => score.user,
          :score => score.score,
          :created_at => score.created_at.strftime(strfCode)
        })
      end

      OpenStruct.new ({
        :game_code => game_code,
        :game_title => game.game_title,
        :game_options => game_options,
        :my_high_scores => myHighScores,
        :high_scores_week => highScoresWeek,
        :high_scores_all_time => highScoresAllTime
      })  
    end
  end
end


