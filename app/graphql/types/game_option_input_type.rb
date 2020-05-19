class Types::GameOptionInputType < Types::BaseInputObject
	description "A game option code and value"
  	argument :code, String, 'game option code', required: true
  	argument :value, String, 'game option value', required: true
end
