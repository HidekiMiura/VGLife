class Customer::Base < ApplicationController
  before_action :authorize
  before_action :check_timeout
  before_action :detect_locale

  # ２カ国化
  protect_from_forgery with: :exception
 
  def default_url_options(options = {})
    { :locale => I18n.locale }
  end
  
  private
  def detect_locale
    if params[:locale].nil?
p "★detect_locale:params[:locale].nil"
      I18n.locale = request.headers['Accept-Language'].scan(/^[a-z]{2}/).first
    else
p "★detect_locale:else"
      I18n.locale = params[:locale]
    end
  end
  def customer_locale
      I18n.locale
p "★I18n.locale:" + I18n.locale.inspect
  end

  def current_customer
    if session[:customer_id]
      @current_customer ||=
        Customer.find_by(id: session[:customer_id])
    end
  end
  
  helper_method :current_customer
  helper_method :customer_locale
  
  def authorize
    unless current_customer
      flash.alert = 'ログインしてください。'
      redirect_to :customer_login
    end
  end
  
  TIMEOUT = 60.minutes
  
  def check_timeout
    if current_customer
      if session[:last_access_time] >= TIMEOUT.ago
        session[:last_access_time] = Time.current
      else
        session.delete(:customer_id)
        flash.alert = 'セッションがタイムアウトしました。'
        redirect_to :customer_login
      end
    end
  end
end