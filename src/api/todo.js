import API from './axiosInstance';

export const getToDos = async (categoryPid, categoryName) => {
  const res = await API.get(`/toDoList/${categoryPid}/${categoryName}`);
  return res.data;
};

export const addToDo = async (categoryPid, categoryName, text) => {
  const res = await API.post(`/toDoList/${categoryPid}/${categoryName}`, {
    task: text,
    isChecked: false,
  });
  return res.data;
};

export const toggleToDo = async (pid) => {
  await API.post(`/toDoList/check/${pid}`);
};

export const deleteToDo = async (pid) => {
  await API.post(`/toDoList/delete/${pid}`);
};

export const getTodayToDos = async (date) => {
  const res = await API.get(`/todayList?date=${date}`);
  return res.data;
};