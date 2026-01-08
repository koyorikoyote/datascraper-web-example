import { Download, MonitorPlay, MonitorSmartphone, Trash2, Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FormModal } from '@/components/global/FormModal'
import { DataTable } from '@/components/global/DataTable'
import { useKeywordManagement } from './useKeywordManagement'
import { KeywordEntryForm } from './KeywordEntryForm'
import { useState, useRef } from 'react'


export default function KeywordManagement() {
  const {
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
  } = useKeywordManagement()

  const [importOpen, setImportOpen] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">{t('keyword.title')}</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex w-full gap-2 justify-center order-2 sm:order-2 sm:w-auto sm:justify-start">
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2" onClick={() => handleRunFetch()}>
              <MonitorPlay className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.runFetch')}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2" onClick={() => handleRunPartialRank()}>
              <MonitorSmartphone className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.runPartialRank')}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2" onClick={() => handleRunRank()}>
              <MonitorSmartphone className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.runRank')}</span>
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center gap-1 sm:gap-2" onClick={() => handleRunExport()}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.download')}</span>
            </Button>

            <Button variant="secondary" size="sm" className="flex items-center gap-1 sm:gap-2" onClick={() => setImportOpen(true)}>
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.import')}</span>
            </Button>

            <Dialog open={importOpen} onOpenChange={setImportOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('keyword.importKeywords')}</DialogTitle>
                  <DialogDescription>{t('keyword.selectFile')}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    className="hidden"
                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    {t('keyword.selectFile')}
                  </Button>
                  <span className="text-sm text-muted-foreground truncate max-w-[220px]">
                    {importFile ? importFile.name : t('keyword.importKeywords')}
                  </span>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      {t('common.cancel')}
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    disabled={!importFile || isImporting}
                    onClick={async () => {
                      if (!importFile) return
                      try {
                        setIsImporting(true)
                        await handleImport(importFile)
                        setImportFile(null)
                        setImportOpen(false)
                      } finally {
                        setIsImporting(false)
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    {isImporting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {t('keyword.import')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <FormModal title={t('keyword.addKeyword')} onSubmit={handleModalSubmit}>
              <KeywordEntryForm t={t} />
            </FormModal>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              className="flex items-center gap-1 sm:gap-2"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('keyword.delete')}</span>
            </Button>
          </div>
          <Input
            placeholder={t('keyword.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full sm:w-60 order-1 sm:order-1"
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredRows}
        onRowSelectionChange={setRowSelection}
        rowSelection={rowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        getRowId={(row) => String(row.id)}
      />
    </div>
  )
}
