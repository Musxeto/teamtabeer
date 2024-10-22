import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage";
import ArticleList from "../Components/ArticleList";
import AdminPortal from "../Components/admin/AdminPortal";
import PrivateRoute from "./PrivateRoute";
import Team from "../Components/Team";
import Login from "../Components/Login";
import NewContent from "../Components/admin/NewContent";
import ManageArticles from "../Components/admin/ManageArticles";
import Settings from "../Components/admin/Settings";
import LoginRoute from "./LoginRoute";
import Footer from "../Components/Footer";
import ManageTeam from "../Components/admin/ManageTeam";
import AddMemberModal from "../Components/admin/AddMemberModal";

const AllRoutes = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:selectedTab/:date" element={<ArticleList />} />
          <Route path="/team" element={<Team />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPortal />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/new-article"
            element={
              <PrivateRoute>
                <NewContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/manage-articles"
            element={
              <PrivateRoute>
                <ManageArticles />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/manage-team"
            element={
              <PrivateRoute>
                <ManageTeam />
                <AddMemberModal />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default AllRoutes;
