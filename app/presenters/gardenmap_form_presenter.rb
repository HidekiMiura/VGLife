class GardenmapFormPresenter < FormPresenter
  
  def garden_text_fields_block(gardenYearName, seedPlantSetTerm, gardenmapTitle, options = {})
    markup(:span, class: 'input-block') do |m|
      m << decorated_label(seedPlantSetTerm, I18n.t('gardenmaps.edit.term'), size: 32)
      m << form_builder.select(seedPlantSetTerm, Gardenmap::SEEDPLANTSETTERMS, { include_blank: true }, required: true)
      m << error_messages_for(seedPlantSetTerm)
      m << decorated_label(gardenYearName,I18n.t('gardenmaps.edit.year'), size: 32)
      m << form_builder.select(gardenYearName, (Time.zone.now.year)..(Time.zone.now.year + 10), { include_blank: false }, required: true)
      m << error_messages_for(gardenYearName)
      m << decorated_label(gardenmapTitle, I18n.t('gardenmaps.edit.gardenTitle'), size: 32)
      m << text_field(gardenmapTitle, {size: 42,  placeholder:  I18n.t('gardenmaps.edit.gardenTitlePlaceholder')})
      m << error_messages_for(gardenmapTitle)
      m << hidden_field(:plant_set_definition_json, options)
      m << hidden_field(:cultivate_vegetable_list, options)
    end
  end
  def garden_map_fields_block(options = {})
    markup(:span, class: 'input-block') do |m|
      m << decorated_label(:map_width_cell, I18n.t('gardenmaps.edit.mapWidth'), size: 35)
      m << text_field(:map_width_cell, {size: 15, type: 'number', min: 1, max: 30, id: 'mapWidthCell', style: 'text-align:right;'})
      m << error_messages_for(:map_width_cell)
      m << ' X ' 
      m << decorated_label(:map_height_cell, I18n.t('gardenmaps.edit.mapHeight'), size: 35)
      m << text_field(:map_height_cell, {size: 15, type: 'number', min: 1, max: 30, id: 'mapHeightCell', style: 'text-align:right;'})
      m << error_messages_for(:map_height_cell)
      m << hidden_field(:max_canvas_X_cell, {id: 'maxCanvasXCell'})
      m << hidden_field(:max_canvas_Y_cell, {id: 'maxCanvasYCell'})
    end
  end
end


