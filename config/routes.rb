Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#new_guest'
  end
  #root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect('/foods')

  get 'foods', to: 'home#index'
  get 'foods/new', to: 'home#index'
  get 'foods/:id/edit', to: 'home#index'
  #全て'home#index'にルーティングしていく。

  namespace :api do
    namespace :v1 do
      delete '/foods/destroy_all', to: 'foods#destroy_all'
      #resources :foodsでは賄えないアクションなので別途記述する。
      resources :foods, only: %i[index show create update destroy]
    end
  end
end
