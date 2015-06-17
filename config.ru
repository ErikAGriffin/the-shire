require 'rack/protection'
require './server'

use Rack::Static, root:'public', urls:['/components','/js','/views','/styles','/images','/media']
use Rack::Session::Cookie, secret: SecureRandom.hex(64)
use Rack::Protection

# Allows realtime heroku logs
$stdout.sync = true

run Server.new
