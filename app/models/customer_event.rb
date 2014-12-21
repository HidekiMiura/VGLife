class CustomerEvent < ActiveRecord::Base
  self.inheritance_column = nil
  
  belongs_to :customer, class_name: 'Customer', foreign_key: 'customer_id'
  alias_attribute :occurred_at, :created_at
  
  DESCRIPTIONS = {
    logged_in: 'ログイン',
    logged_out: 'ログアウト'
  }
  
  def description
    DESCRIPTIONS[type.to_sym]    
  end
end
