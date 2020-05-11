Rails.application.routes.draw do

  root :to => static('/spa/index.html')

  devise_for :users, only: [:confirmations, :passwords], controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
