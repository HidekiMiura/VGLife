class FormPresenter
  include HtmlBuilder
  
  attr_reader :form_builder, :view_context
  delegate :label, :text_field, :password_field, :check_box, :radio_button, :text_area, :hidden_field, :object, to: :form_builder
  
  def initialize(form_builder, view_context)
    @form_builder = form_builder
    @view_context = view_context
  end
  
  def notes
    markup(:div, class: 'notes') do |m|
      m.span '*', class: 'mark'
      m.text I18n.t('com.requiredMessage')
    end
  end
  
  def text_field_block(name, label_text, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label(name, label_text, options)
      m << text_field(name, options)
      m << error_messages_for(name)
    end
  end
  
  def checkbox_field_block(name, label_text, options = {})
    markup(:div, class: 'input-block') do |m|
      m << label_text
      m << check_box(name, options)
      m << error_messages_for(name)
    end
  end

  def text_field_search_block(name, label_text, div_label_space = nil, div_text_space = nil, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label_search(name, label_text, options)
      m.div(style:"float:left;height:10px;width:" + div_label_space) if div_label_space != nil
      m << decorated_text_field_search(name, options)
      m.div(style:"float:left;height:10px;width:" + div_text_space) if div_text_space != nil 
      m << error_messages_for(name)
    end
  end
  
  def phone_field_search_block(name, label_text, div_label_space = nil, div_text_space = nil, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label_search(name, label_text, options)
      m.div(style:"float:left;height:10px;width:" + div_label_space) if div_label_space != nil
      m << decorated_phone_field_search(name, options)
      m.div(style:"float:left;height:10px;width:" + div_text_space) if div_text_space != nil 
      m << error_messages_for(name)
    end
  end
  
  def password_field_block(name, label_text, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label(name, label_text, options)
      m << password_field(name, options)
      m << error_messages_for(name)
    end
  end

  def date_field_block(name, label_text, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label(name, label_text, options)
      if options[:class].kind_of?(String)
        classes = options[:class].strip.slit + [ 'datepicker' ]
        options[:class] = classes.uniq.join(' ')
      else
        options[:class] = ' datepicker'
      end
      m << text_field(name, options)
      m << error_messages_for(name)
    end
  end
  
def drop_down_list_block(name, label_text, choices, options = {})
  markup(:div, class: 'input-block') do |m|
    m << decorated_label_search(name, label_text, options)
    m << form_builder.select(name, choices, { include_blank: true }, options)
    m << error_messages_for(name)
  end
end    

def drop_down_list_search_block(name, label_text,  div_label_space, choices, options = {})
    markup(:div, class: 'input-block') do |m|
      m << decorated_label_search(name, label_text, options)
      m.div(style:"float:left;height:10px;width:" + div_label_space) if div_label_space != nil
      m << form_builder.select(name, choices, { include_blank: true }, options)
      m << error_messages_for(name)
    end
  end    
    
  def error_messages_for(name)
    markup do |m|
      object.errors.full_messages_for(name).each do |message|
        m.div(class: 'error-message') do |n|
          n.text message
        end
      end
    end
  end
  
  def decorated_label(name, label_text, options = {})
    label(name, label_text, class: options[:required] ? 'required' : nil)
  end
  def decorated_label_search(name, label_text, options = {})
    label(name, label_text, style: "float:left", class: options[:required] ? 'required' : nil)
  end
  def decorated_text_field_search(name, options = {})
    text_field(name, style: "float:left")
  end
  def decorated_phone_field_search(name, options = {})
    text_field(name, style: "float:left", type: "tel")
  end
end