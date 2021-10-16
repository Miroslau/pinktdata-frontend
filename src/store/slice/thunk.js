/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { mapPageActions } from './mapPageSlice';

export const getData = () => async (dispatch) => {
  axios
    .get('/api/apartments/getAll')
    .then((res) => {
      const loadedTasks = [];
      for (const taskKey in res.data) {
        if ({}.hasOwnProperty.call(res.data, taskKey)) {
          loadedTasks.push({
            id: taskKey,
            avgRating: res.data[taskKey].avgRating,
          });
        }
      }
      dispatch(mapPageActions.getAllData(loadedTasks));
    })
    .catch((err) => {
      dispatch(
        mapPageActions.setError(err.message || 'Something went wrong!'),
      );
    });

//   const response = await axios.get('/api/apartments/getAll');
//   dispatch(mapPageActions.getAllData(response));
};
