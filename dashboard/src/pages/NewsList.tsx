import { useEffect, useState } from "react";
import { getNews } from "../api/news.api";

export default function NewsList() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    getNews().then(setNews);
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Daftar Berita</h2>
      <ul className="space-y-2">
        {news.map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <h3 className="font-semibold">{item.judul}</h3>
            <p className="text-sm text-gray-600">{item.kategori}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
