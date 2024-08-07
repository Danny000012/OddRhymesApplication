# Odd Rhymes

**Odd Rhymes** is a web application for sharing and interacting with rap posts. Users can create, read, update, and delete rap posts, add comments, like posts, and rate them. The application also supports searching and pagination of posts.

## Features

- **Create**: Add new rap posts to the platform.
- **Read**: View all rap posts, specific posts by ID, or posts by a particular user.
- **Update**: Edit existing rap posts and comments.
- **Delete**: Remove rap posts and comments.
- **Comment**: Add and delete comments on rap posts.
- **Like**: Like rap posts.
- **Rate**: Rate rap posts with a value between 1 and 5.
- **Search**: Search for posts by user or text.
- **Pagination**: Navigate through pages of posts.

## Technologies

- **Frontend**: Angular
- **Backend**: Node.js with Express
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (locally or via a cloud provider like MongoDB Atlas)

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/odd-rhymes.git

API Endpoints

### Posts
GET /api/rapposts: Retrieve all rap posts.
GET /api/rapposts/:id: Retrieve a specific rap post by ID.
POST /api/rapposts: Create a new rap post.
PUT /api/rapposts/:id: Update an existing rap post.
DELETE /api/rapposts/:id: Delete a rap post.

### Comments
POST /api/rapposts/:id/comments: Add a comment to a rap post.
DELETE /api/rapposts/:postId/comments/:commentId: Delete a comment from a rap post.
PUT /api/rapposts/:postId/comments/:commentId: Update a comment on a rap post.

### Likes
POST /api/rapposts/:id/like: Like a rap post.

### Ratings
POST /api/rapposts/:id/rate: Rate a rap post.

### Search
GET /api/rapposts/search: Search for posts by user or text.

### Pagination
GET /api/rapposts/paginate: Retrieve posts with pagination.

### Contributing
If you’d like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.
