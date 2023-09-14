import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
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
  getQuestionById: (id: string) => Promise<Question | null>;
  editQuestionById: (
    id: string,
    data: UpdateQuestionDto
  ) => Promise<Question | null>;
  cancelQuestionById: (id: string) => Promise<Question | null>;
  assignQuestionById: (id: string) => Promise<Question | null>;
  rejectQuestionById: (id: string) => Promise<Question | null>;
  changeQuestionTeacherById: (
    questionId: string,
    teacherId: string
  ) => Promise<Question | null>;
  answerQuestionById: (id: string, answer: string) => Promise<Question | null>;
  verifyQuestionAnswerById: (id: string) => Promise<Question | null>;
  rejectQuestionAnswerById: (id: string) => Promise<Question | null>;
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
  }, [axiosConfig]);

  const sortQuestions = (a: Question, b: Question) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addQuestion = useCallback(
    async (addedQuestion: Question) => {
      setQuestions([...questions, addedQuestion].sort(sortQuestions));
    },
    [questions]
  );

  const updateQuestion = useCallback(
    async (updatedQuestion: Question) => {
      const index = questions.findIndex(
        (question) => question.id === updatedQuestion.id
      );
      if (index === -1) {
        addQuestion(updatedQuestion);
      } else {
        questions[index] = updatedQuestion;
        setQuestions([...questions]);
      }
    },
    [addQuestion, questions]
  );

  const addQuestions = useCallback(
    async (addedQuestions: Question[]) => {
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
    },
    [questions]
  );

  const getQuestions = useCallback(
    async (filterDto: GetQuestionsFilterDto): Promise<Question[]> => {
      return axios
        .create(axiosConfig)
        .get("questions", { params: filterDto })
        .then((response) => {
          if (!Array.isArray(response.data)) {
            throw new Error("ネットワークエラー");
          }
          const retrievedQuestions = response.data.map(
            (questionJson: string) => {
              return plainToInstance(Question, questionJson);
            }
          );
          addQuestions(retrievedQuestions);
          return retrievedQuestions;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        })
        .finally(() => setPending(false));
    },
    [axiosConfig, handleAxiosError]
  );

  const createQuestion = useCallback(
    async (question: Partial<Question>) => {
      return axios
        .create(axiosConfig)
        .post("questions", question)
        .then((response) => {
          const question = plainToInstance(Question, response.data);
          //成功したら詳細ページへ飛ぶ
          addQuestion(question);
        })
        .catch((error) => {
          return null;
        });
    },
    [addQuestion, axiosConfig]
  );

  const getQuestionById = useCallback(
    async (id: string): Promise<Question | null> => {
      const found = questions.find((question) => question.id === id);
      if (found) {
        return found;
      }

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
    },
    [addQuestion, axiosConfig, questions]
  );

  const editQuestionById = useCallback(
    async (
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const cancelQuestionById = useCallback(
    async (id: string): Promise<Question | null> => {
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const assignQuestionById = useCallback(
    async (id: string): Promise<Question | null> => {
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const rejectQuestionById = useCallback(
    async (id: string): Promise<Question | null> => {
      return axios
        .create(axiosConfig)
        .patch(`questions/${id}`, {
          status: QuestionStatus.PENDING,
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const changeQuestionTeacherById = useCallback(
    async (questionId: string, teacherId: string) => {
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const answerQuestionById = useCallback(
    async (id: string, answer: string) => {
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
          handleAxiosError(error);
          return error;
        });
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const verifyQuestionAnswerById = useCallback(
    async (id: string) => {
      return axios
        .create(axiosConfig)
        .patch(`questions/${id}`, {
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  const rejectQuestionAnswerById = useCallback(
    async (id: string) => {
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
    },
    [axiosConfig, handleAxiosError, updateQuestion]
  );

  if (pending) {
    return <PendingContextPage message="質問情報を取得中" />;
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        getQuestions,
        getQuestionById,
        editQuestionById,
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
