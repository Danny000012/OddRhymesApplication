const express = require('express');
const router = express.Router();
const rapPost = require('../models/rapPost');
const users = require('../models/users')
const authenticate = require('../middleware/authenticate');  // Adjust the path

//router.use(authenticate);  // Apply to all routes

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await rapPost.find();
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts' });
  }
});

// Search posts
router.get('/search', async (req, res) => {
  const { user, text, id, limit, page } = req.query;

  try {
      const query = {};
      if (user) query.user = user;
      if (text) query.text = new RegExp(text, 'i');  // Case-insensitive search
      if (id) query._id = id;  // Search by specific ID

      // Pagination
      const limitNum = parseInt(limit) || 10;
      const pageNum = parseInt(page) || 1;
      const skip = (pageNum - 1) * limitNum;

      const posts = await rapPost.find(query).limit(limitNum).skip(skip);

      if (posts.length === 0) {
          return res.status(404).json({ message: 'No posts found' });
      }

      res.status(200).json(posts);
  } catch (err) {
      console.error('Error searching posts:', err);
      res.status(500).json({ error: 'An error occurred while searching posts' });
  }
});

// Pagination
router.get('/paginate', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const posts = await rapPost.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts with pagination:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts with pagination' });
  }
});

// Apply authentication middleware to protected routes
router.use(authenticate);

// Like a Post  
router.post('/:id/like', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ error: 'An error occurred while liking the post' });
  }
});
  
// Rate a Post
router.post('/:id/rate', async (req, res) => {
  const { rating } = req.body;
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    post.ratings = post.ratings || [];
    post.ratings.push(rating);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Error rating post:', err);
    res.status(500).json({ error: 'An error occurred while rating the post' });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Error retrieving post:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the post' });
  }
});

// Get Posts by User
router.get('/user/:username', async (req, res) => {
  try {
    const posts = await rapPost.find({ user: req.params.username });
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts by user:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts by user' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { user } = req.body;

    // Check if user exists in the database
    const existingUser = await users.findOne({ username: user });
    if (!existingUser) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const newPost = new rapPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ error: 'An error occurred while saving the post' });
  }
});

// Update a post (only if the user is the author)
router.put('/:id', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.user !== req.user.username) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedPost = await rapPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
});

// Delete a post (only if the user is the author)
router.delete('/:id', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.user !== req.user.username) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await rapPost.findByIdAndDelete(req.params.id);
    res.status(204).send();  // 204 No Content
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

// Add a comment to a post (only if the user is the author of the comment)
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = { ...req.body, user: req.user.username };
    post.comments.push(comment);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
});

// Delete a comment (only if the user is the author of the comment)
router.delete('/:postId/comments/:commentId', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user !== req.user.username) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    post.comments.pull(req.params.commentId);
    await post.save();
    res.status(204).send();  // 204 No Content
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'An error occurred while deleting the comment' });
  }
});

// Update a Comment
router.put('/:postId/comments/:commentId', async (req, res) => {
  try {
    const post = await rapPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
    comment.set(req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).json({ error: 'An error occurred while updating the comment' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
      const user = await users.find(); // Fetch all users
      res.status(200).json(user);
  } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Get user profile by username
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await users.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Exclude sensitive information if needed
    const { password, ...userProfile } = user.toObject();
    res.json(userProfile);
  } catch (err) {
    console.error('Error retrieving user profile:', err);
    res.status(500).json({ error: 'An error occurred while retrieving the user profile' });
  }
});


module.exports = router;
