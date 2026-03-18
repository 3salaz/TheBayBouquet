import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import HomePage from "./pages/HomePage"
import BouquetsPage from "./pages/BouquetsPage"
import CustomOrderPage from "./pages/CustomOrderPage"
import ContactPage from "./pages/ContactPage"
import BouquetDetailsPage from "./pages/BouquetDetailPage"
import AdminRequestsPage from "./pages/AdminRequestsPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import AdminSignInPage from "./pages/AdminSignInPage"
import AppErrorPage from "./pages/AppErrorPage"
import ProtectedAdminRoute from "./features/admin/auth/ProtectedAdminRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <AppErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "bouquets", element: <BouquetsPage /> },
      { path: "custom-order", element: <CustomOrderPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "bouquets/:bouquetId", element: <BouquetDetailsPage /> },
    ],
  },

  {
    path: "/admin/sign-in",
    element: <AdminSignInPage />,
    errorElement: <AppErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute isAuthenticated={true}>
        <AdminDashboardPage />
      </ProtectedAdminRoute>
    ),
    errorElement: <AppErrorPage />,
  },
  {
    path: "/admin/requests",
    element: (
      <ProtectedAdminRoute isAuthenticated={true}>
        <AdminRequestsPage />
      </ProtectedAdminRoute>
    ),
    errorElement: <AppErrorPage />,
  },
])