class Api::ReservationsController < AdminController

  def index
    @reservations = Reservation.where(user: current_user).order(:start_date)
    render "index", formats: [:json], handlers: [:jbuilder]
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

end
