class Customer::SessionsController < Customer::Base
  skip_before_action :authorize
  def new
    if current_customer
      redirect_to :customer_root
    else
      @form = Customer::LoginForm.new
      render action: 'new'
    end
  end
  
  def create
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