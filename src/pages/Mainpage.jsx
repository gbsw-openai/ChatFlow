import React, { useState } from "react";
import styles from "../styles/Mainpage.module.css";
import Chat from "./Chat";
import Create from "./Create";
import DeleteModal from "./Delete";

function Mainpage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [characterToDelete, setCharacterToDelete] = useState(null);

  const handleAddCharacter = (name, initialMessages, photoUrl) => {
    const newCharacter = { name, initialMessages, photoUrl };
    setCharacters([...characters, newCharacter]);
    setActiveCharacter(newCharacter);
  };

  const handleDeleteCharacter = () => {
    setCharacters(characters.filter(character => character !== characterToDelete));
    if (activeCharacter === characterToDelete) {
      setActiveCharacter(null);
    }
    setCharacterToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.chat_page_container}>
      <div className={styles.chat_container}>
        <div className={styles.chat_title_text}>
          <div className={styles.all}>챗플로우</div>
          <div className={styles.chat_subtitle_text}>
            <div className={styles.all}>스마트한 대화의 시작</div>
          </div>
        </div>
        <div className={styles.chat_list_container}>
          {characters.map((character, index) => (
            <div
              className={`${styles.chat_list_box} ${character === activeCharacter ? styles.active : ""}`}
              key={index}
              onClick={() => setActiveCharacter(character)}
            >
              <img src={character.photoUrl} alt={character.name} className={styles.chat_bot_images} />
              <div className={styles.chat_list_box_text}>{character.name}</div>
              <div
                className={styles.delete_button}
                onClick={(e) => {
                  e.stopPropagation();
                  setCharacterToDelete(character);
                  setShowDeleteModal(true);
                }}
              >
                삭제
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chat_main_container}>
        <div className={styles.chat_title_container}></div>
        {activeCharacter && <Chat activeCharacter={activeCharacter} />}
      </div>
      <button
        className={styles.add_character_button}
        onClick={() => setShowAddModal(true)}
      >
        +
      </button>
      <Create
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCharacter}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteCharacter}
      />
    </div>
  );
}

export default Mainpage;
