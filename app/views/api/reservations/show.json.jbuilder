json.reservation do
  json.id @reservation.id
  json.truckId @reservation.truck_id
  json.truckType @reservation.truck.truck_type
  json.truckTypeEnglish @reservation.truck.truck_type_english
  json.startDate @reservation.start_date.strftime("%-m/%-d/%y")
  json.endDate @reservation.end_date.strftime("%-m/%-d/%y")
end
