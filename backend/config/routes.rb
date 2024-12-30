Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Health check route
      get "up" => "rails/health#show", as: :rails_health_check

      # User routes
      resources :users, only: [:create, :index]
      post 'login', to: "authentication#login"

      # Event routes
      resources :events, only: [:create, :index, :edit, :update, :destroy]

      # Transport routes
      resources :transports, only: [:create, :index, :update, :destroy]

      # Vendor routes
      resources :vendors, only: [:create, :index, :update, :destroy]

      # Hotel and room routes
      resources :hotels, only: [:create, :index, :show, :update, :destroy] do
        resources :rooms, only: [:create, :index, :show, :update, :destroy]
      end

      # Group and quest routes
      resources :groups, only: [:create, :index, :show, :update, :destroy] do
        post 'quests', to: 'groups#add_quests'
        delete 'quests/:quest_id', to: 'groups#remove_quest'
        get 'quests', to: 'groups#quests'
      end

      # Quest routes
      resources :quests, only: [:create, :index, :show, :update, :destroy] do
        get 'groups', to: 'quests#groups'
      end

      # Restaurant and dish routes
      resources :restaurants, only: [:create, :index, :show, :update, :destroy] do
        resources :dishes, only: [:create, :index]
      end

      # Dish and ingredient routes
      resources :dishes, only: [:show, :update, :destroy] do
        resources :ingredients, only: [:index]
      end

      # Ingredient routes
      resources :ingredients, only: [:create, :index, :show, :update, :destroy]
    end
  end
end
