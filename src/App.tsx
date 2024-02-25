import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
} from "./pages/products";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider("https://api.finefoods.refine.dev")}
          routerProvider={routerBindings}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
            },
            {
              name: "products",
              list: "/products",
              create: "/products/create",
              edit: "/products/edit/:id",
              show: "/products/show/:id",
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard">
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/products">
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />} />
                <Route path="edit/:id" element={<ProductEdit />} />
                <Route path="show/:id" element={<ProductShow />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
