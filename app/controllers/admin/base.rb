class Admin::Base < ApplicationController
  before_action :authorize
  
  private
  def current_administrator
    if session[:staff_member_id]
      @current_staff_member ||=
        StaffMember.find_by(id: session[:staff_member_id])
    end
  end

  helper_method :current_administrator
  
  def authorize
    unless current_administrator
      flash.alert = '管理者としてログインしてください。'
      redirect_to :admin_login
    end
  end
end