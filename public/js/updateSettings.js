/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSetting = async (type, data) => {
  try {
    const route = type === 'password' ? 'update-my-password' : 'update-me';

    console.log(route);
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${route}`,
      data
    });

    if (res.data.status == 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
