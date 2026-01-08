import { useState } from 'react'
import { YesNoSelect } from '@/components/global/YesNoSelect'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface KeywordEntryFormProps {
    t: (key: string) => string;
    onChange?: (entries: { keyword: string; is_scheduled: boolean }[]) => void;
}

export function KeywordEntryForm({ t, onChange }: KeywordEntryFormProps) {
    const [entries, setEntries] = useState([{ keyword: '', is_scheduled: false }])

    const addEntry = () => {
        const updated = [...entries, { keyword: '', is_scheduled: false }]
        setEntries(updated)
        onChange?.(updated)
    }

    const removeEntry = (index: number) => {
        if (entries.length > 1) {
            const updated = entries.filter((_, i) => i !== index)
            setEntries(updated)
            onChange?.(updated)
        }
    }

    const updateKeyword = (index: number, value: string) => {
        const updated = [...entries]
        updated[index].keyword = value
        setEntries(updated)
        onChange?.(updated)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        const pastedText = e.clipboardData.getData('text')
        
        // Split by newlines to handle vertical paste from Excel
        const lines = pastedText.split(/[\r\n]+/).filter(line => line.trim() !== '')
        
        if (lines.length <= 1) {
            // If only one line, just update the current field
            updateKeyword(index, pastedText.trim())
            return
        }
        
        // Create a new entry for each line
        const currentEntries = [...entries]
        
        // Update the current field with the first line
        currentEntries[index].keyword = lines[0].trim()
        
        // Create new entries for the remaining lines
        const newEntries = lines.slice(1).map(line => ({
            keyword: line.trim(),
            is_scheduled: currentEntries[index].is_scheduled
        }))
        
        // Combine current entries with new entries
        const updatedEntries = [
            ...currentEntries.slice(0, index + 1),
            ...newEntries,
            ...currentEntries.slice(index + 1)
        ]
        
        setEntries(updatedEntries)
        onChange?.(updatedEntries)
    }

    const updateSchedule = (index: number, value: string) => {
        const updated = [...entries]
        updated[index].is_scheduled = value === 'yes'
        setEntries(updated)
        onChange?.(updated)
    }

    return (
        <>
        {/* Column Headers */}
        <div className="flex gap-2 mb-2">
            <div className="flex-1"></div>
            <div className="flex-6 text-sm font-medium">{t('keyword.additionalKeyword')}</div>
            <div className="flex-6 text-sm font-medium">{t('keyword.additionalSchedule')}</div>
        </div>
        
        {entries.map((entry, index) => (
            <div key={index} className="grid gap-4">
            <div className="ml-auto">
                {entries.length > 1 && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(index)}
                    className="h-6 w-6 p-0"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <h3 className="flex-1 text-sm font-medium">#{index + 1}</h3>
                <div className="flex-8">
                <Input
                    id={`keyword-${index}`}
                    name={`keyword-${index}`}
                    value={entry.keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    onPaste={(e) => handlePaste(e, index)}
                    placeholder={t('keyword.keyword')}
                />
                </div>
                <div className="flex-3">
                <YesNoSelect
                    id={`schedule-${index}`}
                    name={`schedule-${index}`}
                    defaultValue={entry.is_scheduled ? 'yes' : 'no'}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateSchedule(index, e.target.value)
                    }
                />
                </div>
            </div>
            {index < entries.length - 1 && <hr className="my-2" />}
            </div>
        ))}
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEntry}
            className="mt-2 flex items-center gap-1"
        >
            <Plus className="h-4 w-4" />
            <span>{t('common.new')}</span>
        </Button>
        <input type="hidden" name="entries" value={JSON.stringify(entries)} />
        </>
    )
}
