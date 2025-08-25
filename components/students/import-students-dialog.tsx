"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";

interface ImportStudentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectId: string;
  onStudentsImported: () => void;
}

export function ImportStudentsDialog({
  open,
  onOpenChange,
  subjectId,
  onStudentsImported,
}: ImportStudentsDialogProps) {
  const [csvData, setCsvData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [importMode, setImportMode] = useState<"csv" | "excel">("csv");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrors([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) return;

        if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          // Handle Excel file
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Convert to expected format
          const students = [];
          const newErrors = [];

          // Skip header row
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as any[];
            if (!row || row.length === 0) continue;

            const [name, regNumber, rollNumber, course] = row;
            if (!name || !regNumber || !rollNumber || !course) {
              newErrors.push(
                `Row ${
                  i + 1
                }: All fields are required (name, regNumber, rollNumber, course)`
              );
              continue;
            }

            students.push([name, regNumber, rollNumber, course]);
          }

          if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
          }

          setParsedData(students);
        } else if (file.name.endsWith(".csv")) {
          // Handle CSV file
          const csvText = data as string;
          const lines = csvText.trim().split("\n");
          const students = [];
          const newErrors = [];

          // Skip header if it exists
          const startIndex = lines[0].toLowerCase().includes("name") ? 1 : 0;

          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = line.split(",").map((part) => part.trim());
            if (parts.length !== 4) {
              newErrors.push(
                `Line ${i + 1}: Expected 4 columns, got ${parts.length}`
              );
              continue;
            }

            const [name, regNumber, rollNumber, course] = parts;
            if (!name || !regNumber || !rollNumber || !course) {
              newErrors.push(`Line ${i + 1}: All fields are required`);
              continue;
            }

            students.push([name, regNumber, rollNumber, course]);
          }

          if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
          }

          setParsedData(students);
        }
      } catch (error) {
        setErrors(["Failed to parse file. Please check the format."]);
      }
    };

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleCsvImport = () => {
    if (!csvData.trim()) return;

    setErrors([]);
    const lines = csvData.trim().split("\n");
    const students = [];
    const newErrors = [];

    // Skip header if it exists
    const startIndex = lines[0].toLowerCase().includes("name") ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(",").map((part) => part.trim());
      if (parts.length !== 4) {
        newErrors.push(
          `Line ${i + 1}: Expected 4 columns, got ${parts.length}`
        );
        continue;
      }

      const [name, regNumber, rollNumber, course] = parts;
      if (!name || !regNumber || !rollNumber || !course) {
        newErrors.push(`Line ${i + 1}: All fields are required`);
        continue;
      }

      students.push([name, regNumber, rollNumber, course]);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setParsedData(students);
  };

  const handleImport = async () => {
    let studentsData = [];

    if (importMode === "csv" && csvData.trim()) {
      handleCsvImport();
      return;
    }

    if (parsedData.length === 0) {
      setErrors(["No data to import"]);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      // Convert parsed data to student objects
      const students = parsedData.map(
        ([name, regNumber, rollNumber, course]) => ({
          subject_id: subjectId,
          name: name.toString().trim(),
          reg_number: regNumber.toString().trim().toUpperCase(),
          roll_number: rollNumber.toString().trim().toUpperCase(),
          course: course.toString().trim(),
        })
      );

      const { error } = await supabase.from("students").insert(students);

      if (error) {
        if (error.code === "23505") {
          setErrors([
            "Some registration or roll numbers already exist for this subject",
          ]);
        } else {
          throw error;
        }
        setIsLoading(false);
        return;
      }

      // Reset form
      setCsvData("");
      setParsedData([]);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onStudentsImported();
    } catch (error) {
      console.error("Error importing students:", error);
      setErrors(["Failed to import students. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleData = `John Doe,REG001,ROLL001,Computer Science
Jane Smith,REG002,ROLL002,Information Technology
Bob Johnson,REG003,ROLL003,Computer Science`;

  const downloadTemplate = () => {
    const templateData = [
      ["name", "regNumber", "rollNumber", "course"],
      ["John Doe", "REG001", "ROLL001", "Computer Science"],
      ["Jane Smith", "REG002", "ROLL002", "Information Technology"],
      ["Bob Johnson", "REG003", "ROLL003", "Computer Science"],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(templateData);

    // Set column widths
    ws["!cols"] = [
      { wch: 20 }, // name
      { wch: 15 }, // regNumber
      { wch: 15 }, // rollNumber
      { wch: 25 }, // course
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "student_import_template.xlsx");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Import Students</DialogTitle>
          <DialogDescription>
            Import multiple students using Excel (.xlsx, .xls) or CSV files.
            Required fields: name, regNumber, rollNumber, course
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={importMode}
          onValueChange={(value) => setImportMode(value as "csv" | "excel")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="excel">Excel File</TabsTrigger>
            <TabsTrigger value="csv">CSV Data</TabsTrigger>
          </TabsList>

          <TabsContent value="excel" className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Excel File
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}>
                  <Icon icon="lucide:download" className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
              <div className="mt-2">
                <Input
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {fileName && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {fileName} ({parsedData.length} students parsed)
                  </p>
                )}
              </div>
            </div>

            {parsedData.length > 0 && (
              <div className="bg-muted/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">
                  Preview (first 5 rows):
                </p>
                <div className="text-xs font-mono space-y-1">
                  <div className="font-semibold">
                    Name | Reg Number | Roll Number | Course
                  </div>
                  {parsedData.slice(0, 5).map((row, index) => (
                    <div key={index}>{row.join(" | ")}</div>
                  ))}
                  {parsedData.length > 5 && (
                    <div className="text-muted-foreground">
                      ... and {parsedData.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div>
              <Label className="text-sm font-medium">CSV Data</Label>
              <Textarea
                placeholder={`Enter CSV data here...\n\nExample:\nname,regNumber,rollNumber,course\n${sampleData}`}
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="min-h-[200px] font-mono text-sm mt-2"
              />
              {csvData.trim() && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCsvImport}
                  className="mt-2">
                  <Icon icon="lucide:eye" className="h-4 w-4 mr-2" />
                  Preview Data
                </Button>
              )}
            </div>

            {parsedData.length > 0 && (
              <div className="bg-muted/50 p-3 rounded">
                <p className="text-sm font-medium mb-2">
                  Preview ({parsedData.length} students):
                </p>
                <div className="text-xs font-mono space-y-1">
                  <div className="font-semibold">
                    Name | Reg Number | Roll Number | Course
                  </div>
                  {parsedData.slice(0, 5).map((row, index) => (
                    <div key={index}>{row.join(" | ")}</div>
                  ))}
                  {parsedData.length > 5 && (
                    <div className="text-muted-foreground">
                      ... and {parsedData.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {errors.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-3">
            <p className="text-sm font-medium text-destructive mb-2">
              Import Errors:
            </p>
            <ul className="text-sm text-destructive space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-muted p-3 rounded">
          <p className="text-sm font-medium mb-2">Format Requirements:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              • <strong>Excel:</strong> Columns should be: name, regNumber,
              rollNumber, course (in order)
            </li>
            <li>
              • <strong>CSV:</strong> Four comma-separated values in the same
              order
            </li>
            <li>
              • Registration and roll numbers must be unique within the subject
            </li>
            <li>• Header row is optional and will be automatically detected</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={
              isLoading ||
              (importMode === "csv" ? !csvData.trim() : parsedData.length === 0)
            }>
            {isLoading ? (
              <>
                <Icon
                  icon="lucide:loader-2"
                  className="mr-2 h-4 w-4 animate-spin"
                />
                Importing...
              </>
            ) : (
              <>
                <Icon icon="lucide:upload" className="mr-2 h-4 w-4" />
                Import {parsedData.length} Students
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
