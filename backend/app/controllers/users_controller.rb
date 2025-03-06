class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create, :index, :show]

  def create
    @user = User.find_by(email: user_params[:email])
    if @user
      render json: @user.as_json, status: :ok
    else
      @user = User.new(user_params)
      if @user.save
        NotifierMailer.welcome_email(@user, @user.password).deliver_later
        render json: @user.as_json, status: :ok
      else
        render json: { message: "Error created", errors: @user.errors.full_messages }, status: :bad_request
      end
    end
  end
  

  def index
    render json: { users: User.all.map(&:as_json) }
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render json: @user.as_json, status: :ok
    else
      render json: { message: "User not found" }, status: :not_found
    end
  end

  private

  def user_params
    params.required(:user).permit(:email, :password, :name, :username, :role)
  end
end