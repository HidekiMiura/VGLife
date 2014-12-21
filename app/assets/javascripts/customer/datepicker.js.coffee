$(document).on 'page:change', ->
  $('.task_event_date-picker').datepicker({
    minDate: new Date(1900, 1, 1),
    maxDate: new Date(),
    changeMonth: true,
    changeYear: true,
    yearRange: '1900:+00',
    defaultDate: '2014-01-01'
  })
