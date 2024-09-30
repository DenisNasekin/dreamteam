'use client'

import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss'
import Logout from '../Logout/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { IRecord, IRecordsState, addRecord, updateRecord } from '../../store/slices/records';

export default function Profile () {
  const userData = sessionStorage.getItem('user');
  const records = useSelector((state: {records: IRecordsState}) => state.records.records);
  const dispatch = useDispatch();
  const [newRecord, setNewRecord] = useState<IRecord>({ id: '', title: '', description: '' });
  const [createRecord, setCreateRecord] = useState(false);
  const [newRecordId, setNewRecordId] = useState('');
  const [editingRecord, setEditingRecord] = useState<IRecord | null>(null);


  const createNewRecord = () => {
    setNewRecordId(Date.now().toString());
    setCreateRecord(true);
  };

  if (userData === null) {
    return <div className={styles.error}>Пользователь не авторизован</div>;
  }
  const user = JSON.parse(userData);

  useEffect(() => {
    if (createRecord) {
      dispatch(addRecord({ id: newRecordId, title: newRecord.title, description: newRecord.description }));
      setCreateRecord(false);
    }
    } , [dispatch, newRecordId, createRecord]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRecord({ ...newRecord, [name]: value });
  }

  const handleEditRecord = (record: IRecord) => {
    setEditingRecord(record);
  };
  const handleUpdateRecord = (record: IRecord) => {
    dispatch(updateRecord(record));
    setEditingRecord(null);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Профиль:</h2>
        <p className={styles.text}>Твое имя: {user.name}</p>
        <p className={styles.text}>Твоя почта: {user.email}</p>

        <Logout />
      </div>
      <div className={styles.container}>
        <h2>Пиши роли здесь:</h2>
        <form className={styles.form}>
          <input
            maxLength={15}
            type="text" 
            name="title"
            placeholder='Напиши позицию' 
            value={newRecord.title}
            onChange={handleInputChange}
          />
          <input 
            maxLength={30}
            type="text"
            name="description"
            placeholder='Напиши имя'
            value={newRecord.description}
            onChange={handleInputChange}
          />
          <button className={styles.button}
            disabled={!newRecord.title || !newRecord.description}
            type="button" 
            onClick={createNewRecord}>
            Добавить запись
          </button>
        </form>
        <ul className={styles.records}>
          {records.map((record, index) => (
            <li className={styles.record} key={index}>
              {editingRecord && editingRecord.id === record.id ? (
                <form >
                  <input className={styles.input}
                    type="text"
                    name="title"
                    value={editingRecord.title}
                    onChange={(e) => setEditingRecord({ ...editingRecord, title: e.target.value })}
                  />
                  <input className={styles.input}
                    type="text"
                    name="description"
                    value={editingRecord.description}
                    onChange={(e) => setEditingRecord({ ...editingRecord, description: e.target.value })}
                  />
                </form>
              ) : (
                <>
                  <p>{record.title}</p>
                  <p>{record.description}</p>
                </>
              )}
              <button className={styles.button} type="button" onClick={() => {
                if (editingRecord && editingRecord.id === record.id) {
                  handleUpdateRecord(editingRecord);
                } else {
                  handleEditRecord(record);
                }
              }}>
                {editingRecord && editingRecord.id === record.id ? 'Сохранить' : 'Редактировать'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
