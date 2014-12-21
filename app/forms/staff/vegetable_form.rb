class Staff::VegetableForm
  include ActiveModel::Model
  
  attr_accessor :vegetable
  delegate :persisted?, :save, to: :vegetable
  
  def initialize(vegetable = nil)
    @vegetable = vegetable
    @vegetable ||= Vegetable.new()
  end
  
#  def valid?
#    [ customer, customer.home_address, customer.work_address ].map(&:valid?).all?
#  end
  
#  autosave: trueにより、delegate :saveで委託するのでsaveメソッドは不要  
#  def save
#    if valid?
#      ActiveRecord::Base.transaction do
#        customer.save!
#        customer.home_address.save!
#        customer.work_address.save!
#      end
#    end
#  end

  def assign_attributes(params = {})
    @params = params
    vegetable.assign_attributes(vegetable_params)
  end

  private
  def vegetable_params
    @params.require(:vegetable).permit(
      :vegetable_code, :vegetable_name, :kind_ka, :kind_zoku, :kind_syu, :vegetable_large_class, :vegetable_small_class, :plant_way, :stake_flg, :list_width_cm, :list_height_cm, :raise_seed_term, :thutiyose_flg, :companion_plant_json, :annual_perennial_herb, :deep_yellow_vegetable_flg, :nutrient, :preferred_ph
    )
  end
end