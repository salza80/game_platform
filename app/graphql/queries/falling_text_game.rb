module Queries
  class FallingTextGame < GraphQL::Schema::Resolver

    type Types::FallingTextGameType, null: false 
    description "A query to provide data for testing the falling text game"
    argument :topicCode, String, required: true
    argument :levelCode, String, required: true
    
    def resolve(topic_code:, level_code:)
      game = Game.find_by(game_code: "falling_text")
      words = Array.new
      if topic_code == "Conjugation"
          Verb.includes(:verb_forms).joins(:language_level).joins(:verb_forms).where("language_levels.level_code = :level_code AND verb_forms.form =:form", { level_code: level_code, form: "present" }).order(:infinitive).each do | verb |
            verb.verb_forms.each do | form |
              if ["ich", "du", "ihr", "es"].include?(form.subject)
                word = OpenStruct.new({ question: + "(" +  form.subject + ") " + verb.infinitive, answer: form.word, tip: verb.english, voice: form.subject + ' ' + form.word })
                words.push(word)
              end
            end
          end
      end

      if topic_code == "Past Participle"
          Verb.includes(:verb_forms).joins(:language_level).joins(:verb_forms).where("language_levels.level_code = :level_code AND verb_forms.form =:form", { level_code: level_code, form: "past_participle" }).order(:infinitive).each do | verb |
            verb.verb_forms.each do | form |
                aux = verb.auxiliary_verb == 'haben' ? 'hat' : 'ist'
                word = OpenStruct.new({ question: verb.infinitive, answer: form.word, tip: verb.english, voice: aux + ' ' + form.word })
                words.push(word)
            end
          end
      end

      if topic_code == "Vocabulary"
        Noun.includes(:gender).joins(:language_level).where("level_code = ?", level_code).order('LOWER(nouns.english)').each do |noun|
          word = OpenStruct.new({ question: noun.english, answer: noun.word, tip: noun.gender.definiteArticle, voice: noun.gender.definiteArticle + ' ' + noun.word  })
          words.push(word)
        end
      end
 
      OpenStruct.new({
        words: words
      })
    end
  end
end
