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

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class SocketHandler(webapp2.RequestHandler):
    def get(self):
        port = self.request.get("port")
        if port:
            socket_url = getSocket(port, "json")
            self.response.write(socket_url)
    
class MainHandler(webapp2.RequestHandler):
    def get(self):
        side1_port = "9223"
        socketUrl = getSocket(side1_port, "json")
        template_values = {'side1_url': socketUrl}
        url = self.request.url
        file = url[url.index("/", 7):]
        template = JINJA_ENVIRONMENT.get_template(file)
        self.response.write(template.render(template_values))

def getSocket(port, title):
    url = "http://localhost:" + port + "/" + title
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
    ('/get_socket', SocketHandler),
    ('/.*', MainHandler)
], debug=True)
