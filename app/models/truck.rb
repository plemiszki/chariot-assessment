class Truck < ApplicationRecord

  enum truck_type: [:pickup, :cargo_van, :ten_foot, :fifteen_foot, :twenty_foot, :twenty_six_foot]

  validates :number, :truck_type, presence: true

  def truck_type_english
    case truck_type
    when "pickup"
      "Pickup truck"
    when "cargo_van"
      "Cargo van"
    when "ten_foot"
      "10' Truck"
    when "fifteen_foot"
      "15' Truck"
    when "twenty_foot"
      "20' Truck"
    when "twenty_six_foot"
      "26' Truck"
    end
  end

end
