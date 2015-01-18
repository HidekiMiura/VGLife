class Customer::GardenmapForm
  include ActiveModel::Model
  
  attr_accessor :gardenmap, :customer_id, :garden_year, :garden_type, :gardenmap_title, :plant_set_definition_json, :cultivate_vegetable_list, :seed_plant_set_term
  delegate :save, to: :gardenmap

  def initialize(gardenmap = nil)
    @gardenmap = gardenmap
    @gardenmap ||= Gardenmap.new
  end

  def setCustomerid(customer_id)
    gardenmap.customer_id = customer_id
  end

  def assign_attributes(params = {})
    @params = params[:gardenmap]
    gardenmap.assign_attributes(gardenmap_params)
  end

  private
  def gardenmap_params
    @params.permit(
      :customer_id, :garden_year, :garden_type, :gardenmap_title, :plant_set_definition_json, :cultivate_vegetable_list, :seed_plant_set_term, :map_width_cell, :map_height_cell, :max_canvas_X_cell, :max_canvas_Y_cell  
    )
  end
end

