import Navbar from "../components/Navbar";
import NewsList from "./NewsList";
import NewsCreate from "./NewsCreate";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Dashboard Zentara</h1>
        <NewsCreate />
        <hr className="my-6" />
        <NewsList />
      </div>
    </>
  );
}