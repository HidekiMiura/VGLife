class GardenplaneventPresenter < ModelPresenter

  delegate :task_show_title, :task_event_date, :task_type, to: :object

  def table_row
    markup(:tr) do |m|
      unless view_context.instance_variable_get(:@gardenplanevent)
#        m.td do
#          m << link_to(customer.nickname,
#            [ :admin, customer, :customer_events ])
#        end
        m.td(:class => 'date') do
          m.text task_event_date.strftime('%m/%d')
        end
        m.td do
          m.img(:src =>"/assets/aaa.png",:height =>"20px")
          m << '&nbsp;'
          m.input(:value =>task_show_title, :style =>"width:30px;border-radius: 20px;background-color: blue;")
        end
      end
    end
  end
end
