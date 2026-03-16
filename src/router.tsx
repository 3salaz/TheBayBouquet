import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import HomePage from "./pages/HomePage"
import BouquetsPage from "./pages/BouquetsPage"
import CustomOrderPage from "./pages/CustomOrderPage"
import ContactPage from "./pages/ContactPage"
import BouquetDetailsPage from "./pages/BouquetDetailPage"
import AdminRequestsPage from "./pages/AdminRequestsPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "bouquets", element: <BouquetsPage /> },
            { path: "custom-order", element: <CustomOrderPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "bouquets/:bouquetId", element: <BouquetDetailsPage /> },
            { path: "admin/requests", element: <AdminRequestsPage /> },
        ],
    },
])