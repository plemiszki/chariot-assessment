class Truck < ApplicationRecord

  enum truck_type: [:pickup, :cargo_van, :ten_foot, :fifteen_foot, :twenty_foot, :twenty_six_foot]

  validates :number, :truck_type, presence: true

  def self.get_available(truck_type:, start_date:, end_date:, existing_reservation: nil)
    overlapping_reservation_ids = Reservation.overlapping_ids(start_date: start_date, end_date: end_date)
    overlapping_reservation_ids.delete(existing_reservation.id) if existing_reservation.present?

    unavailable_truck_ids = Reservation.where(id: overlapping_reservation_ids).pluck(:truck_id)

    Truck.where(truck_type: truck_type).where.not(id: unavailable_truck_ids)
  end

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
