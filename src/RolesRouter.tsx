import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthContext } from "./providers/auth.provider";
import { Role } from "./features/users/types/role.enum";

import { General } from "./General";

import { NotFound } from "./features/NotFound";
import { HomePage } from "./pages/InformationPage";

// Profiles
import { AccountPage } from "./pages/settings/AccountPage";

// Images
import { ImageNew } from "./pages/images/ImageNewPage";

/*
 * Questions
 */
import { QuestionListPage } from "./pages/questions/QuestionListPage";
// new
import { AdminQuestionNewPage } from "./pages/questions/new/AdminQuestionNewPage";
import { CustomerQuestionNewPage } from "./pages/questions/new/CustomerQuestionNewPage";
import { QuestionDetailPage } from "./pages/questions/QuestionDetailPage";
import { QuestionEdit } from "./pages/questions/edit/QuestionEditPage";

// Customers
import { CustomersListPage } from "./pages/customers/CustomersListPage";
import { CustomerNewPage } from "./pages/customers/CustomerNewPage";
import { CustomerEditPage } from "./pages/customers/CustomerEditPage";
import { CustomerDetailPage } from "./pages/customers/CustomerDetailPage";

// Rooms
import { RoomList } from "./pages/rooms/RoomListPage";
import { RoomNew } from "./pages/rooms/RoomNewPage";
import { RoomDetail } from "./pages/rooms/RoomDetailPage";

// Users
import { UsersList } from "./pages/users/UsersListPage";
import { UserNew } from "./pages/users/UserNewPage";
import { UserDetailPage } from "./pages/users/UserDetailPage";
import { UserEditPage } from "./pages/users/UserEditPage";

// Teachers
import { TeachersList } from "./pages/teachers/TeachersListPage";
import { TeacherNew } from "./pages/teachers/TeacherNewPage";
import { TeacherDetailProps } from "./pages/teachers/TeacherDetailPage";

// Students
import { StudentsList } from "./pages/students/StudentsListPage";
import { StudentNew } from "./pages/students/StudentNewPage";
import { StudentDetailProps } from "./pages/students/StudentDetailPage";
import { StudentEdit } from "./pages/students/StudentEditPage";
import { LessonsListPage } from "./pages/lessons/LessonsListPage";
import { TeacherSettingsPage } from "./pages/settings/TeacherSettingsPage";

export const RolesRouter: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General />}>
          <Route path="/settings" element={<AccountPage />} />
          <Route path="/settings/account" element={<AccountPage />} />
          {/* 
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/images" element={<ImageListPage />} />
           */}
          <Route path="/images/new" element={<ImageNew />} />

          <Route index path="" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/lessons" element={<LessonsListPage />} />

          {user.role === Role.ADMIN && (
            <>
              <Route path="/questions" element={<QuestionListPage />} />
              <Route path="/questions/new" element={<AdminQuestionNewPage />} />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetailPage />}
              />
              <Route
                path="/questions/:questionId/edit"
                element={<QuestionEdit />}
              />

              <Route path="/rooms" element={<RoomList />} />
              <Route path="/rooms/new" element={<RoomNew />} />
              <Route path="/rooms/:roomId" element={<RoomDetail />} />

              <Route path="/users" element={<UsersList />} />
              <Route path="/users/new" element={<UserNew />} />
              <Route path="/users/:userId/" element={<UserDetailPage />} />
              <Route path="/users/:userId/edit" element={<UserEditPage />} />

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
              <Route
                path="/teachers/:teacherId/"
                element={<TeacherDetailProps />}
              />

              <Route path="/students/" element={<StudentsList />} />
              <Route path="/students/new" element={<StudentNew />} />
              <Route
                path="/students/:studentId"
                element={<StudentDetailProps />}
              />
              <Route
                path="/students/:studentId/edit"
                element={<StudentEdit />}
              />
            </>
          )}
          {user.role === Role.CUSTOMER && (
            <>
              <Route path="/questions" element={<QuestionListPage />} />
              <Route
                path="/questions/new"
                element={<CustomerQuestionNewPage />}
              />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetailPage />}
              />
              <Route
                path="/questions/:questionId/edit"
                element={<QuestionEdit />}
              />
            </>
          )}
          {user.role === Role.TEACHER && (
            <>
              <Route path="/questions" element={<QuestionListPage />} />
              <Route
                path="/questions/:questionId"
                element={<QuestionDetailPage />}
              />

              <Route path="/rooms" element={<RoomList />} />
              <Route path="/rooms/:roomId" element={<RoomDetail />} />

              <Route
                path="settings/teacher"
                element={<TeacherSettingsPage />}
              />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
