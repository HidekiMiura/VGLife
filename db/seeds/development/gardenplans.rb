customers = Customer.all
5.times do |n|
  m = customers.sample
  e = m.gardenplans.build
  
  e.vegetable_code = "tomato"
  e.vegetable_name = "トマト"
  e.gardenplan_year = 2013 + n
  e.seed_plant_set_term = "春"

  e.save!
  e = m.gardenplans.build
  
  e.vegetable_code = "tomato"
  e.vegetable_name = "トマト"
  e.gardenplan_year = 2013 + n
  e.seed_plant_set_term = "秋"

  e.save!
  m.save!
end