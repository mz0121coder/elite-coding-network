import React, { useState, useEffect } from "react";
import { Modal, Header, Button, Grid, Icon } from "semantic-ui-react";
import Cropper from "react-cropper";

function CropImage({ mediaPreview, setMedia, showModal, setShowModal }) {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (cropper) {
      setMedia(cropper.getCroppedCanvas().toDataURL());
      cropper.destroy();
    }

    setShowModal(false);
  };
