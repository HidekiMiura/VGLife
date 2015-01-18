class VegetabletaskPresenter < ModelPresenter

  delegate :vegetable_code, :temperate, :cultivate_task_code, :cultivate_task_name, :cultivate_task_type, :cultivate_task_term, :cultivate_task_comment, :cultivate_task_image, to: :object
  
  def table_row
    markup(:tr) do |m|
      m.td(:style =>"border-bottom: 4px outset #fffff0;background-color: #FFFF99;color: #438D80;font-weight: bold;") do
        m.input(:value =>cultivate_task_name, :type =>"button", :style =>"background: none;text-decoration: underline;", :onClick =>"showDialog(\"" + cultivate_task_name + "\",\"" + cultivate_task_comment + "\")")
      end
      m.td do
        if cultivate_task_image.include?("bmp")
          m.input(:type =>"image", :src =>"/assets/gardenplans/" + cultivate_task_image)
        else
          m << '&nbsp;&nbsp;&nbsp;&nbsp;'
          m.input(:type =>"text", :value =>cultivate_task_image, :disabled =>true, :size =>77)
        end
      end
    end
  end
end
