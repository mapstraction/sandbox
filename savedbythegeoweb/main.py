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




__author__ = 'lisbakke@google.com (Ben Lisbakken)'

import os
import cgi
import wsgiref.handlers

from google.appengine.api import users
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.api import memcache
from google.appengine.api import urlfetch

class SavedCode(db.Model):
  code = db.TextProperty()
  date = db.DateTimeProperty(auto_now_add=True)

class AddCode(webapp.RequestHandler):
  def saveCode(self, code):
    # Max in database must be found, then my ID is that +1
    saved_code = SavedCode()
    saved_code.code = code
    key = ''
    try:
      key = saved_code.put()
    except:
      key = saved_code.put()

    return key
  
  def post(self):
    code = self.request.get('code')
    ip = self.request.remote_addr;
    data = memcache.get(ip)
    if data is not None:
      self.response.out.write('Rate limited.')
    else:
      # Store that this IP added code in the last 10 seconds
      memcache.add(key = ip, value = "1", time = 10)
      # Super hack :D IE won't let an HTML input element store newline chars, so I
      # change them to NEWLINE!!! for the input element, then on the serverside
      # change them back to actual newlines.  It's high tech.
      code = code.replace('NEWLINE!!!', '\n');
      if (code):
        key = self.saveCode(code)
        self.redirect('/?id=' + str(key))
      else:
        self.response.out.write('Must submit code.')

class CacheCode(webapp.RequestHandler):
  def post(self):
    code = self.request.get('code')
    saved_code = SavedCode()
    saved_code.code = code
    key = ''
    try:
      key = saved_code.put()
    except:
      key = saved_code.put()
    self.response.out.write(str(key))

class RetrieveCache(webapp.RequestHandler):
  def get(self):
    unique_id = self.request.get('unique_id')
    defaultSample = self.request.get('defaultSample')
    self.response.headers['P3P'] = 'CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"'
    code = ''
    if defaultSample:
      self.response.headers['Expires'] = "Fri, 01 Jan 1990 00:00:00 GMT"
      self.response.headers['content-type'] = 'text/html'
      self.response.headers['cache-control'] = 'no-cache, no-store, max-age=0, must-revalidate'
      code = memcache.get(unique_id)
      if code:
        self.response.out.write(code)
      else:
        uniqueSplit = unique_id.split('|')
        bpUrl = uniqueSplit[0]
        jsUrl = uniqueSplit[1]
        bpData = urlfetch.fetch(bpUrl, "GET").content
        jsData = urlfetch.fetch(jsUrl, "GET").content
        bpData = bpData.replace('INSERT_JAVASCRIPT_HERE', jsData)
        memcache.set(unique_id, bpData, 600)
        self.response.out.write(bpData)
    else:
      codeObj = db.get(db.Key(str(unique_id)))
      if codeObj is None:
        self.response.out.write('Deleted.')
      else:
        code = codeObj.code
        code = code.replace('NEWLINE!!!', '\n');
        db.delete(codeObj)
        self.response.out.write(code)

class ShowCode(webapp.RequestHandler):
  def get(self):
    key = self.request.get('id')
    if (key):
      saved_code = db.get(db.Key(str(key)))
      self.response.out.write(saved_code.code)
    else:
      self.response.out.write('Must supply code ID')

def main():
  application = webapp.WSGIApplication([
    ('/add', AddCode),
    ('/', ShowCode),
    ('/cache_code', CacheCode),
    ('/retrieve_cache', RetrieveCache),
    ('/show', ShowCode)
  ],debug=False)                        
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
