import React from 'react';
import Modal from './Modal';

const ChangeConfirmModal = ({visible, onYes, onNo}) => {
  return (
    <Modal
      visible={visible}
      title={'Recheck'}
      body={'Do you really change your shaver today?'}
      onYes={onYes}
      onNo={onNo}
    />
  );
};

export default ChangeConfirmModal;
