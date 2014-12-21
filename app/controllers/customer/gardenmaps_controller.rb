class Customer::GardenmapsController < Customer::Base
  def index
    @search_form = Customer::GardenmapSearchForm.new(params[:search])
    
    if params[:search].blank?
      searchYear = Time.now.year
    else
      searchYear = params[:search][:garden_year]  
    end
    @gardenmaps = @search_form.search(current_customer[:id], searchYear).page(params[:page])
      
    @canvas_id_list = ""
    @gardenmaps.each do |f|
      if @canvas_id_list.blank?
        @canvas_id_list = @canvas_id_list + f.id.to_s
      else
        @canvas_id_list = @canvas_id_list + "-" + f.id.to_s
      end 
    end 

    #    @gardenmaps = @gardenmaps.order(occurred_at: :desc).includes(:customer).page(params[:page])
  end

  def sort
    @plant_set_definition_json = params[:plant_set_definition_json]

    respond_to do |format|
      format.html { redirect_to ajaxes_url }
      format.json { head :@plant_set_definition_json }
    end
  end

  
  def new
    @gardenmap_form = Customer::GardenmapForm.new
  end

  def create
    @gardenmap_form = Customer::GardenmapForm.new
    @gardenmap_form.assign_attributes(params[:form])
    @gardenmap_form.setCustomerid(current_customer[:id])
    if @gardenmap_form.save
      
      
      cultivateVegetableListText = params[:form][:gardenmap][:cultivate_vegetable_list]
      qStr = cultivateVegetableListText[1, cultivateVegetableListText.length - 2].split(",")
      gardenplans = Gardenplan.all
      gardenplans = gardenplans.where(:customer_id => current_customer[:id])
        
      for i in 0..qStr.length - 1 do
        s = qStr[i]
        qData = s.split("=")
        gardenplans = gardenplans.where(:vegetable_code => qData[0],
                                        :gardenplan_year => @gardenmap_form.gardenmap.garden_year,
                                        :seed_plant_set_term => @gardenmap_form.gardenmap.seed_plant_set_term)
        if gardenplans.size == 0
          e = Customer.find(current_customer[:id]).gardenplans.build
          e.gardenplan_year = @gardenmap_form.gardenmap.garden_year
          e.seed_plant_set_term = @gardenmap_form.gardenmap.seed_plant_set_term
          e.vegetable_code = qData[0]
          e.vegetable_name = qData[1]
          e.save!
        end
      end
      flash.notice = '菜園図を追加しました。'
      redirect_to action: 'index'
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'new'
    end
  end

  def edit
    @gardenmap_form = Customer::GardenmapForm.new(Gardenmap.find(params[:id]));
  end
  
  def update
    @gardenmap_form = Customer::GardenmapForm.new(Gardenmap.find(params[:id]))
    @gardenmap_form.assign_attributes(params[:form])
    if @gardenmap_form.save
      flash.notice = '菜園図を更新しました。'
      redirect_to action: 'index'
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'edit'
    end
  end
end
