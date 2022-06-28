require 'rails_helper'

RSpec.describe Api::ReservationsController do

  before(:each) do
    sign_in User.create!(email: "user@gmail.com", password: "password")
    (0..5).each do |n|
      Truck.create!(number: n, truck_type: n)
    end
    @tomorrow = Date.today + 1.day
  end

  context '#create' do

    it 'creates a reservation' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      expect(response.status).to eq(200)
      expect(Reservation.count).to eq(1)
    end

    it 'creates two reservations on different days' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: @tomorrow, end_date: @tomorrow, truck_type: "pickup" } }
      expect(Reservation.count).to eq(2)
    end

    it 'creates two reservations on the same day with different trucks' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "cargo_van" } }
      expect(Reservation.count).to eq(2)
    end

    it 'does not create two reservations on the same day with the same truck' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      expect(Reservation.count).to eq(1)
    end

    it 'does not create two reservations on the same day with the same truck' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: "pickup" } }
      expect(Reservation.count).to eq(1)
    end

    it 'does not create two reservations with the same truck that overlap' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today + 5.days, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: Date.today + 5.days, end_date: Date.today + 7.days, truck_type: "pickup" } }
      expect(Reservation.count).to eq(1)
    end

    it 'creates two reservations with different trucks that overlap' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today + 5.days, truck_type: "pickup" } }
      post :create, params: { reservation: { start_date: Date.today + 5.days, end_date: Date.today + 7.days, truck_type: "cargo_van" } }
      expect(Reservation.count).to eq(2)
    end

  end

  context '#update' do

    before(:example) do
      @reservation = Reservation.create!(start_date: Date.today, end_date: Date.today, truck_id: 1, user_id: 1)
    end

    it 'updates the reservation dates' do
      put :update, params: { id: @reservation.id, reservation: { start_date: @tomorrow, end_date: @tomorrow, truck_type: "pickup" } }
      expect(response.status).to eq(200)
      expect(@reservation.reload.start_date).to eq(@tomorrow)
      expect(@reservation.reload.end_date).to eq(@tomorrow)
    end

    it 'updates the reservation truck type' do
      put :update, params: { id: @reservation.id, reservation: { start_date: @tomorrow, end_date: @tomorrow, truck_type: "cargo_van" } }
      expect(response.status).to eq(200)
      expect(@reservation.reload.truck.truck_type).to eq("cargo_van")
    end

    it 'does not update the reservation dates if there is a conflict' do
      Reservation.create!(start_date: @tomorrow, end_date: @tomorrow, truck_id: 1, user_id: 1)
      put :update, params: { id: @reservation.id, reservation: { start_date: @tomorrow, end_date: @tomorrow, truck_type: "pickup" } }
      expect(response.status).to eq(422)
      expect(@reservation.reload.start_date).to eq(Date.today)
      expect(@reservation.reload.end_date).to eq(Date.today)
    end

    it 'does not update the reservation truck type if there is a conflict' do
      Reservation.create!(start_date: Date.today, end_date: Date.today, truck_id: 2, user_id: 1)
      put :update, params: { id: @reservation.id, reservation: { start_date: Date.today, end_date: Date.today, truck_type: "cargo_van" } }
      expect(response.status).to eq(422)
      expect(@reservation.reload.truck.truck_type).to eq("pickup")
    end

  end

end
