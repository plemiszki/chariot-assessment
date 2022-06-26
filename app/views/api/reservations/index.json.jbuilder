json.reservations @reservations do |reservation|
  json.id reservation.id
  json.truckId reservation.truck_id
  json.truckType reservation.truck.truck_type.capitalize
  json.startDate reservation.start_date.strftime("%-m/%-d/%y")
  json.endDate reservation.end_date.strftime("%-m/%-d/%y")
end
