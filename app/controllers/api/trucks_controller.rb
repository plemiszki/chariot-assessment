class Api::TrucksController < AdminController

  def index
    @types = Truck.all.map { |truck| [truck.truck_type, truck.truck_type_english] }.uniq
    render "index", formats: [:json], handlers: [:jbuilder]
  end

end
