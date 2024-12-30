class ApplicationController < ActionController::API
  before_action :authenticate
  rescue_from JWT::VerificationError, with: :invalid_token
  rescue_from JWT::DecodeError, with: :decode_error
 
  private
  def authenticate
    authorization_header = request.headers['Authorization']
    if authorization_header.blank?
      return render json: { error: 'Authorization token missing' }, status: :unauthorized
    end
    begin
      token = authorization_header.split(" ").last
      decoded_token = JsonWebToken.decode(token)
      User.find(decoded_token[:user_id])
      Rails.logger.info("user: #{User.find(decoded_token[:user_id])}")
    rescue JWT::DecodeError
      render json: { decode_error: 'decode error' }, status: :bad_request
    end
  end
  
  def current_user
    return nil unless request.headers['Authorization'].present?
    token = request.headers['Authorization'].split(' ').last
    decoded = JsonWebToken.decode(token)
    @current_user ||= User.find_by(id: decoded[:user_id]) if decoded
  rescue StandardError
    nil
  end

  def invalid_token
    render json: { invalid_token: 'invalid token' }, status: :unauthorized
  end
 
  def decode_error
    render json: { decode_error: 'decode error' }, status: :bad_request
  end
end
