import { useRef, useState } from 'react';
import style from './Input.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { useChatInfo } from '../../../hooks/useChatInfo';
import { nanoid } from 'nanoid';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

export interface IMessage {
  id?: string;
  time: { seconds: number };
  text: string;
  author: string;
  photo?: string;
}

const Input = () => {
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<File | null>(null);
  const authedUser = useAuth();
  const { state } = useChatInfo();
  const [uploadError, setError] = useState<string>('');

  const sendMessage = async () => {
    if (text != '' && state.chatId != '') {
      const messagesArrayRef = doc(db, `chats`, state.chatId);
      const textCopy = text;
      setText('');

      if (img != null) {
        const imageStorageRef = ref(
          storage,
          `chatPhotos/${state.chatId}/${img.name}` + nanoid(4) // path
        );
        const uploadTask = uploadBytesResumable(imageStorageRef, img);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            setError(error.message);
          },
          async () => {
            // отрммання посилання на картинку
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);
            // створення нового елементу массиву повідомленнь
            await updateDoc(messagesArrayRef, {
              messages: arrayUnion({
                id: nanoid(),
                photo: downloadURL,
                text: textCopy,
                author: authedUser.displayName,
                time: Timestamp.now(),
              }),
            });
            setError('');
            setImg(null);

            // await updateDoc(doc(db, 'userChats', authedUser.uid), {});
          }
        );
      }
      // створення нового елементу массиву повідомленнь
      await updateDoc(messagesArrayRef, {
        messages: arrayUnion({
          id: nanoid(),
          photo: '',
          text: textCopy,
          author: authedUser.displayName,
          time: Timestamp.now(),
        }),
      });
      setError('');
      setImg(null);
    }
  };

  return (
    <div className={style.chatbar_wrapper}>
      {uploadError != '' && uploadError}
      <label className={style.controls}>
        <input
          type="file"
          onChange={(e) => e.target.files && setImg(e.target.files[0])}
        />
        <svg
          cursor="pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill={`${img == null ? 'none' : 'blue'}`}
          width={30}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </label>
      <input
        className={style.input_field}
        type="text"
        name="input"
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <div onClick={() => sendMessage()} className={style.controls}>
        <svg
          cursor="pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={30}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Input;
