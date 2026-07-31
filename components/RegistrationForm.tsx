"use client";
 
import { useState } from "react";
import FileDropzone from "./FileDropzone";
 
export default function RegistrationForm() {
 
  const [receiptUrl, setReceiptUrl] = useState("");
  const [loading, setLoading] = useState(false);
 
 
  async function uploadFile(file: File) {
 
    const formData = new FormData();
 
    formData.append("file", file);
 
 
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
 
 
    const data = await res.json();
 
 
    if (data.url) {
      setReceiptUrl(data.url);
    }
 
  }
 
 
 
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
 
    e.preventDefault();
 
    setLoading(true);
 
 
    const form =
      new FormData(e.currentTarget);
 
 
    const data = {
 
      fullName:
        form.get("fullName"),
 
      fideId:
        form.get("fideId"),
 
      phone:
        form.get("phone"),
 
      email:
        form.get("email"),
 
      city:
        form.get("city"),
 
      tournamentName:
        form.get("tournamentName"),
 
      amount:
        Number(form.get("amount")),
 
      receiptUrl,
 
    };
 
 
    const res = await fetch(
      "/api/register",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
      }
    );
 
 
    if(res.ok){
 
      window.location.href="/success";
 
    }
 
 
    setLoading(false);
 
  }
 
 
 
  return (
 
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
 
 
      <input
        name="fullName"
        placeholder="نام و نام خانوادگی"
        className="input"
        required
      />
 
 
      <input
        name="fideId"
        placeholder="آیدی فیده"
        className="input"
      />
 
 
      <input
        name="phone"
        placeholder="شماره تماس"
        className="input"
        required
      />
 
 
      <input
        name="email"
        placeholder="ایمیل"
        className="input"
      />
 
 
      <input
        name="city"
        placeholder="شهر"
        className="input"
      />
 
 
      <input
        name="tournamentName"
        placeholder="نام مسابقه"
        className="input"
        required
      />
 
 
      <input
        name="amount"
        placeholder="مبلغ واریزی"
        type="number"
        className="input"
        required
      />
 
 
      <FileDropzone
        onUpload={uploadFile}
      />
 
 
      {
        receiptUrl && (
          <p className="text-green-600">
            فیش با موفقیت آپلود شد
          </p>
        )
      }
 
 
 
      <button
        disabled={loading || !receiptUrl}
        className="bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
 
        {
          loading
          ? "در حال ارسال..."
          : "ثبت نام"
        }
 
      </button>
 
 
    </form>
 
  );
}
 