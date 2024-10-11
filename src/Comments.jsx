import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const Comment = ({ author, text }) => {
  return (
    <div className="border pl-5 border-gray-200 py-2 mb-2">
      <p className="font-semibold">{author}</p>
      <p>{text}</p>
    </div>
  );
};

const Comments = () => {

  const { titleid } = useParams(); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ username: '', comment: '' });
  const [error, setError] = useState('');

  // FETCH COMMENTS
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments?id=${titleid}`);
        setComments(response.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
        setError('Failed to load comments.');
      }
    };

    fetchComments();
  }, [titleid]);


  // POST COMMENT
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    
    const token = localStorage.getItem('token'); 
    let username = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.username; 
            console.log(username)
        } catch (err) {
            console.error('Failed to decode token:', err);
            setError('Failed to decode token.');
            return;
        }
    } else {
        setError('User not logged in.');
        return;
    }

    if (!newComment.comment) {
        setError('Comment field is required');
        return;
    }

    const commentData = { username, comment: newComment.comment, titleid: titleid };

    try {
        await axios.post(`http://localhost:5000/comment`, commentData);
        setComments([...comments, commentData]);
        setNewComment({ comment: '' });
        setError('');
    } catch (err) {
        console.error('Failed to post comment:', err);
        setError('Failed to post comment.');
    }
  };

  return (
    <div className="mx-auto mb-10">
      <p className="text-xl font-bold mb-4">Comments</p>
      <div className="p-4">
        {comments.map((comment, index) => (
          <Comment key={index} author={comment.username} text={comment.comment} />
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-2 flex flex-col">
        {error && <p className="text-red-500">{error}</p>}
        <textarea
          placeholder="Your comment"
          value={newComment.comment}
          onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
          className="border rounded p-2 mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 w-[100px]">
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
