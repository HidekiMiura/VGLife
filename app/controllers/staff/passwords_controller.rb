class Staff::PasswordsController < Staff::Base
  def show
    redirect_to :edit_staff_password
  end
  
  def edit
    @change_password_form = ChangePasswordForm.new(object: current_staff_member)
  end
  
  def update
    @change_password_form = ChangePasswordForm.new(staff_member_params)
    @change_password_form.object = current_staff_member
    if @change_password_form.save
      flash.notice = 'パスワードを変更しました。'
      redirect_to :staff_account
    else
      flash.now.alert = '入力に誤りがあります。'
      render action: 'edit'
    end
  end
  
  private
  def staff_member_params
    params.require(:change_password_form).permit(:current_password, :new_password, :new_password_confirmation)
# puts "#params" + params.inspect
  end
end
