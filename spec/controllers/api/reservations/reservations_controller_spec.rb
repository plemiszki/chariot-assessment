require 'rails_helper'

RSpec.describe Api::ReservationsController do

  before(:each) do
    sign_in User.create!(email: "user@gmail.com", password: "password")
    (0..5).each do |n|
      Truck.create!(number: n, truck_type: n)
    end
  end

  context '#create' do

    it 'creates a reservation' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      expect(response.status).to eq(200)
      expect(Reservation.count).to eq(1)
    end

    it 'creates two reservations on different days' do
      tomorrow = Date.today + 1.day
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      post :create, params: { reservation: { start_date: tomorrow, end_date: tomorrow, truck_type: 0 } }
      expect(Reservation.count).to eq(2)
    end

    it 'creates two reservations on the same day with different trucks' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 1 } }
      expect(Reservation.count).to eq(2)
    end

    it 'does not create two reservations on the same day with the same truck' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      expect(Reservation.count).to eq(1)
    end

    it 'does not create two reservations on the same day with the same truck' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today, truck_type: 0 } }
      expect(Reservation.count).to eq(1)
    end

    it 'does not create two reservations with the same truck that overlap' do
      post :create, params: { reservation: { start_date: Date.today, end_date: Date.today + 5.days, truck_type: 0 } }
      post :create, params: { reservation: { start_date: Date.today + 5.days, end_date: Date.today + 7.days, truck_type: 0 } }
      expect(Reservation.count).to eq(1)
    end

  end

  # context '#show' do
  #   it 'returns an OK status code' do
  #     get :show, params: { id: Film.last.id }
  #     expect(response).to render_template('api/films/show', formats: [:json], handlers: [:jbuilder])
  #     expect(response.status).to eq(200)
  #   end
  # end

end
