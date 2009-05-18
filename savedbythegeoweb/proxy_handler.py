# import os
# import wsgiref.handlers
# from google.appengine.ext.webapp import template
# from google.appengine.ext import webapp
# from google.appengine.ext.webapp.util import run_wsgi_app
# 
# class Main(webapp.RequestHandler):
#   def get(self):
#     # we do this because we need to find the path to the template.
#     # it's relative to the path of this file, so if the url has apis/ajax/playground
#     # we need to take it out
#     path = self.request.path
#     path = path[1:]
#     path = path.replace('apis/ajax/playground/', '')
# 
#     url = self.request.url
#     self.response.out.write(template.render(path, self.template_values))
# 
# application = webapp.WSGIApplication([(r'/samples/boilerplateHTML/.*', Main),
#                                       (r'/apis/ajax/playground/samples/boilerplateHTML/.*', Main)
#                                      ],
#                                      debug=False)
# 
# def main():
#   run_wsgi_app(application)
# 
# 
# if __name__ == '__main__':
#   main()

import os
import cgi
import urllib
import httplib
import wsgiref.handlers
from google.appengine.ext import webapp
from google.appengine.api import urlfetch
from google.appengine.ext.webapp.util import run_wsgi_app

class ProxyController(webapp.RequestHandler):

    def doProxy(self, p, urlmethod):

        location=''
        page = self.response.out

        if p.get('a','') == '':
            page.write("page not found on query string")
        else:
            location = p['a']
            p['a']=''
            params=urllib.urlencode(p)
            location+='?'+params
            result = urlfetch.fetch(url = location, method = urlmethod) 
            self.response.out.write(result.content)

    def get(self):
        self.doProxy(self.request.str_GET,urlfetch.GET)

    def post(self):
        self.doProxy(self.request.str_POST,urlfetch.POST)

application = webapp.WSGIApplication([(r'/proxy/.*', ProxyController)],
                                     debug=False)
                                     
"""
Some explanation:
To make it work, just point to the address http://www.mydomain.com/jsonProxy?a=somepage&param=1&param2=something

 ProxyController will call http://www.otherdomain.com/somepage.php and pass the other parameters on the query string using urlfetch.
After fetching, it will print the string and then you can use on your javascript.
application = webapp.WSGIApplication([('/jsonProxy', ProxyController)],debug=True)
"""
def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()