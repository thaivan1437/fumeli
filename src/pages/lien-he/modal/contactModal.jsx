import * as React from "react";
import Modal from "@mui/material/Modal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";

const ContactModal = ({ setOpen, open }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
        disablePortal
      >
        <div className="contact__modal">
          <Image
            src="/images/close.svg"
            alt="Close"
            onClick={() => handleClose()}
            width={27}
            height={27}
            reSize={false}
            style={{
              top: "-13px",
              right: "-30px",
            }}
            className="modal__youtube--btn-close btn__close"
          />
          <CheckIcon />
          <p className="fs-40 contact__modal--title">THÀNH CÔNG</p>
          <p className="fs-16 contact__modal--description">
            Chúng tôi sẽ phản hồi tới bạn trong thời gian sớm nhất Xin cảm ơn!
          </p>
          <button className="contact__modal--btn fs-20" onClick={handleClose}>
            <ArrowBackIosNewIcon /> QUAY LẠI
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactModal;
