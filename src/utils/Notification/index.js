import React, { useEffect, useState } from 'react';
import { useCacaoContext } from '../../context';
import { NOTIFY_ERROR, NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../context/types';
import Modal from '../../patterns/molecules/Modal';

const Notification = () => {
  const [controller] = useCacaoContext();
  const { notification } = controller;
  const [showModal, setShowModal] = useState(false);
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [modalType, setModalType] = useState();

  const types = {
    NOTIFY_SUCCESS: 'success',
    NOTIFY_ERROR: 'danger',
    NOTIFY_WARNING: 'warning'
  };

  useEffect(() => {
    if (notification.logout) {
      console.log('logout');
    } else if (notification.loading) {
      setShowLoaderModal(true);
    } else if (types[notification.type]) {
      setModalType(notification.type);
      setModalProps({ ...notification.content, type: notification.type });
      setShowModal(true);
    } else {
      setModalType(null);
      setModalProps({});
      setShowModal(false);
      setShowLoaderModal(false);
    }
  }, [notification]);

  const handelIcon = () => {
    if (modalType === NOTIFY_SUCCESS) return 'CHECK_MARK';
    if (modalType === NOTIFY_ERROR) return 'ERROR';
    if (modalType === NOTIFY_WARNING) return 'WARNING';
  };

  if (showLoaderModal) {
    return (
      <Modal.Loader visible={showLoaderModal} />
    );
  }

  return (
    <Modal.Content visible={showModal} icon={handelIcon()} {...modalProps} />
  );
};

export default Notification;
