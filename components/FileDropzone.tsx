"use client";
 
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileImage, FileText, CheckCircle2 } from "lucide-react";
 
interface Props {
  onUpload: (file: File) => Promise<void>;
}
 
export default function FileDropzone({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
 
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
 
      const file = acceptedFiles[0];
 
      setUploading(true);
      setFileName(file.name);
 
      if (file.type.startsWith("image")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("");
      }
 
      try {
        await onUpload(file);
      } catch (err) {
        console.error(err);
        alert("خطا در آپلود فایل");
      }
 
      setUploading(false);
    },
    [onUpload]
  );
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "application/pdf": [],
    },
  });
 
  return (
    <div className="space-y-4">
 
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 cursor-pointer transition
 
        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 hover:border-blue-600"
        }`}
      >
        <input {...getInputProps()} />
 
        <div className="flex flex-col items-center gap-3">
 
          <UploadCloud size={50} className="text-blue-700" />
 
          <h3 className="font-bold text-lg">
            فیش واریزی را اینجا رها کنید
          </h3>
 
          <p className="text-gray-500 text-center">
            یا برای انتخاب فایل کلیک کنید
          </p>
 
          <p className="text-sm text-gray-400">
            JPG - PNG - PDF
            <br />
            حداکثر ۵ مگابایت
          </p>
 
        </div>
      </div>
 
      {uploading && (
        <div className="rounded-xl bg-yellow-100 p-3 text-center text-yellow-700">
          در حال آپلود...
        </div>
      )}
 
      {!uploading && fileName && (
        <div className="rounded-xl bg-green-100 p-4">
 
          <div className="flex items-center gap-3">
 
            <CheckCircle2 className="text-green-700" />
 
            {preview ? (
              <FileImage className="text-blue-700" />
            ) : (
              <FileText className="text-red-600" />
            )}
 
            <span className="font-medium break-all">
              {fileName}
            </span>
 
          </div>
 
        </div>
      )}
 
      {preview && (
        <img
          src={preview}
          alt="receipt"
          className="rounded-xl border max-h-80 mx-auto"
        />
      )}
 
    </div>
  );
}
 