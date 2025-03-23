import axios from "axios";

axios.defaults.baseURL = 'https://api.dating.com';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const putDating = async (params: { email: string, password: string; }) => {
  try {
    const { data } = await axios.put(`/identity`, params);

    return data;
  } catch (error) {
    console.log('Huston, we have a problem', error);
    throw error;
  }
};

export const getAuthorization = async (email: string, password: string) => {
  const authHeader = 'Basic ' + btoa(`${email}:${password}`);

  try {
    const response = await axios.get('/identity', {
      headers: {
        Authorization: authHeader,
      },
    });
    return response;
  } catch (error) {
    console.log('Authorization error:', error);
    throw error;
  }
};