class GamePlatformSchema < GraphQL::Schema
  rescue_from(Errors::ValidationError) do |message|
    GraphQL::ExecutionError.new(message, extensions: {code: 'VALIDATION_ERROR'})
  end
 #  rescue_from ActiveRecord::RecordNotFound do |exception|
	# 	nil
	# end
	rescue_from ActiveRecord::RecordInvalid do |exception|
		GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
	end
  rescue_from(StandardError) do |message|
    GraphQL::ExecutionError.new(message, extensions: {code: 'INTERNAL_SERVER_ERROR'})
  end

  mutation(Types::MutationType)
  query(Types::QueryType)
end
