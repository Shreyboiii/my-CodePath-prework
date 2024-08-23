import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContentCreatorCard({ creator }) {
  const { id, name, description, imageURL, youtubeURL, twitterURL, instagramURL } = creator;
  
  const navigate = useNavigate();

  const handleView = () => navigate(`/view/${id}`);
  const handleEdit = () => navigate(`/edit/${id}`);

  return (
    <div className="Card" style={{ backgroundImage: `url(${imageURL})` }}>
      <article>
        <div className="header">
          <div className="title">
            <h3 className="name">{name}</h3>
            <div className='container'>
              {youtubeURL && (
                <a href={`https://www.youtube.com/${youtubeURL}`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              )}
              {twitterURL && (
                <a href={`https://www.twitter.com/${twitterURL}`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              )}
              {instagramURL && (
                <a href={`https://www.instagram.com/${instagramURL}`} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-square-instagram"></i>
                </a>
              )}
            </div>
          </div>
          <div className="icons">
            <i className="fa-solid fa-circle-info" onClick={handleView}></i>
            <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
          </div>
        </div>
        <p className="description">{description}</p>
      </article>
    </div>
  );
};
