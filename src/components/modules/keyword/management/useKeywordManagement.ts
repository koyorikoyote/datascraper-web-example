import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/api";
import { useAlert } from "@/context/alert/useAlert";
import { useTranslation } from "@/context/i18n/useTranslation";
import type {
  KeywordRow,
  KeywordCreate,
  KeywordBulk,
  Keyword,
} from "@/interfaces";
import type { RowSelectionState, SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { getIdsFromSelection } from "@/utils/helper";
import { StatusConst } from "@/constants/status";


export function useKeywordManagement() {
  const [rows, setRows] = useState<KeywordRow[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: "execution_date", desc: true },
  ]);
  const [search, setSearch] = useState("");

  const { confirm } = useAlert();
  const { t } = useTranslation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.keyword.list();
      setRows(res.data);
    } catch {
      // errors handled globally
    }
  };



  const filteredRows = rows.filter((r) =>
    r.keyword.toLowerCase().includes(search.toLowerCase())
  );

  const handleRunFetch = async (row_id: number | null = null) => {
    const ids = getIdsFromSelection(rowSelection, row_id);

    if (ids.length === 0) {
      toast.error(t("keyword.noKeywordsSelected"));
      return;
    }

    try {
      const res = await api.keyword.runFetch({ ids });
      const results = (res.data.results || []) as { id: number; status: StatusConst }[];
      
      toast.info(t("status.processing"));

      const statusMap = new Map<number, StatusConst>();
      results.forEach((r) => statusMap.set(r.id, r.status));

      setRows((prev) =>
        prev.map((row) => {
          const newStatus = statusMap.get(row.id);
          return newStatus ? { ...row, fetch_status: newStatus } : row;
        })
      );
    } catch {
      // Error handled globally
    }
  };

  const handleRunRank = async (row_id: number | null = null) => {
    const ids = getIdsFromSelection(rowSelection, row_id);

    if (ids.length === 0) {
      toast.error(t("keyword.noKeywordsSelected"));
      return;
    }

    try {
      const res = await api.keyword.runRank({ ids });
      const results = (res.data.results || []) as { id: number; status: StatusConst }[];
      
      toast.info(t("status.processing"));

      const statusMap = new Map<number, StatusConst>();
      results.forEach((r) => statusMap.set(r.id, r.status));

      setRows((prev) =>
        prev.map((row) => {
          const newStatus = statusMap.get(row.id);
          return newStatus ? { ...row, rank_status: newStatus } : row;
        })
      );
    } catch {
       // Error handled globally
    }
  };

  const handleRunPartialRank = async (row_id: number | null = null) => {
    const ids = getIdsFromSelection(rowSelection, row_id);

    if (ids.length === 0) {
      toast.error(t("keyword.noKeywordsSelected"));
      return;
    }

    try {
      const res = await api.keyword.runPartialRank({ ids });
      const results = (res.data.results || []) as { id: number; status: StatusConst }[];

      toast.info(t("status.processing"));

      const statusMap = new Map<number, StatusConst>();
      results.forEach((r) => statusMap.set(r.id, r.status));

      setRows((prev) =>
        prev.map((row) => {
          const newStatus = statusMap.get(row.id);
          return newStatus ? { ...row, partial_rank_status: newStatus } : row;
        })
      );
    } catch {
       // Error handled globally
    }
  };

  const handleRunExport = async (row_id: number | null = null) => {
    const ids = getIdsFromSelection(rowSelection, row_id);

    if (ids.length === 0) {
      toast.error(t("keyword.noKeywordsSelected"));
      return;
    }

    try {
      // Make the API call with blob response type
      const response = await api.keyword.runExport({ ids });

      // Get filename from Content-Disposition header or use a default
      const contentDisposition = response.headers["content-disposition"];
      let filename = "serp-results.csv";

      if (contentDisposition) {
        // Extract filename from the header (RFC 5987 compliant format)
        const filenameMatch = contentDisposition.match(
          /filename\*=UTF-8''([^;]+)/i
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        } else {
          // Try regular filename format
          const regularMatch = contentDisposition.match(
            /filename="?([^";]+)"?/i
          );
          if (regularMatch && regularMatch[1]) {
            filename = regularMatch[1];
          }
        }
      }

      // Add UTF-8 BOM (Byte Order Mark) to ensure Excel and other applications recognize the UTF-8 encoding
      const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
      // Combine BOM with the CSV data
      const blob = new Blob([BOM, response.data], {
        type: "text/csv;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(t("keyword.exportSuccess") || "Export successful");
    } catch (error) {
      console.error("Export error:", error);
      toast.error(t("common.error") || "An error occurred during export");
    }
  };

  const handleImport = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.keyword.importFile(formData);
      await loadData();
      toast.success(t("keyword.importSuccess"));
    } catch {
      await loadData();
    }
  };

  const handleToggleSchedule = async (keyword: Keyword) => {
    const updatedKeyword = { ...keyword, is_scheduled: !keyword.is_scheduled };
    await api.keyword.update(keyword.id, updatedKeyword);
    setRows((prev) =>
      prev.map((u) => (u.id === keyword.id ? updatedKeyword : u))
    );
  };

  const handleDelete = async (id: number) => {
    await api.keyword.delete(id);
    setRows((prev) => prev.filter((u) => u.id !== id));
  };

  const handleBulkDelete = async (payload: KeywordBulk) => {
    await api.keyword.bulkDelete(payload);
    setRows((prev) => prev.filter((u) => !payload.ids.includes(u.id)));
  };

  const onBulkDelete = () => {
    const ids = Object.keys(rowSelection).map(Number);

    if (ids.length === 0) {
      toast.error(t("keyword.noKeywordsSelected"));
      return;
    }

    confirm(() => handleBulkDelete({ ids }));
  };

  const handleUnstick = async (id: number) => {
    await api.keyword.unstick(id);
    await loadData();
  };

  const columns = getColumns({
    t,
    confirm,
    handleRunFetch,
    handleRunRank,
    handleRunPartialRank,
    handleRunExport,
    handleToggleSchedule,
    handleDelete,
    handleUnstick,
  });

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Extract entries from the form
    const entriesInput = e.currentTarget.querySelector(
      'input[name="entries"]'
    ) as HTMLInputElement;
    const entries = entriesInput ? JSON.parse(entriesInput.value) : [];

    // Filter out empty keywords
    const keywordsToCreate = entries.filter(
      (entry: { keyword: string; is_scheduled: boolean }) =>
        entry.keyword.trim() !== ""
    );

    if (keywordsToCreate.length === 0) {
      toast.error(t("keyword.keywordRequired"));
      return;
    }

    try {
      // Create each keyword
      const createPromises = keywordsToCreate.map(
        (entry: { keyword: string; is_scheduled: boolean }) => {
          const payload: KeywordCreate = {
            keyword: entry.keyword,
            is_scheduled: entry.is_scheduled,
          };
          return api.keyword.create(payload);
        }
      );

      await Promise.all(createPromises);
      await loadData();

      const count = keywordsToCreate.length;
      toast.success(
        count > 1 ? `${count} ${t("keyword.success")}` : t("keyword.success")
      );
    } catch {
      await loadData();
      // errors handled globally
    }
  };

  return {
    t,
    columns,
    filteredRows,
    search,
    setSearch,
    handleRunFetch,
    handleRunRank,
    handleRunPartialRank,
    handleRunExport,
    handleImport,
    onBulkDelete,
    handleModalSubmit,
    setRowSelection,
    rowSelection,
    sorting,
    setSorting,
  };
}
