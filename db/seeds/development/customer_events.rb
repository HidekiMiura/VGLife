customers = Customer.all
256.times do |n|
  m = customers.sample
  e = m.events.build
  if n.even?
    e.type = 'logged_in'
  else
    e.type = 'logged_out'
  end
  e.occurred_at = (256 - n).hours.ago
  e.save!
end