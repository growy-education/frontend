import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserContext } from "./contexts/UserContextProvider";
import { Role } from "./types/role.enum";

import { General } from "./General";

import { NotFound } from "./components/NotFound";
import { Information } from "./Information";
import { Profile } from "./components/Profile";

import { ImageList } from "./components/ImageList";
import { ImageNew } from "./components/ImageNew";

import { QuestionList } from "./pages/questions/QuestionList";
import { QuestionNew } from "./pages/questions/QuestionNew";
import { QuestionCheck } from "./pages/questions/QuestionCheck";
import { QuestionDetail } from "./pages/questions/QuestionDetail";
import { QuestionEdit } from "./pages/questions/QuestionEdit";

import { CustomersListPage } from "./pages/customers/CustomersList";
import { CustomerNewPage } from "./pages/customers/CustomerNew";
import { CustomerEditPage } from "./pages/customers/CustomerEdit";
import { CustomerDetailPage } from "./pages/customers/CustomerDetail";

import { RoomList } from "./pages/rooms/RoomList";
import { RoomNew } from "./pages/rooms/RoomNew";
import { RoomDetail } from "./pages/rooms/RoomDetail";

import { Preservation } from "./pages/rooms/StudyroomPreservation";

import { UsersList } from "./pages/users/UsersList";
import { UserNew } from "./pages/users/UserNew";
import { UserDetail } from "./pages/users/UserDetail";
import { UserEdit } from "./pages/users/UserEdit";
import { UserActivate } from "./pages/users/UserActivate";

import { TeachersList } from "./pages/teachers/TeachersList";
import { TeacherNew } from "./pages/teachers/TeacherNew";
import { TeacherDetail } from "./pages/teachers/TeacherDetail";
import { TeacherEdit } from "./pages/teachers/TeacherEdit";

import { StudentsList } from "./pages/students/StudentsList";
import { StudentNew } from "./pages/students/StudentNew";
import { StudentDetail } from "./pages/students/StudentDetail";
import { StudentEdit } from "./pages/students/StudentEdit";

export const RolesRouter: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/images" element={<ImageList />} />
          <Route path="/images/new" element={<ImageNew />} />
          {user.role === Role.ADMIN && (
            <>
              <Route path="/" element={<Information />} />
              <Route path="/questions" element={<QuestionList />} />
              <Route path="/questions/new" element={<QuestionNew />} />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetail />}
              />
              <Route
                path="/questions/:questionId/edit"
                element={<QuestionEdit />}
              />
              <Route
                path="/questions/:questionId/check"
                element={<QuestionCheck />}
              />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/rooms/new" element={<RoomNew />} />
              <Route path="/rooms/:roomId" element={<RoomDetail />} />

              <Route path="/users" element={<UsersList />} />
              <Route path="/users/new" element={<UserNew />} />
              <Route path="/users/:userId/" element={<UserDetail />} />
              <Route
                path="/users/:userId/activate"
                element={<UserActivate />}
              />
              <Route path="/users/:userId/edit" element={<UserEdit />} />

              <Route path="/customers" element={<CustomersListPage />} />
              <Route path="/customers/new" element={<CustomerNewPage />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetailPage />}
              />
              <Route
                path="/customers/:customerId/edit"
                element={<CustomerEditPage />}
              />

              <Route path="/teachers" element={<TeachersList />} />
              <Route path="/teachers/new" element={<TeacherNew />} />
              <Route path="/teachers/:teacherId/" element={<TeacherDetail />} />
              <Route
                path="/teachers/:teacherId/edit"
                element={<TeacherEdit />}
              />

              <Route path="/students/" element={<StudentsList />} />
              <Route path="/students/new" element={<StudentNew />} />
              <Route path="/students/:studentId" element={<StudentDetail />} />
              <Route
                path="/students/:studentId/edit"
                element={<StudentEdit />}
              />
            </>
          )}
          {user.role === Role.CUSTOMER && (
            <>
              <Route path="/" element={<Information />} />
              <Route path="/questions" element={<QuestionList />} />
              <Route path="/questions/new" element={<QuestionNew />} />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetail />}
              />
              <Route
                path="/questions/:questionId/edit"
                element={<QuestionEdit />}
              />
              <Route path="/rooms/" element={<RoomList />} />
              <Route path="/studyroom/new" element={<Preservation />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetailPage />}
              />
              <Route
                path="/customers/:customerId/edit"
                element={<CustomerEditPage />}
              />
            </>
          )}
          {user.role === Role.TEACHER && (
            <>
              <Route path="/" element={<Information />} />
              <Route path="/rooms" element={<RoomList />} />
              <Route path="/rooms/new" element={<Preservation />} />
              <Route path="/teachers/:teacherId/" element={<TeacherDetail />} />
              <Route
                path="/teachers/:teacherId/edit"
                element={<TeacherEdit />}
              />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
