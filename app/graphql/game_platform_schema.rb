class GamePlatformSchema < GraphQL::Schema
  rescue_from(Errors::ValidationError) do |message|
    GraphQL::ExecutionError.new(message, extensions: {code: 'VALIDATION_ERROR'})
  end
	rescue_from ActiveRecord::RecordInvalid do |exception|
    record = exception.record
    errors = record.errors.map do |attr|
      {
        path: [attr.to_s.camelize(:lower)],
        explanation: record.errors.full_messages_for(attr)
      }
    end
    
    GraphQL::ExecutionError.new("Validation failed", {extensions: {code: 'VALIDATION_ERROR', problems: errors}})
	end
  rescue_from(StandardError) do |message|
    GraphQL::ExecutionError.new(message, extensions: {code: 'INTERNAL_SERVER_ERROR'})
  end

  mutation(Types::MutationType)
  query(Types::QueryType)
end
