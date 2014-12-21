class Customer::GardenplansController < Customer::Base
  def index
    @customer = Customer.find(current_customer[:id])
    @gardenplans = @customer.gardenplans.where(:gardenplan_year => Time.now.year).order(occurred_at: :desc)
    unless params[:gardenplan_id] then
      first_gardenplan_id = @gardenplans.first
      first_vegetable_code = @gardenplans.first.vegetable_code
      first_vegetable_name = @gardenplans.first.vegetable_name
    else 
      first_gardenplan_id = params[:gardenplan_id]
      first_vegetable_code = params[:vegetable_code]
      first_vegetable_name = params[:vegetable_name]
    end
    @vegetabletasks = Vegetabletask.all.where(:vegetable_code => first_vegetable_code)
    @gardenplanevents = Gardenplanevent.all.where(gardenplan_id: first_gardenplan_id).order(cultivate_task_term: :asc)
    @selectvegetable = first_vegetable_name     
    render action: 'index' 

  end

  def renew
    @gardenplans = Gardenplan.find_by(:id => params[:gardenplan_id])
    @gardenplanevents = @gardenplans.gardenplanevents.order(occurred_at: :desc)

    respond_to do |format|
      format.html { redirect_to @gardenplans}
      format.json { render action: 'index', data: @gardenplanevents }
    end
  end

  def new
    gardenplanevent = Gardenplanevent.new
    gardenplanevent.task_code = 'seed'
    gardenplanevent.gardenplan_id = params[:gardenplan_id]
    gardenplanevent.vegetable_code = params[:vegetable_code]
    @gardenplanevent_form = gardenplanevent 
  end

  def create
p "★params[:form][:vegetable_code]:" + params[:form][:vegetable_code].inspect
    @gardenplanevent_form = Customer::GardenplaneventForm.new
    @gardenplanevent_form.assign_attributes(params[:form])
    
    @gardenplanevent_form.setTaskShowTitle("苗植")
    @gardenplanevent_form.setTaskType("栽培")
    if @gardenplanevent_form.save
      flash.notice = '菜園カレンダーを追加しました。'
      redirect_to action: 'index'
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'new'
    end
  end
end
