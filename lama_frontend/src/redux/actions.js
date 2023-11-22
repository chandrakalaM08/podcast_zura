import axios from "axios";
import {
  CREATE_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FILE_OPERATION_FAILURE,
  GET_FILE_SUCCESS,
  PROJECT_CREATE_FAILED,
  PROJECT_CREATE_SUCCESS,
  UPDATE_FILE_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";
const apiUrl = process.env.REACT_APP_API_URL;

// Actions to create a new user and login
export const loginOrCreateUser = (email) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/user`, { email });
    const { token, existingUser } = response.data;
    localStorage.setItem("email", email);
    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));

    console.log("inside login", email, token, response.data);
    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage on successful login
    }

    dispatch({ type: USER_LOGIN_SUCCESS, payload: { token, existingUser } });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILED, payload: error.message });
  }
};

// Set the token as a header in the request
const accessToken = localStorage.getItem("token");
console.log("accessToken", accessToken);
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};
// Action to fetch all projects related to an email id
export const fetchProjects = () => async (dispatch) => {
  try {
    console.log("fetchProjects function called", config);

    dispatch({ type: FETCH_PROJECTS_REQUEST });
    const response = await axios.get(`${apiUrl}/project`, config);
    console.log("response", response.data);
    dispatch({
      type: FETCH_PROJECTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      payload: error,
    });
  }
};

// Action to create a project
export const createProjectForTheLoggedInUser =
  (email, projectName, token) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}/project/create`,
        {
          email,
          projectName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { newProject } = response.data;

      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: newProject,
      });
    } catch (error) {
      dispatch({ type: PROJECT_CREATE_FAILED, payload: error.message });
    }
  };

// All Actions related to file
export const fetchProjectFiles = async (projectId) => {
  try {
    const response = await axios.get(`${apiUrl}/project/${projectId}`, config);
    return response.data; // Returns the files related to the project
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createFile = (projectId, fileName, fileData) => {
  // creating a file
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}/file/${projectId}`,
        {
          fileName,
          fileData,
        },
        config
      );
      dispatch({ type: CREATE_FILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
    }
  };
};

// getting a file by its id

export const getFileById = (fileId) => async (dispatch) => {
  try {
    const response = await axios.get(`${apiUrl}/file/${fileId}`, config);
    dispatch({ type: GET_FILE_SUCCESS, payload: response.data });
    return response;
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};

// update fileData
export const updateFile = (fileId, fileData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/file/${fileId}`,
      { fileData },
      config
    );
    dispatch({ type: UPDATE_FILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};

// delete a file by id

export const deleteFile = (fileId) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/file/${fileId}`, config);
    dispatch({ type: DELETE_FILE_SUCCESS });
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};
