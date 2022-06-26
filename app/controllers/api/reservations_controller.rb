class Api::ReservationsController < AdminController

  def index
    @reservations = Reservation.where(user: current_user).includes(:truck).order(:start_date)
    render "index", formats: [:json], handlers: [:jbuilder]
  end

  def show
    @reservation = Reservation.find(params[:id])
    render 'show', formats: [:json], handlers: [:jbuilder]
  end

  def create
  end

  def update
  end

  def destroy
  end

end
