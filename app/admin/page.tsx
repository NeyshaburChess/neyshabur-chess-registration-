import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
 
 
export default async function AdminPage() {
 
  const cookieStore = await cookies();
 
  const session = cookieStore.get(
    "chess_admin_session"
  );
 
 
  if (!session) {
    redirect("/admin/login");
  }
 
 
 
  const registrations =
    await prisma.registration.findMany({
 
      orderBy: {
        createdAt: "desc"
      }
 
    });
 
 
 
  return (
 
    <main className="
      min-h-screen
      bg-[#07192f]
      p-5
      md:p-10
    ">
 
      <div className="
        max-w-7xl
        mx-auto
      ">
 
 
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-2xl
        ">
 
 
          <div className="
            flex
            justify-between
            items-center
            mb-8
            flex-wrap
            gap-4
          ">
 
 
            <div>
 
              <h1 className="
                text-3xl
                font-bold
                text-[#07192f]
              ">
                پنل مدیریت ثبت نام مسابقات
              </h1>
 
 
              <p className="
                text-gray-500
                mt-2
              ">
                لیست شرکت کنندگان
              </p>
 
            </div>
 
 
 
            <a
              href="/api/admin/export"
              className="
                bg-green-600
                text-white
                px-5
                py-3
                rounded-xl
                hover:bg-green-700
              "
            >
              خروجی Excel
            </a>
 
 
          </div>
 
 
 
          <div className="overflow-x-auto">
 
 
            <table className="
              w-full
              text-right
            ">
 
 
              <thead>
 
                <tr className="
                  border-b
                  bg-gray-50
                ">
 
 
                  <th className="p-4">
                    نام
                  </th>
 
 
                  <th className="p-4">
                    فیده
                  </th>
 
 
                  <th className="p-4">
                    تماس
                  </th>
 
 
                  <th className="p-4">
                    مسابقه
                  </th>
 
 
                  <th className="p-4">
                    مبلغ
                  </th>
 
 
                  <th className="p-4">
                    فیش
                  </th>
 
 
                  <th className="p-4">
                    وضعیت
                  </th>
 
 
                  <th className="p-4">
                    عملیات
                  </th>
 
 
                </tr>
 
              </thead>
 
 
 
              <tbody>
 
 
                {
                  registrations.map((item)=>(
 
                    <tr
                      key={item.id}
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >
 
 
                      <td className="p-4 font-semibold">
                        {item.fullName}
                      </td>
 
 
 
                      <td className="p-4">
                        {item.fideId || "-"}
                      </td>
 
 
 
                      <td className="p-4">
                        {item.phone}
                      </td>
 
 
 
                      <td className="p-4">
                        {item.tournamentName}
                      </td>
 
 
 
                      <td className="p-4">
                        {item.amount.toLocaleString()}
                      </td>
 
 
 
                      <td className="p-4">
 
                        <a
                          href={item.receiptUrl}
                          target="_blank"
                          className="
                            text-blue-600
                            underline
                          "
                        >
                          مشاهده
                        </a>
 
                      </td>
 
 
 
                      <td className="p-4">
 
 
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
 
                            ${
                              item.status === "APPROVED"
                              ?
                              "bg-green-100 text-green-700"
                              :
                              item.status === "REJECTED"
                              ?
                              "bg-red-100 text-red-700"
                              :
                              "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
 
                          {
                            item.status === "APPROVED"
                            ?
                            "تایید شده"
                            :
                            item.status === "REJECTED"
                            ?
                            "رد شده"
                            :
                            "در انتظار"
                          }
 
 
                        </span>
 
 
                      </td>
 
 
 
                      <td className="p-4">
 
                        <button
                          className="
                            bg-gray-800
                            text-white
                            px-3
                            py-2
                            rounded-lg
                          "
                        >
                          پرینت
                        </button>
 
 
                      </td>
 
 
                    </tr>
 
                  ))
                }
 
 
              </tbody>
 
 
            </table>
 
 
          </div>
 
 
        </div>
 
 
      </div>
 
 
    </main>
 
  );
 
}
 