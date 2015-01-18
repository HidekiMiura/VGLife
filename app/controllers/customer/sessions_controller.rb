class Customer::SessionsController < Customer::Base
  skip_before_action :authorize
  def new
    if current_customer
      redirect_to :customer_root
    else
      @form = Customer::LoginForm.new
      sql = "SELECT * FROM whatsnews WHERE reflect_start_date <= '" + Time.now.strftime("%Y-%m-%d") + "'"
      @whatsnews = Whatsnew.find_by_sql(sql)
      render action: 'new'
    end
  end
  def accountnew
    @customer_form = Customer::CustomerForm.new
    render action: 'account_new'
  end
  
  def accountcreate
    @customer_form = Customer::CustomerForm.new
    @customer_form.assign_attributes(params[:form])
    if @customer_form.save
      session[:customer_id] = @customer_form.customer.id
      session[:last_access_time] = Time.current
      flash.notice = '顧客を追加しました。'
      redirect_to :customer_root
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'account_new'
    end
  end
  def create
#    if params[:commit] == "entry" || params[:commit] == "登録" then
#      @customer_form = Staff::CustomerForm.new
#      render action: 'account_new'
#    else
    @form = Customer::LoginForm.new(params[:customer_login_form])
      if @form.email.present?
        customer = Customer.find_by(email_for_index: @form.email.downcase)
      end
      if Customer::Authenticator.new(customer).authenticate(@form.password)
        session[:customer_id] = customer.id
        session[:last_access_time] = Time.current
        customer.events.create!(type: 'logged_in')  
        flash.notice = 'ようこそ' + customer.nickname + '様'
        redirect_to :customer_root
      else
        flash.now.alert = 'メールアドレスまたはパスワードが正しくありません。'
        render action: 'new'
      end
  end
  
  def destroy
    if current_customer
      current_customer.events.create!(type: 'logged_out')
    end
    session.delete(:customer_id)
    flash.notice = 'ログアウトしました。'
    redirect_to :customer_root
  end
end