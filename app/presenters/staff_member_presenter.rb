class StaffMemberPresenter < ModelPresenter
  delegate :suspended?, to: :object
  
  # 職員の停止フラグのon/offをを表現する記号を返す
  # on: BALLOT BOX WITH CHECK(U+2611)
  # oFF: BALLOT BOX(U+2610)
  def suspended_mark
    suspended? ? raw('&#x2611;'): raw('&#x2610;')
  end
end