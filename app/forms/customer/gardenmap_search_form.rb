class Customer::GardenmapSearchForm
  include ActiveModel::Model
  
  attr_accessor :customer_id, :garden_year, :garden_type, :gardenmap_title, :plant_set_definition_json, :cultivate_vegetable_list, :seed_plant_set_term
  
  def search(customer_id,search_year = nil)
    rel = Gardenmap.all
    rel = rel.where(customer_id: customer_id)
    rel = rel.where(garden_year: search_year)

    #    p "★re2：" + rel.inspect
    #   
#    if garden_year.blank?
#      p "★blank："
#      garden_year = Time.now.year  
#    end
#    rel = rel.where(garden_year: garden_year)
#    p "★rel2：" + rel.inspect
#    rel = rel.where(garden_year: garden_year) if garden_year.present?
    
#    rel.order(:garden_year, :seed_plant_set_term) 
  end

end