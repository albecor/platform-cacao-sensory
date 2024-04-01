import React, { createContext, useContext, useReducer } from 'react';
import { node } from 'prop-types';
import { LOGOUT, VIEWER } from '../utils/Authorization/roles';
import {
  NOTIFY_SUCCESS,
  NOTIFY_ERROR,
  NOTIFY_EXPIRED,
  NOTIFY_CLEAN,
  NOTIFY_WARNING,
  NOTIFY_LOADER,
  STATES,
  USER,
  USER_LOGIN_IN,
  USER_LOGIN_OUT
} from './types';

const CacaoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case USER: {
      return { ...state, user: action.value };
    }
    case USER_LOGIN_IN: {
      return { ...state, role: VIEWER };
    }
    case USER_LOGIN_OUT: {
      return { ...state, role: LOGOUT };
    }
    case STATES: {
      return { ...state, states: action.value };
    }
    case NOTIFY_SUCCESS:
    case NOTIFY_WARNING:
    case NOTIFY_ERROR: {
      return {
        ...state,
        notification: {
          ...state.notification,
          type: action.type,
          content: action.value
        }
      };
    }
    case NOTIFY_LOADER: {
      return {
        ...state,
        notification: {
          ...state.notification,
          loading: true
        }
      };
    }
    case NOTIFY_EXPIRED: {
      return {
        ...state,
        notification: {
          ...state.notification,
          logout: true
        }
      };
    }
    case NOTIFY_CLEAN: {
      return {
        ...state,
        notification: {
          ...initialState.notification
        }
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  user: {
    name: '',
    document: null,
    number: null,
    email: ''
  },
  role: '',
  notification: { logout: false, type: '', content: {} },
  states: []
};

const AppContextProvider = function ({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);
  return (
    <CacaoContext.Provider value={[controller, dispatch]}>
      {children}
    </CacaoContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: node.isRequired
};

const useCacaoContext = () => useContext(CacaoContext);

export { AppContextProvider, useCacaoContext, initialState };
