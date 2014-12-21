class Customer::GardenplaneventsController < Customer::Base
  def new
    @gardenplanevent_form = Customer::GardenplaneventForm.new
  end
end
