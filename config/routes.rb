Rails.application.routes.draw do

  devise_for :users

  root "public#home"

  resources :reservations, only: [:index, :show, :new]

  namespace :api do
    resources :reservations, only: [:show, :create, :update, :destroy]
  end

end
