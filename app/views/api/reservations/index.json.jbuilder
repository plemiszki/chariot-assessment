json.reservations @reservations do |reservation|
  json.id reservation.id
  json.truckId reservation.truck_id
  json.startDate reservation.start_date
  json.endDate reservation.end_date
end
