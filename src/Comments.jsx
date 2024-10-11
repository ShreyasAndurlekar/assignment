import React from 'react';

const commentsData = [
  { id: 1, author: 'Alice', text: 'Great post!' },
  { id: 2, author: 'Bob', text: 'Thanks for sharing!' },
  { id: 3, author: 'Charlie', text: 'Very informative.' },
];

const Comment = ({ author, text }) => {
  return (
    <div className="border-b border-gray-200 py-2 mt-5">
      <p className="font-semibold">{author}</p>
      <p>{text}</p>
    </div>
  );
};

const Comments = () => {
  return (
    <div className=" mx-auto mt-10">
      <p className="text-xl font-bold mb-4">Comments</p>
      <div className="bg-white shadow-md rounded-lg p-4">
        {commentsData.map((comment) => (
          <Comment key={comment.id} author={comment.author} text={comment.text} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
