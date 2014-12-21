class AddressFormPresenter < FormPresenter
  
  def postal_code_block(name, label_text, options)
    markup(:div, class: 'input-block') do |m|
      m << decorated_label(name, label_text, options)
      m << text_field(name, options)
      m.span '（7桁の半角数字で入力してください。）', class: 'notes'
      m << error_messages_for(name)
    end
  end
  
  def temperate_zone_division_field_block
    markup(:div, class: 'input-block') do |m|
      m << decorated_label(:temperate_zone_division, '地域区分（気候）')
      m << radio_button(:temperate_zone_division, 'cold')
      m << label(:temperate_zone_division_cold, '寒地')
      m << radio_button(:temperate_zone_division, 'cool')
      m << label(:temperate_zone_division_cool, '寒冷地')
      m << radio_button(:temperate_zone_division, 'Temperate')
      m << label(:temperate_zone_division_Temperate, '中間地')
      m << radio_button(:temperate_zone_division, 'hot')
      m << label(:temperate_zone_division_hot, '暖地')
    end
  end
end