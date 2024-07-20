import { ProtectedRoute } from "./components/protected-route";

export default async function Home() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1>ECOMMERCE</h1>
      </div>
    </ProtectedRoute>
  );
}
