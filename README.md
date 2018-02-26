# review-fetch
Customizable app for improving companies reputations.

## MVP Requirements
 	- Data Importing
 	- Email Template Viewing
 	- Successful Email Send / Recieve
 	- Feedback Landing Pages (negative: internal form feedback| positive: direct reviews)
### Pages
	• Home/Dashboard - reviewfetch.com/# > Login Modal if not signed in
		• Settings - reviewfetch.com/setup
		• Manage Contact Data - reviewfetch.com/data
		• Fetch Reviews Campaign Page - reviewfetch.com/fetch
		• Analytics - reviewfetch.com/analytics

## Additional Needs
 	- Login Functionality
 	- Data Management (import/export/upsert/delete)
 	- Email Template (adding / changing / different types)
 	- Analytics (track campaigns / existing feedback / tag customers)

### Nice to Have
	- SMS
	- Templated Application (branding resale)
	- Business Listing Integrations - Prepopulated messages / templates / remove friction
	- Custom Survey / Reporting
	- OPT IN further contact/feedback (for negative form)

## SAMPLE REVIEW URLS
**Google**
`https://www.google.com/search?source=hp&ei=QreRWqCVPMqgjwPT84PwBw&q=cs+design+studios&oq=cs+design+&gs_l=psy-ab.3.0.0l10.1020.1915.0.2666.11.7.0.2.2.0.178.839.4j3.7.0....0...1c.1.64.psy-ab..2.9.855.0..0i131k1j0i131i46k1j46i131k1.0.jUJ9WtfdjSM#lrd=0x86d66eff1714e775:0x8b275482698d0703,3,,,`

**Yelp**
`https://www.yelp.com/writeareview/biz/aSPHnb8ViWq7c6x6NDkatg?return_url=%2Fbiz%2FaSPHnb8ViWq7c6x6NDkatg`

**BBB**
`https://www.bbb.org/tucson/business-reviews/web-design/cs-design-studios-in-tucson-az-20024770/reviews-and-complaints/?review=true`




# Week 16 - Project Suggestions

### Overview

Since projects are being worked on this week, you won't have a homework assignment, but a project is a perfect context in which to practice writing tests! 

Incorporate a few of the below suggestions into your project. You'll write better code, and it will help you consolidate your testing habits.

- - -

### Testing Suggestions

* Set up Karma so you can run your tests as you develop.

* Prior to implementing a feature, use Nightmare to write a functional test for it.

* Prior to implementing a function, use Mocha and Chai to write unit tests against it.

* Run your tests prior to committing your code so you can be sure nothing breaks between commits.

* **Non-Obligatory Bonus**: If you're confident and feel like you have some time to tinker, set up [Travis CI](https://travis-ci.org/). This will automatically run your tests whenever you or any of your team members makes a commit. 

# Project Requirements

This document outlines the base requirements for Project 2.

### Requirements

Your project must:

* Use a Node and Express Web Server;

* Be backed by a MySQL Database an ORM (not necessarily Sequelize);

* Have both GET and POST routes for retrieving and adding new data;

* Be deployed using Heroku (with Data);

* Utilize at least one new library, package, or technology that we haven’t discussed;

* Have a polished frontend / UI;

* Have folder structure that meets MVC Paradigm;

* Meet good quality coding standards (indentation, scoping, naming).

* Must not expose sensitive API key information on the server, see [Protecting-API-Keys-In-Node.md](../../../10-nodejs/03-Supplemental/Protecting-API-Keys-In-Node.md)

### Suggestions

Your project _should_:

* Incorporate Basic Testing Framework, see [Project Suggestions](../Suggestions/README.md);

* Use Handlebars for Server-Side Templating

* Incorporate Authentication (JSON Web Tokens, Sessions, Etc.)

* Use an existing public dataset to power the database

* Create a migration strategy for sharing data across team members.
