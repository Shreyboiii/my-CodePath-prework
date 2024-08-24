import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator({ fetchCreators }) {
  const [creator, setCreator] = useState({
    name: '',
    description: '',
    imageURL: '',
    youtubeURL: '',
    twitterURL: '',
    instagramURL: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInput = () => {
    if (!creator.name && !creator.description && !creator.imageURL && !creator.youtubeURL && !creator.twitterURL && !creator.instagramURL) {
      return 'At least one field must have a value.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInput();
    if (validationError) {
      alert(validationError); 
      return;
    }

    const { error } = await supabase.from('creators').insert([creator]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      fetchCreators();
      navigate('/');
    }
  };

  return (
    <div className="add-creator">
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <p>Provide a link to an image of your creator. Be sure to include the http://</p>
          <input
            type="text"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <p>Provide a description of the creator. Who are they? What makes them interesting?</p>
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
          />
        </label>
        <h3>Social Media Links</h3>
        <p>Provide at least one of the creator's social media links.</p>
        <label>
          <i className="fa-brands fa-youtube"></i> YouTube
          <p>The creator's YouTube handle (without the @)</p>
          <input
            type="text"
            name="youtubeURL"
            value={creator.youtubeURL}
            onChange={handleChange}
          />
        </label>
        <label>
          <i className="fa-brands fa-twitter"></i> Twitter
          <p>The creator's Twitter handle (without the @)</p>
          <input
            type="text"
            name="twitterURL"
            value={creator.twitterURL}
            onChange={handleChange}
          />
        </label>
        <label>
          <i className="fa-brands fa-square-instagram"></i> Instagram
          <p>The creator's Instagram handle (without the @)</p>
          <input
            type="text"
            name="instagramURL"
            value={creator.instagramURL}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}
