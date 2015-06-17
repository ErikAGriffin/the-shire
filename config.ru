require 'rack/protection'
require './server'

use Rack::Static, root:'public', urls:['/components','/js','/views','/styles']
use Rack::Session::Cookie, secret: SecureRandom.hex(64)
use Rack::Protection

run Server.new
