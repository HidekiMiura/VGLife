class Admin::SessionsController < Admin::Base
  skip_before_action :authorize
  def new
    if current_administrator
      redirect_to :staff_root
    else
      @form = Admin::LoginForm.new
      render action: 'new'
    end
  end
  
  def create
    @form = Admin::LoginForm.new(params[:admin_login_form])
      if @form.email.present?
        staff_member = StaffMember.find_by(email_for_index: @form.email.downcase)
      end
      if Admin::Authenticator.new(staff_member).authenticate(@form.password)
        session[:staff_member_id] = staff_member.id
        flash.notice = 'ようこそ' + staff_member.family_name + '様'
        redirect_to :admin_root
      else
        flash.now.alert = 'メールアドレスまたはパスワードが正しくありません。'
        render action: 'new'
      end
  end
  
  def destroy
    session.delete(:staff_member_id)
    flash.notice = 'ログアウトしました。'
    redirect_to :admin_root
  end
end