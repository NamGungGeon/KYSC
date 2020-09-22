import React from 'react';
import Modal from './Modal';

const ResetModal = ({visible, onYes, onNo}) => {
  return (
    <Modal
      visible={visible}
      title={'Do you wanna reset data?'}
      body={'The data includes last changing date and changing period'}
      onYes={onYes}
      onNo={onNo}
    />
  );
};

export default ResetModal;
