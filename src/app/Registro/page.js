import Registro from "../../components/registro"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center mx-auto py-10 px-4 bg-gradient-to-b from-green-500 to-white">
      <div className="max-w-3xl mx-auto">
        <Registro />
      </div>
    </main>
  );
}