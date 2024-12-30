class JsonWebToken
  JWT_SECRET = Rails.application.credentials.dig(:secret_key_base)

  def self.encode(payload, exp = 12.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, JWT_SECRET)
  end

  def self.decode(token)
    begin
      body = JWT.decode(token, JWT_SECRET)[0]
      HashWithIndifferentAccess.new(body)
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      { error: 'Invalid token' }
    rescue JWT::ExpiredSignature => e
      Rails.logger.error("JWT Expired Error: #{e.message}")
      { error: 'Token has expired' }
    rescue => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      { error: 'An unknown error occurred' }
    end
  end 
end
