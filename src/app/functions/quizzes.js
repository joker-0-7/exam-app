import axios from "axios";

export const addQuizzes = async (quizzes) => {
  try {
    const rus = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/quiz`,
      quizzes
    );
    return { status: true };
  } catch (error) {
    console.log(error);
  }
};

export const getQuizzes = async () => {
  try {
    const rus = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz`);
    console.log(rus.data);
    return rus.data;
  } catch (error) {
    console.log(error);
  }
};

export const addQuizUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/quiz/user`, {
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addQuizToUser = async (data) => {
  try {
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_API}/quiz/user`, {
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getQuizzesUser = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/quizzes`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addPastPapers = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/quiz/past-papers`,
      { data }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPastPaper = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/quiz/past-papers`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPastPapers = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/quiz/past-paper/${id}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (id, data) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/quiz/${id}`,
      data
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
export const getQuestion = async (id) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteQuestion = async (id) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/quiz/${id}`);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
