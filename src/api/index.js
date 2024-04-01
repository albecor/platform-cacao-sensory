import { Platform } from 'react-native';
import Constants from 'expo-constants';
import {
  AuthService,
  EventsService,
  ProcessService,
  SamplesService,
  UserService
} from './services';
import { removeEmptyAndUndefined } from '../utils';

const APP_VERSION = '1.0.0';

const basicAuthHeader = {
  ApiKey: 'abbd3684-b51e-4397-b272-6d17294c332e',
  'x-version': `${Platform.OS} ${Constants.manifest?.version || APP_VERSION}`
};

const tokenAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'x-version': `${Platform.OS} ${Constants.manifest?.version || APP_VERSION}`
});

function addInterceptors (HTTPClient) {
  HTTPClient.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error)
  );
}

export const getAuthToken = async (body) =>
  AuthService()
    .request({
      method: 'post',
      url: 'sigin',
      data: body,
      headers: basicAuthHeader
    })
    .then(({ data }) => data.token);

export const validToken = (token) =>
  AuthService()
    .request({
      method: 'get',
      url: 'validToken',
      headers: tokenAuthHeader(token)
    })
    .then(({ data }) => data.token);

export const recoverPassword = async (body) =>
  AuthService()
    .request({
      method: 'post',
      url: 'recover-password',
      data: { ...body, isApp: true },
      headers: basicAuthHeader
    })
    .then(({ data }) => data);

export const getProfile = token => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: 'me',
    headers: tokenAuthHeader(token)
  })
    .then(({ data }) => data);
};

export const updateInfo = (body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'put',
    url: '/me',
    data: body,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const updatePassword = (body, token) => {
  const HTTPClient = UserService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'put',
    url: '/update-password',
    data: { ...body, isApp: true },
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const fetchSamplesStates = (token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: '/states',
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const fetchHistory = token => {
  const HTTPClient = ProcessService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: '/byOwner',
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const fetchEvents = token => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: '?hasFilter=true',
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const fetchEvent = (id, token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: `/${id}`,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const updateEvent = (id, body, token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'put',
    url: `/${id}`,
    data: body,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const addResult = (id, token, body) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'post',
    url: `/${id}`,
    data: removeEmptyAndUndefined(body),
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const processActived = token => {
  const HTTPClient = ProcessService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'get',
    url: '/actived',
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const updateProcess = (id, body, token) => {
  const HTTPClient = ProcessService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'put',
    url: `/${id}`,
    data: body,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const updateSample = (body, token) => {
  const HTTPClient = SamplesService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'post',
    url: 'modify-by-event',
    data: body,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};

export const addSample = (body, token) => {
  const HTTPClient = EventsService();
  addInterceptors(HTTPClient);
  return HTTPClient.request({
    method: 'post',
    url: '/add-sample',
    data: body,
    headers: tokenAuthHeader(token)
  }).then(({ data }) => data);
};
