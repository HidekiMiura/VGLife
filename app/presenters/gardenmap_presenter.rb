class GardenmapPresenter < ModelPresenter
  delegate :garden_year, :garden_type, :gardenmap_title, :plant_set_definition_json, :cultivate_vegetable_list, :seed_plant_set_term, to: :object
  
  def garden_year_term
    object.garden_year + ' ' + object.given_name
  end

  def full_name_kana
    object.family_name_kana + ' ' + object.given_name_kana
  end
end
