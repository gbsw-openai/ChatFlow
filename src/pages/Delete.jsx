import React from 'react';
import styles from '../styles/Delete.module.css';

function Delete({ show, onClose, onDelete }) {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.close} onClick={onClose}>&times;</div>
        <h2>캐릭터 삭제</h2>
        <p>정말로 이 캐릭터를 삭제하시겠습니까?</p>
        <div onClick={onDelete} className={styles.button}>삭제</div>
        <div onClick={onClose} className={styles.button}>취소</div>
      </div>
    </div>
  );
}

export default Delete;
