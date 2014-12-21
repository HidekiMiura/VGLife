module ApplicationHelper
  include HtmlBuilder
 
  def document_title
    if @title.present?
      "#{@title} - VegetableGardenLife"
    else
      'VegetableGardenLife'
    end
  end
end
