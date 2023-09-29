import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Question } from "../dto/question.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { QuestionStatus } from "../dto/enum/question-status.enum";
import { GetQuestionsFilterDto } from "../dto/get-questions-filter.dto";
import { UpdateQuestionDto } from "../dto/update-question.dto";
import { AlertSnackbarContext } from "./AlertSnackbarContext";

interface QuestionContextProps {
  questions: Question[];
  getQuestions: (
    filterDto: GetQuestionsFilterDto
  ) => Promise<Question[] | null>;
  createQuestion: (createQuestionDto: Partial<Question>) => Promise<Question>;
  createQuestionForTeacher: (
    createQuestionDto: Partial<Question>
  ) => Promise<Question>;
  getQuestionById: (id: string) => Promise<Question | Error>;
  getQuestionByIdFromBackend: (id: string) => Promise<Question | Error>;
  editQuestionById: (
    id: string,
    data: UpdateQuestionDto
  ) => Promise<Question | null>;
  deleteQuestionById: (id: string) => Promise<void | Error>;
  cancelQuestionById: (id: string) => Promise<Question | null>;
  assignQuestionById: (id: string) => Promise<Question | null>;
  rejectQuestionById: (id: string) => Promise<Question | null>;
  changeQuestionTeacherById: (
    questionId: string,
    teacherId: string
  ) => Promise<Question | null>;
  answerQuestionById: (id: string, answer: string) => Promise<Question | null>;
  verifyQuestionAnswerById: (id: string) => Promise<Question | null>;
  rejectQuestionAnswerById: (
    id: string,
    message?: string
  ) => Promise<Question | null>;
}

export const QuestionContext = createContext<QuestionContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const QuestionContextProvider = ({ children }: Props) => {
  const { axiosConfig } = useContext(AxiosContext);
  const { handleAxiosError } = useContext(AlertSnackbarContext);

  const [pending, setPending] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("questions")
      .then((response) => {
        console.log("取得したQuestions:", response.data);
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const questions = response.data.map((userJson: string) => {
          return plainToInstance(Question, userJson);
        });
        setQuestions(questions);
      })
      .catch((error) => handleAxiosError(error))
      .finally(() => setPending(false));
  }, [axiosConfig, handleAxiosError]);

  const sortQuestions = (a: Question, b: Question) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addQuestion = async (addedQuestion: Question) => {
    setQuestions([...questions, addedQuestion].sort(sortQuestions));
  };

  const updateQuestion = async (updatedQuestion: Question) => {
    const index = questions.findIndex(
      (question) => question.id === updatedQuestion.id
    );
    if (index === -1) {
      addQuestion(updatedQuestion);
    } else {
      questions[index] = updatedQuestion;
      setQuestions([...questions]);
    }
  };

  const deleteQuestionFromContext = async (deletedQuestionId: string) => {
    const filteredQuestions = questions.filter(
      (question) => question.id !== deletedQuestionId
    );
    setQuestions(filteredQuestions);
  };

  const addQuestions = async (addedQuestions: Question[]) => {
    if (addedQuestions.length === 0) {
      return;
    }
    for (const addedQuestion of addedQuestions) {
      const index = questions.findIndex(
        (question) => question.id === addedQuestion.id
      );
      if (index === -1) {
        questions.push(addedQuestion);
      } else {
        questions[index] = addedQuestion;
      }
    }
    setQuestions([...questions.sort(sortQuestions)]);
  };

  const getQuestions = async (
    filterDto: GetQuestionsFilterDto
  ): Promise<Question[]> => {
    return axios
      .create(axiosConfig)
      .get("questions", { params: filterDto })
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const retrievedQuestions = response.data.map((questionJson: string) => {
          return plainToInstance(Question, questionJson);
        });
        addQuestions(retrievedQuestions);
        return retrievedQuestions;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const createQuestion = async (question: Partial<Question>) => {
    return axios
      .create(axiosConfig)
      .post("questions", question)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        addQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const createQuestionForTeacher = async (question: Partial<Question>) => {
    return axios
      .create(axiosConfig)
      .post("/questions/test", question)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        addQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const getQuestionById = async (id: string): Promise<Question | Error> => {
    const found = questions.find((question) => question.id === id);
    if (found) {
      return found;
    }

    return getQuestionByIdFromBackend(id);
  };

  const getQuestionByIdFromBackend = async (
    id: string
  ): Promise<Question | Error> => {
    return axios
      .create(axiosConfig)
      .get(`/questions/${id}`)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        addQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const editQuestionById = async (
    id: string,
    updateQuestionDto: UpdateQuestionDto
  ): Promise<Question> => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}`, updateQuestionDto)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const deleteQuestionById = async (id: string): Promise<void> => {
    return axios
      .create(axiosConfig)
      .delete(`questions/${id}`)
      .then((response) => {
        deleteQuestionFromContext(id);
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const cancelQuestionById = async (id: string): Promise<Question | null> => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}`, {
        status: QuestionStatus.CANCELED,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const assignQuestionById = async (id: string): Promise<Question | null> => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}`, {
        status: QuestionStatus.ASSIGNED,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const rejectQuestionById = async (
    id: string,
    message?: string
  ): Promise<Question | null> => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}`, {
        status: QuestionStatus.PENDING,
        message,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const changeQuestionTeacherById = async (
    questionId: string,
    teacherId: string
  ) => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${questionId}`, {
        status: QuestionStatus.PENDING,
        teacher: { id: teacherId },
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const answerQuestionById = async (id: string, answer: string) => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}`, {
        status: QuestionStatus.CHECKING,
        answer,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        console.log(error);
        handleAxiosError(error);
        return error;
      });
  };

  const verifyQuestionAnswerById = async (id: string) => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}/check`, {
        status: QuestionStatus.AVAILABLE,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const rejectQuestionAnswerById = async (id: string, message: string) => {
    return axios
      .create(axiosConfig)
      .patch(`questions/${id}/check`, {
        status: QuestionStatus.ASSIGNED,
        message,
      })
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        updateQuestion(question);
        return question;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  if (pending) {
    return <PendingContextPage message="質問情報を取得中" />;
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        getQuestions,
        createQuestion,
        createQuestionForTeacher,
        getQuestionById,
        getQuestionByIdFromBackend,
        editQuestionById,
        deleteQuestionById,
        cancelQuestionById,
        assignQuestionById,
        rejectQuestionById,
        changeQuestionTeacherById,
        answerQuestionById,
        verifyQuestionAnswerById,
        rejectQuestionAnswerById,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
