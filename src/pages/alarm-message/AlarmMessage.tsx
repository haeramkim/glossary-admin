import { useEffect, useState } from "react";

import koJSON from "./data/ko.json";
import enJSON from "./data/en.json";
import AlarmMessageTable from "./AlarmMessageTable";
import SearchBar from "@/components/Searchbar";
import { Link } from "react-router";
export default function AlarmMessage() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [alarmMessagesKO, setAlarmMessagesKO] = useState<
    Record<string, string>
  >({});
  const [alarmMessagesEN, setAlarmMessagesEN] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    fetchAlarmMessages();
  }, []);

  function fetchAlarmMessages() {
    const ko = koJSON;
    const en = enJSON;

    setAlarmMessagesKO(ko);
    setAlarmMessagesEN(en);
  }

  const filteredItems = Object.entries(alarmMessagesKO)
    .filter(([key, value]) => {
      const code = key.split("_").at(-1) as string;

      const isResult =
        code.includes(searchKeyword) ||
        value.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        alarmMessagesEN[key]
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());

      return isResult;
    })
    .map(([key, value]) => {
      return {
        code: key,
        korean: value,
        english: alarmMessagesEN[key],
      };
    });

  return (
    <div className="w-screen p-4 container">
      <div className="flex gap-8">
        <h1 className="text-nowrap">Alarm Messages</h1>
        <SearchBar keyword={searchKeyword} setKeyword={setSearchKeyword} />
      </div>
      <div className="h-8" />
      <Link to="/">용어집으로 이동</Link>
      <AlarmMessageTable rows={filteredItems} />
    </div>
  );
}
