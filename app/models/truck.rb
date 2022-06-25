class Truck < ApplicationRecord

  enum truck_type: [:pickup, :cargo_van, :ten_foot, :fifteen_foot, :twenty_foot, :twenty_six_foot]

  validates :number, :truck_type, presence: true

end
