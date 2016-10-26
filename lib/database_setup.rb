require 'sequel'

env = ENV['DB_ENV_VAR'] || 'development'


DB = Sequel.connect(ENV['DATABASE_URL'] || "postgres://localhost/the-shire_#{env}")

# DB.extension :pg_json

# require './lib/model/file'
