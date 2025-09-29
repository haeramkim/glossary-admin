import SearchBar from "@/components/Searchbar";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import GlossaryTable from "./GlossaryTable";
import { Link } from "react-router";

export default function Glossary() {
  const [searchKeyword, setSearchKeyword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [glossarys, setGlossarys] = useState<any[]>([]);

  useEffect(() => {
    logIn();
    fetchGlossaryItems();
  }, []);

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_DATABASE_USER_EMAIL,
      password: import.meta.env.VITE_DATABASE_USER_PW,
    });

    if (error) {
      console.error("fail to login to supabase:", error);
    }
  }

  async function fetchGlossaryItems() {
    const { data, error } = await supabase
      .from("glossary")
      .select("*")
      .order("created_at", { ascending: false });
    // const data = await testAPI();

    if (error) {
      console.error("Error fetching glossary items:", error);
    } else {
      setGlossarys(data || []);
    }
  }

  const filteredItems = glossarys.filter((item: { word: string }) =>
    item.word.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="w-screen p-4 container">
      <div className="flex gap-8">
        <h1>Glossary</h1>
        <SearchBar keyword={searchKeyword} setKeyword={setSearchKeyword} />
      </div>
      <div className="h-8" />
      <Link to="/alarm-message">알람 코드로 이동</Link>
      <GlossaryTable rows={filteredItems} onUpdate={fetchGlossaryItems} />
    </div>
  );
}
