class User < ApplicationRecord
  include Tokenizable
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable, :confirmable, :trackable,
    :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist
    self.skip_session_storage = [:http_auth, :params_auth]


    def on_jwt_dispatch(token, payload)
     puts token
     puts payload
    end
end
