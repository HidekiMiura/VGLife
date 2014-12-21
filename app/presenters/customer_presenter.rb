class CustomerPresenter < ModelPresenter
  delegate :nickname, :email, :prefecture, :city, :address1, :address2, :company_name, :division_name, to: :object
  
  def full_name
    object.family_name + ' ' + object.given_name
  end

  def full_name_kana
    object.family_name_kana + ' ' + object.given_name_kana
  end
  
  def birthday
    return '' if object.birthday.blank?
    object.birthday.strftime('%Y/%m/%d')
  end
  
  def gender
    case object.gender
    when 'male'
      '男性'
    when 'female'
      '女性'
    else
      ''
    end
  end
  
  def temperate_zone_division
    case object.temperate_zone_division
    when 'cold'
      '寒地'
    when 'cool'
      '寒冷地'
    when 'temperate'
      '中間地'
    when 'hot'
      '暖地'
    else
      ''
    end
  end
  
  def personal_phones
    object.personal_phones.map(&:number)
  end
end
