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
 
    const result = await res.json();
 
    if (!res.ok) {
      alert(result.error || "خطا در آپلود فیش");
      return;
    }
 
    setReceiptUrl(result.url);
  }
 
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
 
    if (!receiptUrl) {
      alert("ابتدا فیش واریزی را آپلود کنید.");
      return;
    }
 
    setLoading(true);
 
    const form = new FormData(e.currentTarget);
 
    const body = {
      fullName: form.get("fullName"),
      fideId: form.get("fideId"),
      phone: form.get("phone"),
      email: form.get("email"),
      city: form.get("city"),
      tournamentName: form.get("tournamentName"),
      amount: Number(form.get("amount")),
      receiptUrl,
    };
 
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
 
      const result = await res.json();
 
      if (!res.ok) {
        alert(result.error || "خطا در ثبت نام");
        setLoading(false);
        return;
      }
 
      window.location.href = "/success";
    } catch {
      alert("خطا در ارتباط با سرور");
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
        placeholder="آیدی فیده (اختیاری)"
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
        type="email"
        placeholder="ایمیل (اختیاری)"
        className="input"
      />
 
      <input
        name="city"
        placeholder="شهر"
        className="input"
      />
 
      <select
        name="tournamentName"
        className="input"
        required
        defaultValue=""
      >
        <option value="" disabled>
          انتخاب مسابقه
        </option>
 
        <option value="ششمین دوره مسابقات قهرمانان شطرنج نیشابور">
          ششمین دوره مسابقات قهرمانان شطرنج نیشابور
        </option>
 
        <option value="هفتمین دوره مسابقات قهرمانان شطرنج نیشابور">
          هفتمین دوره مسابقات قهرمانان شطرنج نیشابور
        </option>
 
        <option value="ثبت نام در هر دو دوره">
          ثبت نام در هر دو دوره
        </option>
      </select>
 
      <input
        name="amount"
        type="number"
        placeholder="مبلغ واریزی (ریال)"
        className="input"
        required
      />
 
      <FileDropzone onUpload={uploadFile} />
 
      {receiptUrl && (
        <div className="rounded-lg bg-green-100 p-3 text-green-700 text-center">
          ✅ فیش با موفقیت آپلود شد.
        </div>
      )}
 
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#07192f] py-3 text-white font-bold hover:bg-blue-900 disabled:opacity-50"
      >
        {loading ? "در حال ثبت..." : "ثبت نام"}
      </button>
    </form>
  );
}
 