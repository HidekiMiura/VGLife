class VegetabletaskPresenter < ModelPresenter

  delegate :vegetable_code, :temperate, :cultivate_task_code, :cultivate_task_name, :cultivate_task_type, :cultivate_task_term, :cultivate_task_comment, :cultivate_task_image, to: :object
  
  def table_row
    markup(:tr) do |m|
      m.td(:style =>"border-bottom: 4px outset #fffff0;background-color: #FFFF99;color: #438D80;font-weight: bold;") do
        m << cultivate_task_name
      end
      m.td do
        m.input(:type =>"image", :src =>"/assets/" + cultivate_task_image)
      end
    end
  end
end
