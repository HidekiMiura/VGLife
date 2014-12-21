class Gardenplan < ActiveRecord::Base
  belongs_to :customer, class_name: 'Customer', foreign_key: 'customer_id'
  
  has_many :gardenplanevents, class_name: 'Gardenplanevent', dependent: :destroy

  alias_attribute :occurred_at, :created_at

end
