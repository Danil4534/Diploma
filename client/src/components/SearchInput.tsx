import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any>([]);

  console.log(results);
  const fetchResults = debounce(async (query: string) => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/user?where=%7B%7D&orderBy=%7B%7D&skip=0&take=10`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  }, 500);

  const filteredResults = results.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.surname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchResults(searchTerm);
  }, [searchTerm]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      {searchTerm.length > 0 && (
        <ul className="mt-2 border rounded-md p-2 bg-white">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <p key={index}>
                {item.name} {item.surname}
              </p>
            ))
          ) : (
            <li className="p-2 text-gray-500">Ничего не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
}
