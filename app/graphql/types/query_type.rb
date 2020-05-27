module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :falling_text_game, resolver: Queries::FallingTextGame
    field :game_scores, resolver: Queries::GameScores

    field :game_details, resolver: Queries::GameDetails

    field :me, resolver: Queries::Me

  end
end
