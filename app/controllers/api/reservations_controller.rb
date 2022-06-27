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
      available_truck = Truck.find_by_truck_type(reservation_params["truck_type"])
      if available_truck
        @reservation.truck = available_truck
        @reservation.user = current_user
        @reservation.save!
        render 'create', formats: [:json], handlers: [:jbuilder]
      else
        render json: { message: 'no trucks available' }, status: 422
      end
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def update
    @reservation = Reservation.find(params[:id])
    @reservation.assign_attributes(reservation_params.except("truck_type"))

    if @reservation.valid?(:dates_only)
      available_truck = Truck.find_by_truck_type(reservation_params["truck_type"])
      if available_truck
        @reservation.truck = available_truck
        @reservation.save!
        render 'show', formats: [:json], handlers: [:jbuilder]
      else
        render json: { message: 'no trucks available' }, status: 422
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
