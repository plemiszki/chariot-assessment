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

    @reservation = Reservation.new(reservation_params.except("truck_type"))

    if @reservation.valid?(:dates_only)
      # more stuff
      head :ok
    else
      render json: @reservation.errors.full_messages, status: 422
    end

  end

  def update
  end

  def destroy
    reservation = Reservation.find(params[:id])
    reservation.update(is_cancelled: true)
    head :ok
  end

  private

  def reservation_params
    params["reservation"].permit(:start_date, :end_date, :truck_type)
  end

end
