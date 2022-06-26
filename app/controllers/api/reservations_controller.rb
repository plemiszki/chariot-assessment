class Api::ReservationsController < AdminController

  def index
    @reservations = Reservation.where(user: current_user, is_cancelled: false).includes(:truck).order(:start_date)
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
    reservation = Reservation.find(params[:id])
    reservation.update(is_cancelled: true)
    head :ok
  end

end
