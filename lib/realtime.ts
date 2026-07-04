"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export function useRealtimeLeadUpdates() {
  const [leads, setLeads] = useState<Database["public"]["Tables"]["leads"]["Row"][]>([]);

  useEffect(() => {
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => [payload.new as Database["public"]["Tables"]["leads"]["Row"], ...prev]);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) =>
            prev.map((l) =>
              l.id === (payload.new as Database["public"]["Tables"]["leads"]["Row"]).id
                ? (payload.new as Database["public"]["Tables"]["leads"]["Row"])
                : l,
            ),
          );
        },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return leads;
}
