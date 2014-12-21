class HomeAddress < Address
  
  validates :temperate_zone_division, :prefecture, presence: true
# TODO:company_nameが上手くいかない
#  validates :company_name, division_name, absence: true
  validates :division_name, absence: true
  
 validates :temperate_zone_division, inclusion: { in: Address::TEMPERATE_ZONE_NAMES, allow_blank: true }
end