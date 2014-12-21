class Gardenmap < ActiveRecord::Base
#  self.inheritance_column = nil
  
  belongs_to :customer, class_name: 'Customer', foreign_key: 'customer_id'
  alias_attribute :occurred_at, :created_at
  
  SEEDPLANTSETTERMS = %w{春 夏 秋 冬}
  
  validates :seed_plant_set_term, inclusion: { in: SEEDPLANTSETTERMS, allow_blank: true }
  validates :garden_year, presence: true
  validates :seed_plant_set_term, presence: true
  

end
