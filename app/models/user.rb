class User < ApplicationRecord

  devise :database_authenticatable, :registerable, :validatable

  has_many :reservations

end
