class Customer::Base < ApplicationController
  before_action :authorize
  before_action :check_timeout

  private
  def current_customer
    if session[:customer_id]
      @current_customer ||=
        Customer.find_by(id: session[:customer_id])
    end
  end
  
  helper_method :current_customer
  
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