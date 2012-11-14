#!/usr/bin/env python
#
# Simple message board

from google.appengine.ext import ndb
from google.appengine.ext.webapp import template
import logging
import webapp2

class Photo(ndb.Model):
    url = ndb.StringProperty(default='')
    caption = ndb.StringProperty(default='')
    created_date_time = ndb.DateTimeProperty(auto_now_add=True)
    
class AdminHandler(webapp2.RequestHandler):
    def get(self):
        photos = Photo.query().order(-Photo.created_date_time).fetch(20)
        self.response.out.write(template.render('templates/main.html', {'photos': photos}))

    def post(self):
        new_message = Photo(url = self.request.get('url'), caption = self.request.get('caption'))
        new_message.put()
        self.redirect('/')

    
class SlideshowHandler(webapp2.RequestHandler):
    def get(self):
        photos = Photo.query().order(-Photo.created_date_time).fetch(20)
        self.response.out.write(template.render('templates/slideshow.html', {'photos': photos}))


app = webapp2.WSGIApplication([
    ('/admin', AdminHandler),
    ('/', SlideshowHandler)
], debug=True)
