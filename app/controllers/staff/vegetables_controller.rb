class Staff::VegetablesController < Staff::Base
  def new
    @vegetable_form = Staff::VegetableForm.new
  end
  
  def index
    @vegetables = Vegetable.order(:vegetable_name).page(params[:page])
  end

  def edit
    @vegetable_form = Staff::VegetableForm.new(Vegetable.find(params[:id]))
  end

  def create
    @vegetable_form = Staff::VegetableForm.new
    @vegetable_form.assign_attributes(params[:form])
    if @vegetable_form.save
      flash.notice = '野菜データを追加しました。'
      redirect_to action: 'index'
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'new'
    end
  end

  def update
    @vegetable_form = Staff::VegetableForm.new(Vegetable.find(params[:id]))
    @vegetable_form.assign_attributes(params[:form])
    if @vegetable_form.save
      flash.notice = '野菜データを更新しました。'
      redirect_to action: 'index'
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'edit'
    end
  end

  def destroy
    vegetable = Vegetable.find(params[:id])
    vegetable.destroy!
    flash.notice = '野菜データを削除しました。'
    redirect_to :staff_vegetables
  end
  
  def show
    @vegetable = Vegetable.find(params[:id])
  end

  def getVegetableList
    @vegetables = Vegetable
  end
end
