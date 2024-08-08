const express = require('express');
const router = express.Router();
const RapPost = require('../models/RapPost');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await RapPost.find();
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts' });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await RapPost.findById(req.params.id);
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
    const posts = await RapPost.find({ user: req.params.username });
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts by user:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts by user' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = new RapPost(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error saving post:', err);
    res.status(500).json({ error: 'An error occurred while saving the post' });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await RapPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  console.log(`Deleting post with ID: ${req.params.id}`);
  try {
    const deletedPost = await RapPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      console.log('Post not found');
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log('Post deleted successfully');
    res.status(204).send();  // 204 No Content
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

  

// Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await RapPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
});

// Delete a comment
router.delete('/:postId/comments/:commentId', async (req, res) => {
    try {
      const post = await RapPost.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
  
      // Remove the comment from the comments array using the pull operator
      const result = await RapPost.updateOne(
        { _id: req.params.postId },
        { $pull: { comments: { _id: req.params.commentId } } }
      );
  
      if (result.modifiedCount === 0) return res.status(404).json({ error: 'Comment not found' });
  
      res.status(204).send();  // 204 No Content
    } catch (err) {
      console.error('Error deleting comment:', err);
      res.status(500).json({ error: 'An error occurred while deleting the comment' });
    }
});
  
// Search posts
router.get('/search', async (req, res) => {
  const { user, text } = req.query;
  try {
    const query = {};
    if (user) query.user = user;
    if (text) query.text = new RegExp(text, 'i');  // Case-insensitive search

    const posts = await RapPost.find(query);
    res.json(posts);
  } catch (err) {
    console.error('Error searching posts:', err);
    res.status(500).json({ error: 'An error occurred while searching posts' });
  }
});

// Pagination
router.get('/paginate', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const posts = await RapPost.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts with pagination:', err);
    res.status(500).json({ error: 'An error occurred while retrieving posts with pagination' });
  }
});

// Update a Comment
router.put('/:postId/comments/:commentId', async (req, res) => {
  try {
    const post = await RapPost.findById(req.params.postId);
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

// Like a Post  
router.post('/:id/like', async (req, res) => {
  try {
    const post = await RapPost.findById(req.params.id);
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
    const post = await RapPost.findById(req.params.id);
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

module.exports = router;
