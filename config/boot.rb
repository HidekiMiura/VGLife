# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exist?(ENV['BUNDLE_GEMFILE'])

# Hack to explicitly remove server.pid on startup until issue is fixed in RubyMine / JRuby
begin
  File.delete(File.expand_path('../../tmp/pids/server.pid',  __FILE__))
rescue
  # Do nothing
end