Rails.application.routes.draw do

  devise_for :users

  devise_scope :user do
    root to: "devise/sessions#new"
  end

  resources :reservations, only: [:index, :show, :new]

  namespace :api do
    resources :reservations, only: [:index, :show, :create, :update, :destroy]
  end

end
