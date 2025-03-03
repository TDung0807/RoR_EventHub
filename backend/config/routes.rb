Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users, only: [:create, :index, :show]
  post 'login', to: "authentication#login"
  
  resources :events, only: [:create, :index, :edit, :update, :destroy] do
    collection do
      get 'by_quest_email', to: 'events#events_by_quest_email'
      get :upcoming
      get 'user_events/:user_id', to: 'events#events_by_user'
    end
    resources :groups, only: [:index, :create, :show, :update, :destroy]
  end

  resources :transports do
    collection do
      get :get_by_vendor
      get :get_transport_by_vendor_id
    end
  end

  resources :vendors, only: [:create, :index, :update, :destroy]

  resources :hotels, only: [:create, :index, :show, :update, :destroy] do
    resources :rooms, only: [:create, :index, :show, :update, :destroy]
  end

  resources :groups, only: [:create, :index, :show, :update, :destroy] do
    get 'events', to: 'events#events_by_group'
    post 'quests', to: 'groups#add_quests'
    delete 'quests/:quest_id', to: 'groups#remove_quest'
    get 'quests', to: 'groups#quests'
  end
  
  get 'quests/:email/events', to: 'quests#events_by_email'
  resources :quests, only: [:create, :index, :show, :update, :destroy] do
    collection do
      get 'find_by_name/:name', to: 'quests#find_by_name'
      get 'find_by_email/:email', to: 'quests#find_by_email'
    end
    get 'groups', to: 'quests#groups'
  end

  resources :restaurants, only: [:create, :index, :show, :update, :destroy] do
    resources :dishes, only: [:create, :index]
  end

  resources :dishes, only: [:show, :update, :destroy] do
    resources :ingredients, only: [:index]
    member do
      post :add_ingredients
      delete :remove_ingredients
    end
  end
  
  resources :ingredients, only: [:create, :index, :show, :update, :destroy] do
    collection do
      get :by_name
    end
  end
end
