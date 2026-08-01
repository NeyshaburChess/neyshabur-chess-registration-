import Link from "next/link";
import { prisma } from "@/lib/prisma";
 
export const dynamic = "force-dynamic";
 
export default async function AdminPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
 
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
 
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
 
          <div>
            <h1 className="text-3xl font-bold text-[#07192F]">
              پنل مدیریت ثبت نام مسابقات
            </h1>
 
            <p className="text-gray-500 mt-2">
              تعداد ثبت‌نام‌ها: {registrations.length}
            </p>
          </div>
 
          <Link
            href="/api/admin/export"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            دانلود فایل Excel
          </Link>
 
        </div>
 
        <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
 
          <table className="min-w-full">
 
            <thead className="bg-[#07192F] text-white">
 
              <tr>
 
                <th className="px-4 py-3 text-center">ردیف</th>
 
                <th className="px-4 py-3 text-center">
                  نام و نام خانوادگی
                </th>
 
                <th className="px-4 py-3 text-center">
                  آیدی فیده
                </th>
 
                <th className="px-4 py-3 text-center">
                  شماره تماس
                </th>
 
                <th className="px-4 py-3 text-center">
                  ایمیل
                </th>
 
                <th className="px-4 py-3 text-center">
                  شهر
                </th>
 
                <th className="px-4 py-3 text-center">
                  مسابقه
                </th>
 
                <th className="px-4 py-3 text-center">
                  مبلغ
                </th>
 
                <th className="px-4 py-3 text-center">
                  وضعیت
                </th>
 
                <th className="px-4 py-3 text-center">
                  فیش واریزی
                </th>
 
                <th className="px-4 py-3 text-center">
                  تاریخ ثبت
                </th>
 
              </tr>
 
            </thead>
 
            <tbody>
 
              {registrations.length === 0 ? (
 
                <tr>
 
                  <td
                    colSpan={11}
                    className="py-10 text-center text-gray-500"
                  >
                    هنوز هیچ ثبت نامی انجام نشده است.
                  </td>
 
                </tr>
 
              ) : (
 
                registrations.map((item, index) => (
 
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
 
                    <td className="px-4 py-3 text-center">
                      {index + 1}
                    </td>
 
                    <td className="px-4 py-3">
                      {item.fullName}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.fideId || "-"}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.phone}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.email || "-"}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.city || "-"}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.tournamentName}
                    </td>
 
                    <td className="px-4 py-3 text-center">
                      {item.amount.toLocaleString()} تومان
                    </td>
 
                    <td className="px-4 py-3 text-center">
 
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                          item.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : item.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "APPROVED"
                          ? "تأیید شده"
                          : item.status === "REJECTED"
                          ? "رد شده"
                          : "در انتظار"}
                      </span>
 
                    </td>
 
                    <td className="px-4 py-3 text-center">
 
                      <a
                        href={item.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        مشاهده فیش
                      </a>
 
                    </td>
 
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </td>
 
                  </tr>
 
                ))
 
              )}
 
            </tbody>
 
          </table>
 
        </div>
 
      </div>
    </main>
  );
}
 