# Model Masters

## Description
A custom platform for car and vehicle model enthusiasts to share their creations. Users can sign up, or log in as a guest in order to view posts made by other users in a fashion similar to social media sites. Verified users can publish their models along with up to 10 photos, a description, and more.

## Tech used
### Frontend:
* React
* React Router
* AJAX / API Consumption
* Tailwind CSS
### Backend:
* Node.js®
* Express.js
* MongoDB®
* Passport.js
* Mongoose
* AWS S3

## Features
### Frontend:
* Login / Register UI, with the ability to log back in on any page without losing progress on said page.
* A settings page where users can update their profile, change their password, and view a full login history.
* An advanced image upload component that allows users to add, preview, prioritize, and delete photos of their models. Photos are automatically compressed, stripped of privacy-invading EXIF data, and securely uploaded.
* User and model search pages, in addition to individual profiles and posts that employ custom lazy-loaded image carousels for appeal and optimized performance.
* Admin dashboard that allows authorized users to upgrade/demote the privileges of other users as well as approve/lock accounts.
* Error reporting and content flagging features to make the site safer and more reliable.
* Personalized headers and pages based on user permissions.
### Backend:
* HTTP API
* Authentication functionality that hashes passwords with a salt for added security.
* Authorization logic based on multiple tiers of abilities users can have.
* Database schemas, controllers, and aggregation pipelines for CRUD operations.
* Form validation and sanitation with helpful error messages that are passed on to users.
* Functionality for securely requesting and generating signed URL's that allow users to seamlessly upload, alter, and delete photos of their models.

## Backend Code
Repo: https://github.com/aidandigital/model-masters-api

## License & Notice
Copyright (c) 2025 Aidan Digital

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.