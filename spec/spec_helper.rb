ENV['DB_ENV_VAR'] = 'test'

require './server'
require 'capybara/rspec'

Capybara.app = Server

RSpec.configure do |config|


  # Need to understand more about Sequel transactions and testing.
  # Feel free to make a pull request!
  config.around :each do |example|
    DB.transaction(:rollback=>:always, :auto_savepoint=>true){example.run}
  end

end
