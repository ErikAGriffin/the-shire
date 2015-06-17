require 'sequel'

env = ENV['DB_ENV_VAR'] || 'development'


DB = Sequel.connect(ENV['DATABASE_URL'] || "postgres://localhost/the-shire_#{env}")


# require './lib/model/file'
