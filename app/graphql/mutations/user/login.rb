class Mutations::User::Login < GraphQL::Schema::Mutation

  null true
  description "Login for users"
  argument :email, String, required: true
  argument :password, String, required: true
  payload_type Types::UserType 

  def resolve(email:, password:)
    user = User.find_for_authentication(email: email)

    raise Errors::ValidationError.new  "Login Failed - Check your email and password" if !user
    
    is_valid_for_auth = user.valid_for_authentication?{
      user.valid_password?(password)
    }

    if user.requires_email_confirmation_before_login?
        raise Errors::ValidationError.new "Login Failed - You must confirm your email address"
    end
    if !user.active_for_authentication?
      raise Errors::ValidationError.new "Login Failed - You're account is blocked"
    end
    if is_valid_for_auth
      
      return user 
    else 
      raise Errors::ValidationError.new "Login Failed - Check your email and password"
    end
  end

end
