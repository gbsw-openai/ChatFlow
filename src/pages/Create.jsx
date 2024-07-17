import React, { useState } from 'react';
import styles from '../styles/Create.module.css';

function Create({ show, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('');

  const ages = ["10대", "20대", "30대", "40대", "50대 이상"];
  const genders = ["남성", "여성"];
  const interests = ["여행", "음악", "영화", "독서", "스포츠", "연애", "프로그래밍"];
  const personalities = ["친절한", "유머러스한", "내성적인", "외향적인", "논리적인", "싸가지없는"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || !photoFile) return;

    const promptParts = [
      selectedAge ? `나이: ${selectedAge}` : '',
      selectedGender ? `성별: ${selectedGender}` : '',
      selectedInterest ? `관심사: ${selectedInterest}` : '',
      selectedPersonality ? `성격: ${selectedPersonality}` : '',
    ].filter(Boolean);

    const prompt = promptParts.join(', ');
    if (!prompt.trim()) return;

    const initialMessages = [
      { id: 'system', role: 'system', content: prompt },
      { id: 'assistant-1', role: 'assistant', content: '한국어만 사용해' },
      { id: 'assistant-2', role: 'assistant', content: '절대로 부정적인 말을 하지마' },
      { id: 'assistant-3', role: 'assistant', content: '사실에 기반해서 답해' },
      { id: 'assistant-4', role: 'assistant', content: '문장 짧고 간결하게 말해' },
    ];

    const reader = new FileReader();
    reader.onload = (event) => {
      const photoUrl = event.target.result;
      onAdd(name, initialMessages, photoUrl);
      setName('');
      setPhotoFile(null);
      setSelectedAge('');
      setSelectedGender('');
      setSelectedInterest('');
      setSelectedPersonality('');
      onClose();
    };
    reader.readAsDataURL(photoFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2>새 캐릭터 추가</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="캐릭터 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />
          <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)} className={styles.input}>
            <option value="">나이 선택</option>
            {ages.map((age, index) => (
              <option key={index} value={age}>{age}</option>
            ))}
          </select>
          <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className={styles.input}>
            <option value="">성별 선택</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
          <select value={selectedInterest} onChange={(e) => setSelectedInterest(e.target.value)} className={styles.input}>
            <option value="">관심사 선택</option>
            {interests.map((interest, index) => (
              <option key={index} value={interest}>{interest}</option>
            ))}
          </select>
          <select value={selectedPersonality} onChange={(e) => setSelectedPersonality(e.target.value)} className={styles.input}>
            <option value="">성격 선택</option>
            {personalities.map((personality, index) => (
              <option key={index} value={personality}>{personality}</option>
            ))}
          </select>
          <button type="submit" className={styles.button}>추가</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
