import React, { useState } from "react";
import {Modal, Box} from '@mui/material';


export default function VideoModal ({ videoId, onClose }) {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };
  return (
    <>
      {showModal ? (
        <Modal
          keepMounted
          open={showModal}
          onClose={closeModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
              <button className="close-modal" onClick={closeModal}>
                X
              </button>
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Box>
        </Modal>
      ) : null}
    </>
  );
};


