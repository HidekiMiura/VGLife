$(document).on 'page:change', ->
  d = new Date()
  $.datepicker.setDefaults({
    dateFormat: "yy-mm-dd",
    minDate: new Date(2014, 1, 1),
    maxDate: Date(d.getFullYear() + 1, d.getMonth(), d.getDate() - 1)
  })
  $('.datepicker').datepicker()
