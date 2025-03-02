import Inicio from "../components/inicioSesion"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-100 to-green-600">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Inicio />
      </div>
    </main>
  );
}
