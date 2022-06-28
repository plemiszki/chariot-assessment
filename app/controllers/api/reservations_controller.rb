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
      available_trucks = Truck.get_available(
        truck_type: reservation_params["truck_type"],
        start_date: reservation_params["start_date"],
        end_date: reservation_params["end_date"],
      )
      if available_trucks.empty?
        render json: { message: 'no trucks available' }, status: 422
      else
        @reservation.truck = available_trucks.first
        @reservation.user = current_user
        @reservation.save!
        render 'create', formats: [:json], handlers: [:jbuilder]
      end
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def update
    @reservation = Reservation.find(params[:id])
    @reservation.assign_attributes(reservation_params.except("truck_type"))

    if @reservation.valid?(:dates_only)
      available_trucks = Truck.get_available(
        truck_type: reservation_params["truck_type"],
        start_date: reservation_params["start_date"],
        end_date: reservation_params["end_date"],
        existing_reservation: @reservation,
      )
      if available_trucks.empty?
        render json: { message: 'no trucks available' }, status: 422
      else
        @reservation.truck = available_trucks.first
        @reservation.save!
        render 'show', formats: [:json], handlers: [:jbuilder]
      end
    else
      render json: @reservation.errors.full_messages, status: 422
    end
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
