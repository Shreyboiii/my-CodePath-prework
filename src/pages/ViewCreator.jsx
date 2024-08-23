import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import { supabase } from '../client';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility


export default function ViewCreator({ fetchCreators }) {
  const { id } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate for navigation
  const [creator, setCreator] = useState({
    name: '',
    description: '',
    imageURL: '',
    youtubeURL: '',
    twitterURL: '',
    instagramURL: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);  
      }
    };

    fetchCreator();
  }, [id]);

  // Delete function to remove the creator from the database
  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting creator:", error);
    } else {
      fetchCreators();
      navigate('/');  // Navigate to the home page or another page after deletion
    }
  };

  return (
    <div className="view-creator">

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Delete"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>⚠️ WAIT!!!! ⚠️</h2>
        <p>Are you sure you want to delete {creator.name ||''}?</p>
        <button onClick={() => setModalIsOpen(false)}>Nah, never mind</button>
        <button onClick={() => {
          handleDelete();
          setModalIsOpen(false);
        }}>YES! Totally sure</button>
      </Modal>

        <section className="creator-image">
          {creator.imageURL && (<img src={creator.imageURL} alt={creator.name} />)}
        </section>
        <section className= "creator-info">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <div className='creator-links'>
        {creator.youtubeURL && (
                <a className='socials-button'role='button' href={`https://www.youtube.com/${creator.youtubeURL}`} target="_blank">
                  <i className="fa-brands fa-youtube">
                  {` @${creator.youtubeURL}`}
                  </i>
                </a>
              )}
              {creator.twitterURL && (
                <a className='socials-button'role='button' href={`https://www.twitter.com/${creator.twitterURL}`} target="_blank">
                  <i className="fa-brands fa-twitter">
                  {` @${creator.twitterURL}`}
                  </i>
                </a>
              )}
              {creator.instagramURL && (
                <a className='socials-button'role='button' href={`https://www.instagram.com/${creator.instagramURL}`} target="_blank">
                  <i className="fa-brands fa-square-instagram">
                    {` @${creator.instagramURL}`}
                  </i>
                </a>
              )}
              </div>
        </section>
      <section className="modify-creator">
        <button type="button" onClick={() => navigate(`/edit/${id}`)}>Edit Creator</button>
        <button type="button" onClick={() => setModalIsOpen(true)} className="delete-button">Delete Creator</button>
      </section>
    </div>
  );
}
