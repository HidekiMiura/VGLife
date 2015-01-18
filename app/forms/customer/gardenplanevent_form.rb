class Customer::GardenplaneventForm
  include ActiveModel::Model
  
  attr_accessor :gardenplanevent, :gardenplan_id, :task_show_title, :task_type, :task_code, :task_event_date
  delegate :save, to: :gardenplanevent
  
  def initialize(gardenevent = nil)
    @gardenplanevent = gardenevent
    @gardenplanevent ||= Gardenplanevent.new
  end
  
  def setTaskType(task_type)
    gardenplanevent.task_type = task_type
  end

  def setTaskShowTitle(task_show_title)
    gardenplanevent.task_show_title = task_show_title
  end

  def assign_attributes(params = {})
    @params = params[:gardenplanevent]
    gardenplanevent.assign_attributes(gardenplanevent_params)
  end

  private
  def gardenplanevent_params
    @params.permit(
      :gardenplan_id, :task_show_title, :task_type, :task_code, :task_event_date  
    )
  end

end
