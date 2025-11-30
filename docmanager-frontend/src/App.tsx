import { Route, Switch, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { queryClient } from "./lib/queryClient";
// import { TanStackDevtools } from "@tanstack/react-devtools";
// import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Documents from "./pages/Documents";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/documents" component={Documents} />
      <Route path="/documents/new" component={Documents} />
      <Route path="/documents/:id/edit" component={Documents} />
      <Route component={() => <Redirect to="/login" />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {/* <TanStackDevtools
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: true,
          },
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
            defaultOpen: false,
          },
        ]}
      /> */}
    </QueryClientProvider>
  );
}

export default App;
