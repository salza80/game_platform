class User < ApplicationRecord
  include Tokenizable
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :trackable,
    :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
    self.skip_session_storage = [:http_auth, :params_auth]


    def requires_email_confirmation_before_login?
      !active_for_authentication? && !(!confirmation_required? || confirmed? || confirmation_period_valid?)
    end
end
