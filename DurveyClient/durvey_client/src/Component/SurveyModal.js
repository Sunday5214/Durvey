import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from './Portal';
import {HiX} from 'react-icons/hi';

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }

  const close = (e) => {
    if (onClose) {
      onClose(e)
    }
  }

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [])

  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && <CloseIcon><HiX onClick={close} /></CloseIcon>}
          {children}
        </ModalInner>
      </ModalWrapper>
    </Portal>
  )
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
}

Modal.propTypes = {
  visible: PropTypes.bool,
}

const CloseIcon = styled.div`
  justify-self: flex-end;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  &:hover{
    color: #0088FF;
  }
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 1000px;
  max-width: 1000px;
  height: 1400px;
  max-height: 1400px;
  top: 10%;
  margin: 0 auto;
  padding: 20px 20px;
`

export default Modal