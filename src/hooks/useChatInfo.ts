import { useContext } from 'react';
import { ChatContext, IInitialState } from '../context/ChatContext';

export const useChatInfo = () => {
  const { state, dispatch }: { state: IInitialState; dispatch: any } =
    useContext<any>(ChatContext);
  return { state, dispatch };
};
