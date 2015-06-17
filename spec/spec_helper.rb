ENV['VORA_DB_ENV'] = 'test'

require './server'
require 'capybara/rspec'
require 'database_cleaner'

Capybara.app = Server

# DB = Sequel.connect("postgres://localhost/dbname_test");

RSpec.configure do |config|


  # Need to understand more about Sequel transactions and testing.
  # Feel free to make a pull request!
  config.around :each do |example|
    DB.transaction(:rollback=>:always, :auto_savepoint=>true){example.run}
  end

end
