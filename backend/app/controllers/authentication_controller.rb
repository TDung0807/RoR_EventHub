class AuthenticationController < ApplicationController
  skip_before_action :authenticate

  def login
    user = User.find_by(username: params[:username])
    authenticated_user = user&.authenticate(params[:password])

    if authenticated_user
      exp = 24.hours.from_now
      token = JsonWebToken.encode(user_id: user.id, exp: exp.to_i)
      render json: { 
        token: token, 
        expires_at: exp, 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role,
          email: user.email 
        } 
      }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
