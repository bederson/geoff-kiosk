#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import jinja2
import webapp2
import urllib2
import logging
import json
import socket
import random
from google.appengine.api import channel
from google.appengine.ext import db

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
    
class MainHandler(webapp2.RequestHandler):
    def get(self):
        client_id = "12345"
        token = channel.create_channel(client_id)
        
        template_values = {
            'token': token
        }
        template = JINJA_ENVIRONMENT.get_template("init.html")
        self.response.write(template.render(template_values))

class NavigateHandler(webapp2.RequestHandler):
    def get(self):
        port = self.request.get("port")
        url = self.request.get("url")

        socket_url = getSocket(port)
        logging.debug("SOCKET URL = " + socket_url)
        logging.debug("URL = " + url)
        
        msg = {
            'socket_url': socket_url,
            'url': url
        }
        
        channel.send_message("12345", json.dumps(msg))

def getSocket(port):
    url = "http://localhost:" + port + "/json"
    try:
        result = urllib2.urlopen(url)
        data = result.read()
        dataj = json.loads(data)
        socketUrl = ""
        tab = dataj[0]
        if 'id' in tab:
            socketUrl = "ws://localhost:" + port + "/devtools/page/" + tab['id']
        else:
            logging.debug("Error: tab = " + str(tab))
        return socketUrl
    except urllib2.URLError, e:
        logging.debug("URL error: " + e)
        
app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/navigate', NavigateHandler),
], debug=True)

