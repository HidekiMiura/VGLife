class Customer::CustomerForm
  include ActiveModel::Model
  
  attr_accessor :customer, :inputs_home_address, :inputs_work_address
  delegate :persisted?, :save, to: :customer
  
  def initialize(customer = nil)
    @customer = customer
    @customer ||= Customer.new(gender: 'male')
  end
  
  def assign_attributes(params = {})
    @params = params

    customer.assign_attributes(customer_params)
  end

  private
  def customer_params
    @params.require(:customer).permit(
      :email, :password, :family_name, :given_name, :family_name_kana, :given_name_kana, :nickname, :birthday, :gender
    )
  end
end