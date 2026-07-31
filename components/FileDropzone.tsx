"use client";
 
import { useState } from "react";
 
interface FileDropzoneProps {
  onUpload: (file: File) => void;
}
 
export default function FileDropzone({
  onUpload,
}: FileDropzoneProps) {
 
  const [fileName, setFileName] = useState("");
 
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
 
    const file = e.target.files?.[0];
 
    if (!file) return;
 
    setFileName(file.name);
 
    onUpload(file);
  }
 
 
  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
 
      <label className="cursor-pointer">
 
        <div className="text-gray-600 mb-3">
          آپلود فیش واریزی
        </div>
 
        <input
          type="file"
          accept="image/*,.pdf"
          hidden
          onChange={handleChange}
        />
 
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
          انتخاب فایل
        </div>
 
      </label>
 
 
      {fileName && (
        <p className="mt-4 text-sm text-green-600">
          {fileName}
        </p>
      )}
 
    </div>
  );
}
 