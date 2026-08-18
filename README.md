#  Network (Social Network App)

A Twitter/Threads-like social network website built with Django (Python), JavaScript, HTML, and CSS as part of Harvard's CS50 Web Programming course (Project 4).

## Features Implemented

The application fulfills all the specifications outlined in the project requirements, alongside significant UI/UX improvements to provide a modern, premium aesthetic.

### 1. New Post
Users who are signed in are able to write a new text-based post by filling in text into a text area and clicking the "Post" button. The new post form is seamlessly integrated at the top of the "All Posts" page.

### 2. All Posts
The "All Posts" link in the navigation bar takes the user to a page where they can see all posts from all users, with the most recent posts appearing first.
Each post includes:
- The username of the poster (clickable, linking to their profile)
- The post content
- The date and time the post was made
- A "Like" button displaying the current number of likes

### 3. Profile Page
Clicking on a username loads that user's profile page. 
- The profile displays the number of followers the user has, as well as the number of people that the user follows.
- It displays all of the posts for that user, in reverse chronological order.
- For any other user who is signed in, the profile page displays a "Follow" or "Unfollow" button that lets the current user toggle whether or not they are following this user's posts.

### 4. Following
The "Following" link in the navigation bar (available only to signed-in users) takes the user to a page where they see all posts made by users that the current user follows. This page behaves just as the "All Posts" page does, displaying posts in reverse chronological order.

### 5. Pagination
All pages that display posts (All Posts, Profile, and Following) are limited to displaying 10 posts per page. 
If there are more than ten posts, pagination controls (Next, Previous, First, Last) appear at the bottom of the page to navigate through older or newer posts.

### 6. Edit Post
Users can click an "Edit" button on any of their own posts to edit them. 
- The content of the post is dynamically replaced with a `textarea` where the user can edit their content without a full page reload.
- Users can "Save" the edited post or "Cancel".
- The editing functionality uses asynchronous JavaScript `fetch` calls to update the database.
- Backend security ensures that it is not possible for a user to edit another user's posts.

### 7. "Like" and "Unlike"
Users can click a heart icon on any post to toggle whether or not they "like" that post.
- The like functionality is powered by asynchronous JavaScript `fetch` calls.
- The server updates the like count, and the post's like count displayed on the page is updated without requiring a reload of the entire page.

## Concepts Used
- **Backend:** Django ORM, Models, Authentication, Pagination
- **Frontend:** Vanilla JS, DOM Manipulation, CSS Flexbox & Animations
- **Communication:** Asynchronous JavaScript (Fetch API), RESTful API Endpoints

## UI / UX Enhancements
- **Modern Typography:** Uses Google's `Inter` font.
- **Micro-animations & Icons:** Integrated FontAwesome 6 icons with smooth CSS hover transitions.
- **Glassmorphism & Shadows:** Replaced standard elements with sleek, borderless cards featuring soft drop shadows and rounded corners.
- **Dynamic Liked State:** Heart icon smoothly scales and turns red when clicked.

## Getting Started

1. Navigate to the project directory.
2. Make sure you have Django installed (`pip install django`).
3. Run the database migrations:
   ```bash
   python manage.py makemigrations network
   python manage.py migrate
   ```
4. Start the development server:
   ```bash
   python manage.py runserver
   ```
5. Open your browser and navigate to `http://127.0.0.1:8000/`. You can register a new account to test out all the features!
