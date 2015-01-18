class Customer::GardenplansController < Customer::Base
  def index
    @function = 'gardenplans.index'
    @customer = Customer.find(current_customer[:id])
    @gardenplans = @customer.gardenplans.where(:gardenplan_year => Time.now.year).order(occurred_at: :desc)
    unless params[:gardenplan_id] then
      if  @gardenplans.size != 0 then
        first_gardenplan_id = @gardenplans.first
        first_vegetable_code = @gardenplans.first.vegetable_code
        first_vegetable_name = @gardenplans.first.vegetable_name
      end
    else 
      first_gardenplan_id = params[:gardenplan_id]
      first_vegetable_code = params[:vegetable_code]
      first_vegetable_name = params[:vegetable_name]
    end
    if I18n.locale.to_s == "ja"
      searchLocale = "ja" 
    else
      searchLocale = "en"
    end
    @vegetabletasks = Vegetabletask.where(:vegetable_code => first_vegetable_code).where(language_code: searchLocale).order(cultivate_task_term: :asc)
    @vegetabletasks.each do |f|
       if f.cultivate_task_type.present? then
         @cultivatetask = Cultivatetask.where(:cultivate_task_code => f.cultivate_task_type)
         f.cultivate_task_comment = @cultivatetask.first.cultivate_task_comment
         f.cultivate_task_image = @cultivatetask.first.cultivate_task_image 
       end
    end
#    @gardenplanevents = Gardenplanevent.all.where(gardenplan_id: first_gardenplan_id).order(cultivate_task_term: :asc)
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
