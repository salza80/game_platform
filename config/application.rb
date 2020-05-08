require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GamePlatform
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    

    ## not required for develpment when using create react at proxy requests.
    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins '*'
    #     resource '/graphql', headers: :any, methods: [:get, :post, :options, :patch, :delete, :put]
    #   end
    # end

    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
