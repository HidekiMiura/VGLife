vegetable_items = %w{
  トマト:tomato:ナス科:果菜類:ナス類
  ナス:eggplant:ナス科:果菜類:ナス類
  イチゴ:strawberry:ナス科:果菜類:ナス類
}

3.times do |n|
  fn = vegetable_items[n].split(':')

  c = Vegetable.create!(
    vegetable_code:"#{fn[1]}",
    vegetable_name:"#{fn[0]}",  
    kind_ka:"#{fn[2]}",  
    vegetable_large_class:"#{fn[3]}",  
    vegetable_small_class:"#{fn[4]}" 
  )
end



