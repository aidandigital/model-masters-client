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
* Cloudinary
* Multer

## Features
### Frontend:
* Login / Register UI, with the ability to log back in on any page without losing progress on said page.
* Settings page where users can update their profile, change their password, and view a full login history.
* Complex image upload component that allows users to add, preview, and delete up to 8 images. Also automatically converts HEIC images to JPEG.
* Admin dashboard that allows authorized users to upgrade, demote, and lock accounts.
* Personalized Header and Pages based on user permissions.
### Backend:
* HTTP API
* Authentication and Authorization
* Database schemas, controllers, and aggregation pipelines for CRUD operations.
* Form validation and NoSQL injection sanitation with helpful error messages for users.
* File upload middleware that supports multiple images at once, validates for type and mimetype, and interprets/validates JSON data attached to the same request. Valid files are then transferred automatically from the local FS to Cloudinary.

## Backend Code
Repo: https://github.com/aidandigital/model-masters-api

## License & Notice
Copyright (c) 2022 Aidan Digital

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