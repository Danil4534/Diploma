import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "./ui/Input";
import { CiSearch } from "react-icons/ci";
export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any>([]);
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
      <div className="relative">
        <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder=" Search..."
          className="caret-[#34d399]"
        />
      </div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full"
      /> */}
      {/* {searchTerm.length > 0 && (
        <ul className="mt-2 border rounded-md p-2 bg-white">
          {filteredResults.length > 0 ? (
            filteredResults.map((item: any, index: any) => (
              <p key={index}>
                {item.name} {item.surname}
              </p>
            ))
          ) : (
            <li className="p-2 text-gray-500">Not fround</li>
          )}
        </ul>
      )} */}
    </div>
  );
}
