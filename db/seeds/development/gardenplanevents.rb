gardenplans = Gardenplan.all
5.times do |n|
  m = gardenplans.sample
  e = m.gardenplanevents.build
  
  e.task_show_title = "苗植"
  e.task_type = '栽培'
  e.task_code = 'cultivate_strawberry'
  e.task_event_date = n.days.ago.to_date
  e.save!
end