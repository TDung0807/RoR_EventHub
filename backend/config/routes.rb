Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :users, only: [:create, :index]
  post 'login', to: "authentication#login"
  
  resources :events, only: [:create, :index, :edit, :update, :destroy] do
    collection do
      get :upcoming
    end
  end
  resources :transports, only: [:create, :index, :update, :destroy]
  resources :vendors, only: [:create, :index, :update, :destroy]
  resources :hotels, only: [:create, :index, :show, :update, :destroy] do
    resources :rooms, only: [:create, :index, :show, :update, :destroy]
  end
  resources :groups, only: [:create, :index, :show, :update, :destroy] do
    post 'quests', to: 'groups#add_quests'
    delete 'quests/:quest_id', to: 'groups#remove_quest'
    get 'quests', to: 'groups#quests'
  end
  resources :quests, only: [:create, :index, :show, :update, :destroy] do
    get 'groups', to: 'quests#groups'
  end
  resources :restaurants, only: [:create, :index, :show, :update, :destroy] do
    resources :dishes, only: [:create, :index]
  end
  
  resources :dishes, only: [:show, :update, :destroy] do
    resources :ingredients, only: [:index]
  end
  
  resources :ingredients, only: [:create, :index, :show, :update, :destroy]
end
