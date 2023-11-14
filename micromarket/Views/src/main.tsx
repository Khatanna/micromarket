import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import UserPage from "./pages/UserPage/UserPage.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import { Toaster } from "sonner";
import CategoryPage from "./pages/CategoryPage/CategoryPage.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="home" Component={NavBar}>
        <Route index Component={App}></Route>
        <Route path="users" Component={UserPage}></Route>
        <Route path="products" Component={ProductPage}></Route>
        <Route path="categories" Component={CategoryPage}></Route>
      </Route>
      <Route path="login" Component={LoginPage}></Route>
    </Route>,
  ),
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster richColors invert closeButton visibleToasts={10} expand />

    <RouterProvider router={router} />
  </QueryClientProvider>,
);
