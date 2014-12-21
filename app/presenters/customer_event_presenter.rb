class CustomerEventPresenter < ModelPresenter
  delegate :customer, :description, :occurred_at, to: :object

  def table_row
    markup(:tr) do |m|
      unless view_context.instance_variable_get(:@customer)
        m.td do
          m << link_to(customer.nickname,
            [ :admin, customer, :customer_events ])
        end
        m.td description
        m.td(:class => 'date') do
          m.text occurred_at.strftime('%Y/%m/%d %H:%M:%S')
        end
      end
    end
  end
end