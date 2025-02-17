class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true
    has_many :events
    enum :role, { user: 0, admin: 1 }
    def as_json(opts = {})
        super(opts.merge(only: [:id, :username, :email, :name, :role]))
    end
end

