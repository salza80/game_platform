module Queries
  class FallingTextGame < GraphQL::Schema::Resolver

    type Types::FallingTextGame, null: false 
    description "A query to provide data for testing the falling text game"
    argument :topicCode, String, required: true
    argument :levelCode, String, required: true
    
    def resolve(topic_code:, level_code:)
      game = Game.find_by(game_code: "falling_text")
      words = Array.new
      if topic_code == "Konjugation"
          Verb.includes(:verb_forms).joins(:language_level).joins(:verb_forms).where("language_levels.level_code = :level_code AND verb_forms.form =:form", { level_code: level_code, form: "present" }).order(:infinitive).each do | verb |
            verb.verb_forms.each do | form |
              if ["ich", "du", "ihr", "es"].include?(form.subject)
                word = OpenStruct.new({ question: verb.infinitive + " (" +  form.subject + ")", answer: form.word, tip: form.word })
                words.push(word)
              end
            end
          end
      end

      if topic_code == "Vocabulary"
        Noun.joins(:language_level).where("level_code = ?", level_code).order(:english).each do |noun|
          word = OpenStruct.new({ question: noun.english, answer: noun.word, tip: noun.word })
          words.push(word)
        end
      end
 
      OpenStruct.new({
        game_code: game.game_code,
        score_code: topic_code + "_" + level_code,
        game_title: game.game_title,
        game_short_desc: game.game_short_desc,
        game_desc: game.game_desc,
        words: words
      })
    end
  end
end
