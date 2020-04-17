json.words @words do |word|
	json.question word.english
	json.answer word.word
	json.tip word.english
end