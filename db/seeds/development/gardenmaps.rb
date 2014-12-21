customers = Customer.all
256.times do |n|
  m = customers.sample
  e = m.gardenmaps.build
  e.garden_year = 2014
  
  if n % 2 == 0
    e.gardenmap_title = "トマト菜園"
    e.cultivate_vegetable_list = '{"tomato":"add"}'
    e.plant_set_definition_json = '{"workFlowDesignGride":"80","workFlowDesignHeight":"500","workFlowDesignWidth":"500","taskData":[{"taskId":"1417751236133-Tomato-new","taskType":"Tomato","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"}],"taskLayouts":[{"taskId":"1417751236133-Tomato-new","coordinate":"4-2","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1417751236133-Tomato-new","coordinate":"2-2","coordinate2":"","nextTaskCoordinateDefinition":[]}],"taskState":[{"taskId":"1417751236133-Tomato-new"},{"taskId":"1417751236133-Tomato-new"}]}'
  else
    e.gardenmap_title = "ストロベリー菜園"
    e.cultivate_vegetable_list = '{"strawberry":"add"}'
    e.plant_set_definition_json = '{"workFlowDesignGride":"80","workFlowDesignHeight":"500","workFlowDesignWidth":"500","taskData":[{"taskId":"1417751236133-Strawberry-new","taskType":"Strawberry","taskName":"タスク名称１","divId":"oyaId1","isTrayTask":false,"trayTaskGroupId":"ttgId1"}],"taskLayouts":[{"taskId":"1417751217758-Strawberry-new","coordinate":"4-2","coordinate2":"","nextTaskCoordinateDefinition":[]},{"taskId":"1417751236133-Strawberry-new","coordinate":"2-2","coordinate2":"","nextTaskCoordinateDefinition":[]}],"taskState":[{"taskId":"1417751217758-Strawberry-new"},{"taskId":"1417751236133-Strawberry-new"}]}'
  end
  e.save!
end