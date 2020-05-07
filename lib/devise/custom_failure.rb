module Devise
  class CustomFailure < Devise::FailureApp
    def redirect_url
      new_user_session_url
    end

    # You need to override respond to eliminate recall
    def respond
      if http_auth?
        http_auth
      else
        if request.controller_class() == GraphqlController
          self.status = :unauthorized
          self.response_body = { :elements => {:id => "Authentication Failed", :description =>   "Invalid or missing authentication token"} }.to_json
          self.content_type = "json"
        else
          redirect
        end
      end
    end
  end
end