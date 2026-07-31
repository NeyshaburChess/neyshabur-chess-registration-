import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx-js-style";
import { NextResponse } from "next/server";
 
 
export async function GET() {
 
  const registrations =
    await prisma.registration.findMany({
 
      orderBy: {
        createdAt: "desc"
      }
 
    });
 
 
 
  const data = registrations.map((item, index) => ({
 
    "ردیف": index + 1,
 
    "نام و نام خانوادگی":
      item.fullName,
 
    "آیدی فیده":
      item.fideId || "-",
 
    "شماره تماس":
      item.phone,
 
    "مسابقه":
      item.tournamentName,
 
    "مبلغ واریزی (تومان)":
      item.amount,
 
    "وضعیت":
      item.status === "APPROVED"
        ? "تایید شده"
        :
        item.status === "REJECTED"
          ? "رد شده"
          :
          "در انتظار",
 
    "تاریخ ثبت":
      item.createdAt.toLocaleDateString("fa-IR")
 
  }));
 
 
 
  const worksheet =
    XLSX.utils.json_to_sheet(data);
 
 
 
  worksheet["!cols"] = [
 
    { wch: 8 },
    { wch: 30 },
    { wch: 18 },
    { wch: 18 },
    { wch: 35 },
    { wch: 22 },
    { wch: 18 },
    { wch: 18 }
 
  ];
 
 
 
  worksheet["!autofilter"] = {
    ref: worksheet["!ref"]!
  };
 
 
 
  const headerStyle = {
 
    fill: {
      fgColor: {
        rgb: "07192F"
      }
    },
 
    font: {
 
      bold: true,
 
      color: {
        rgb: "FFFFFF"
      },
 
      sz: 12
 
    },
 
    alignment: {
 
      horizontal: "center",
 
      vertical: "center"
 
    }
 
  };
 
 
 
  const bodyStyle = {
 
    alignment: {
 
      horizontal: "center",
 
      vertical: "center"
 
    },
 
 
    border: {
 
      top: {
        style: "thin",
        color: {
          rgb: "D1D5DB"
        }
      },
 
      bottom: {
        style: "thin",
        color: {
          rgb: "D1D5DB"
        }
      },
 
      left: {
        style: "thin",
        color: {
          rgb: "D1D5DB"
        }
      },
 
      right: {
        style: "thin",
        color: {
          rgb: "D1D5DB"
        }
      }
 
    }
 
  };
 
 
 
  const range =
    XLSX.utils.decode_range(
      worksheet["!ref"]!
    );
 
 
 
  for (
    let row = range.s.r;
    row <= range.e.r;
    row++
  ) {
 
    for (
      let col = range.s.c;
      col <= range.e.c;
      col++
    ) {
 
 
      const cell =
        XLSX.utils.encode_cell({
 
          r: row,
 
          c: col
 
        });
 
 
 
      if (worksheet[cell]) {
 
        worksheet[cell].s =
          row === 0
            ? headerStyle
            : bodyStyle;
 
      }
 
    }
 
  }
 
 
 
  worksheet["!rows"] = [
 
    {
      hpt: 25
    }
 
  ];
 
 
 
  const workbook =
    XLSX.utils.book_new();
 
 
 
  XLSX.utils.book_append_sheet(
 
    workbook,
 
    worksheet,
 
    "ثبت نام مسابقات"
 
  );
 
 
 
  workbook.Workbook = {
 
    Views: [
 
      {
 
        RTL: true
 
      }
 
    ]
 
  };
 
 
 
  const buffer =
    XLSX.write(
 
      workbook,
 
      {
 
        type: "buffer",
 
        bookType: "xlsx"
 
      }
 
    );
 
 
 
  return new NextResponse(
 
    buffer,
 
    {
 
      headers: {
 
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 
 
        "Content-Disposition":
          "attachment; filename=Neyshabur-Chess-Registrations.xlsx"
 
      }
 
    }
 
  );
 
}
 