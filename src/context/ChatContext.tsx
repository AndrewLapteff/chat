import { PropsWithChildren, createContext, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';

export enum REDUCER_WAYS {
  CHANGE_USER,
}

export interface IChatInfo {
  displayName: '';
  photoURL: '';
  uid: '';
}

interface ReducerAction {
  type: REDUCER_WAYS;
  payload: IChatInfo;
}

export interface IInitialState {
  chatInfo: IChatInfo;
  chatId: string;
}

export const ChatContext = createContext({});

export const ChatContextProvider = (props: PropsWithChildren) => {
  let initialState: IInitialState = {
    chatId: '',
    chatInfo: {
      displayName: '',
      photoURL: '',
      uid: '',
    },
  };
  const authedUser = useAuth();

  const chatReducer = (
    state: typeof initialState,
    action: ReducerAction
  ): typeof initialState => {
    switch (action.type) {
      case REDUCER_WAYS.CHANGE_USER: {
        if (authedUser.displayName) {
          let chatId =
            authedUser.displayName < action.payload.displayName //синхронізація айді чату
              ? authedUser.displayName + '_' + action.payload.displayName
              : action.payload.displayName + '_' + authedUser.displayName;
          return {
            chatInfo: action.payload,
            chatId: chatId,
          };
        }
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export type ReducerType = ReturnType<typeof useReducer>;
