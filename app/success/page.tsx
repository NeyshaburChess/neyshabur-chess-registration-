import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
 
export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#07192f] p-5">
 
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center">
 
        <CheckCircle2
          size={90}
          className="mx-auto text-green-600 mb-6"
        />
 
        <h1 className="text-3xl font-bold text-[#07192f] mb-4">
          ثبت نام با موفقیت انجام شد
        </h1>
 
        <p className="text-gray-600 leading-8">
          اطلاعات شما با موفقیت ثبت گردید.
          <br />
          پس از بررسی فیش واریزی، ثبت نام شما نهایی خواهد شد.
        </p>
 
        <div className="mt-8">
 
          <Link
            href="/"
            className="inline-block bg-[#07192f] text-white px-8 py-3 rounded-xl hover:bg-blue-900 transition"
          >
            بازگشت به صفحه ثبت نام
          </Link>
 
        </div>
 
      </div>
 
    </main>
  );
}
 