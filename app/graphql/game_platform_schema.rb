class GamePlatformSchema < GraphQL::Schema
  # rescue_from(Errors::ValidationError) do |message|
  #   GraphQL::ExecutionError.new(message, extensions: {code: 'VALIDATION_ERROR'})
  # end
 #  rescue_from ActiveRecord::RecordNotFound do |exception|
	# 	nil
	# end
	rescue_from ActiveRecord::RecordInvalid do |exception|
    record = exception.record
    errors = record.errors.map do |attr|
      {
        path: [attr.to_s.camelize(:lower)],
        explanation: record.errors.full_messages_for(attr)
      }
    end
    
    GraphQL::ExecutionError.new("Validation failed", {extensions: {code: 'VALIDATION_ERROR', problems: errors}})
    # GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"), extensions: {code: 'VALIDATION_ERROR'})
    # Errors::ModelValidationError.new("validation error", {extensions: {code: 'INTERNAL_SERVER_ERROR'}}, nil, record2)
    # GraphQL::ExecutionError.new(errors, extensions: {code: 'VALIDATION_ERROR'})
  #   puts exception.record.class.name
		# GraphQL::ExecutionError.new(exception.record.errors.full_messages.join("\n"))
	end
  rescue_from(StandardError) do |message|
    GraphQL::ExecutionError.new(message, extensions: {code: 'INTERNAL_SERVER_ERROR'})
  end

  mutation(Types::MutationType)
  query(Types::QueryType)
end
