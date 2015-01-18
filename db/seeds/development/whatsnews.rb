10.times do |n|
    c = Whatsnew.create!(
#      reflect_start_date: "2015-01-16",  # 反映開始日
      reflect_end_date:   "2015-11-19",   # 反映終了日
      reflect_start_date: Time.now - 5.days,  # 反映開始日
      reflect_end_date:   100.days.since,  # 反映終了日
      transition_url:     "miura" + n.to_s + ".com",                # 遷移先URL
      whatsnews_type:     "vegetablegarden",         # 新着Type
      show_text:          "イベント情報更新しました。（miuraコメント１）" + n.to_s + ".com",                  # 表示テキスト         
      update_id:          "miura.hideki@fernet.co.jp"                  # 更新者ID             

    )
end
