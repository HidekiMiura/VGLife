class GardenmapFormPresenter < FormPresenter
  
  def garden_text_fields_block(gardenYearName, seedPlantSetTerm, gardenmapTitle, options = {})
    markup(:span, class: 'input-block') do |m|
      m << decorated_label(seedPlantSetTerm, "時期", size: 32)
      m << form_builder.select(seedPlantSetTerm, Gardenmap::SEEDPLANTSETTERMS, { include_blank: true }, required: true)
      m << error_messages_for(seedPlantSetTerm)
      m << decorated_label(gardenYearName, "菜園年度", size: 32)
      m << form_builder.select(gardenYearName, (Time.zone.now.year)..(Time.zone.now.year + 10), { include_blank: false }, required: true)
      m << error_messages_for(gardenYearName)
      m << decorated_label(gardenmapTitle, "菜園図タイトル", size: 32)
      m << text_field(gardenmapTitle)
      m << error_messages_for(gardenmapTitle)
      m << hidden_field(:plant_set_definition_json, options)
      m << hidden_field(:cultivate_vegetable_list, options)
    end
  end
end
