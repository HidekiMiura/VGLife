class Staff::SessionsController < Staff::Base
  skip_before_action :authorize
  
  def new
    if current_staff_member
      redirect_to :staff_root
    else
      @form = Staff::LoginForm.new
      render action: 'new'
    end
  end
  
  def create
    @form = Staff::LoginForm.new(params[:staff_login_form])
      if @form.email.present?
        staff_member = StaffMember.find_by(email_for_index: @form.email.downcase)
      end
      if Staff::Authenticator.new(staff_member).authenticate(@form.password)
        if staff_member.suspended?
          flash.now.alert = 'アカウントが停止されています。'
          render action: 'new'
        else
          session[:staff_member_id] = staff_member.id
          session[:last_access_time] = Time.current
          flash.notice = 'ようこそ' + staff_member.family_name + '様'
          redirect_to :staff_root
        end
      else
        flash.now.alert = 'メールアドレスまたはパスワードが正しくありません。'
        render action: 'new'
      end
  end
  
  def destroy
    session.delete(:staff_member_id)
    redirect_to :staff_root
  end
end