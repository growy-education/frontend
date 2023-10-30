import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Task } from "../dto/task.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { UserContext } from "./UserContextProvider";
import { Role } from "../dto/enum/role.enum";
import { AlertSnackbarContext } from "./AlertSnackbarContext";
import { TaskStatus } from "../dto/enum/task-status.enum";
import { Question } from "../dto/question.class";

interface TaskContextProps {
  tasks: Task[];
  getTasks: () => void;
  getTaskById: (id: string) => Promise<Task | null>;
  updateTaskById: (id: string, task: Partial<Task>) => Promise<Task | null>;
  answerTaskById: (id: string, answer: string) => Promise<Task | Error>;
}

export const TaskContext = createContext<TaskContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const TaskContextProvider = ({ children }: Props) => {
  const { handleAxiosError } = useContext(AlertSnackbarContext);
  const { axiosConfig } = useContext(AxiosContext);
  const { user } = useContext(UserContext);

  const [pending, setPending] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (user.role === Role.ADMIN || user.role === Role.TEACHER) {
      axios
        .create(axiosConfig)
        .get("tasks")
        .then((response) => {
          if (!Array.isArray(response.data)) {
            throw new Error("ネットワークエラー");
          }
          const tasks = response.data.map((taskJson: string) => {
            return plainToInstance(Task, taskJson);
          });
          setTasks(tasks);
        })
        .catch((error) =>
          console.log(`error occurred at: ${TaskContextProvider.name}`, error)
        )
        .finally(() => setPending(false));
    } else {
      setPending(false);
    }
  }, [axiosConfig, user.role]);

  const sortTasks = (a: Task, b: Task) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addTask = async (addedTask: Task) => {
    setTasks([...tasks, addedTask].sort(sortTasks));
  };

  const addTasks = async (addedTasks: Task[]) => {
    if (addedTasks.length === 0) {
      return;
    }
    for (const addedTask of addedTasks) {
      const index = tasks.findIndex((task) => task.id === addedTask.id);
      if (index === -1) {
        tasks.push(addedTask);
      } else {
        tasks[index] = addedTask;
      }
    }
    setTasks([...tasks]);
  };

  const updateTask = async (updatedTask: Task) => {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index === -1) {
      addTask(updatedTask);
    } else {
      const newTasks = tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      });
      setTasks(newTasks);
    }
  };

  const getTasks = () => {
    axios
      .create(axiosConfig)
      .get("tasks")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const retrievedTasks = response.data.map((taskJson: string) => {
          return plainToInstance(Task, taskJson);
        });
        addTasks(retrievedTasks);
      })
      .catch((error) => {
        console.log(`error occurred at: ${TaskContextProvider.name}`, error);
        handleAxiosError(error);
        return error;
      })
      .finally(() => setPending(false));
  };

  const getTaskById = async (id: string): Promise<Task | null> => {
    const found = tasks.find((task) => task.id === id);
    if (found) {
      return found;
    }

    return axios
      .create(axiosConfig)
      .get(`/tasks/${id}`)
      .then((response) => {
        const task = plainToInstance(Task, response.data);
        addTask(task);
        return task;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const updateTaskById = async (id: string, task: Partial<Task>) => {
    return axios
      .create(axiosConfig)
      .patch(`tasks/${id}`, task)
      .then((response) => {
        const savedTask = plainToInstance(Task, response.data);
        updateTask(savedTask);
        return savedTask;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const confirmTaskById = async (
    id: string,
    status: TaskStatus.REJECTED | TaskStatus.ASSIGNED
  ) => {
    return axios
      .create(axiosConfig)
      .patch(`tasks/${id}`, { status })
      .then((response) => {
        const savedTask = plainToInstance(Task, response.data);
        updateTask(savedTask);
        return savedTask;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const confirmTasksByQuestion = async (
    question: Question,
    status: TaskStatus.REJECTED | TaskStatus.ASSIGNED
  ): Promise<Task[] | Error> => {
    const tasks = question?.tasks;
    if (!Array.isArray(tasks)) {
      return new Error();
    }
    const savedTasks = await Promise.all(
      tasks.map((task) =>
        axios
          .create(axiosConfig)
          .patch(`tasks/${task.id}`, { status })
          .then((response) => {
            const savedTask = plainToInstance(Task, response.data);
            return savedTask;
          })
      )
    );
  };

  const answerTaskById = async (id: string, answer: string) => {
    return axios
      .create(axiosConfig)
      .post(`tasks/${id}/answer`, {
        answer,
      })
      .then((response) => {
        const task = plainToInstance(Task, response.data);
        updateTask(task);
        return tasks;
      })
      .catch((error) => {
        console.log(error);
        handleAxiosError(error);
        return error;
      });
  };

  if (pending) {
    return <PendingContextPage message="タスク情報を取得中" />;
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        getTaskById,
        updateTaskById,
        answerTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
