Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :courses do
        collection do
          get 'totalVideoSum', to: 'courses#totalVideoSum'
        end

        # Aninhando as rotas de lessons (aulas) dentro de courses
        resources :lessons, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

  # Define a rota de health check para verificação de status do sistema
  # get "up" => "rails/health#show", as: :rails_health_check

  # Define a rota raiz
  # root "posts#index"
end
