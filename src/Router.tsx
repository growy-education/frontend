import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "./UserContextProvider";
import { Role } from "./types/role.enum";
import { NotFound } from "./components/NotFound";
import { Information } from "./Information";
import { QuestionList } from "./components/QuestionList";
import { QuestionNew } from "./components/QuestionNew";
import QuestionDetail from "./components/QuestionDetail";
import { QuestionEdit } from "./components/QuestionEdit";
import { CustomerEdit } from "./components/CustomerEdit";
import { Studyroom } from "./components/Studyroom";
import { Preservation } from "./components/StudyroomPreservation";
import { UsersList } from "./components/UsersList";
import { UserNew } from "./components/UserNew";
import { UserDetail } from "./components/UserDetail";
import { UserEdit } from "./components/UserEdit";
import { CustomersList } from "./components/CustomersList";
import { CustomerNew } from "./components/CustomerNew";
import { CustomerDetail } from "./components/CustomerDetail";
import { TeachersList } from "./components/TeachersList";
import { TeacherNew } from "./components/TeacherNew";
import { TeacherDetail } from "./components/TeacherDetail";
import { TeacherEdit } from "./components/TeacherEdit";
import { StudentsList } from "./components/StudentsList";
import { StudentNew } from "./components/StudentNew";
import { StudentDetail } from "./components/StudentDetail";
import { StudentEdit } from "./components/StudentEdit";

export const RolesRouter: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {user.role === Role.ADMIN && (
        <>
          <Route path="/" element={<Information />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionNew />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route
            path="/questions/:questionId/edit"
            element={<QuestionEdit />}
          />
          <Route path="/rooms" element={<Studyroom />} />
          <Route path="/rooms/new" element={<Preservation />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/users/new" element={<UserNew />} />
          <Route path="/users/:userId/" element={<UserDetail />} />
          <Route path="/users/:userId/edit" element={<UserEdit />} />

          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/new" element={<CustomerNew />} />
          <Route path="/customers/:customerId" element={<CustomerDetail />} />
          <Route
            path="/customers/:customerId/edit"
            element={<CustomerEdit />}
          />

          <Route path="/teachers" element={<TeachersList />} />
          <Route path="/teachers/new" element={<TeacherNew />} />
          <Route path="/teachers/:teacherId/" element={<TeacherDetail />} />
          <Route path="/teachers/:teacherId/edit" element={<TeacherEdit />} />

          <Route path="/students/" element={<StudentsList />} />
          <Route path="/students/new" element={<StudentNew />} />
          <Route path="/students/:studentId" element={<StudentDetail />} />
          <Route path="/students/:studentId/edit" element={<StudentEdit />} />
        </>
      )}
      {user.role === Role.CUSTOMER && (
        <>
          <Route path="/" element={<Information />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionNew />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route
            path="/questions/:questionId/edit"
            element={<QuestionEdit />}
          />
          <Route path="/rooms/" element={<Studyroom />} />
          <Route path="/studyroom/new" element={<Preservation />} />
          <Route path="/customers/:customerId" element={<CustomerDetail />} />
          <Route
            path="/customers/:customerId/edit"
            element={<CustomerEdit />}
          />
        </>
      )}
      {user.role === Role.TEACHER && (
        <>
          <Route path="/" element={<Information />} />
          <Route path="/rooms" element={<Studyroom />} />
          <Route path="/rooms/new" element={<Preservation />} />
          <Route path="/teachers/:teacherId/" element={<TeacherDetail />} />
          <Route path="/teachers/:teacherId/edit" element={<TeacherEdit />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};