import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx-js-style";
import { NextResponse } from "next/server";
 
export async function GET() {
 
  const registrations = await prisma.registration.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
 
 
  const rows = registrations.map((item, index) => [
    index + 1,
    item.fullName,
    item.fideId || "-",
    item.phone,
    item.tournamentName,
    item.amount,
    item.status === "APPROVED"
      ? "تایید شده"
      : item.status === "REJECTED"
        ? "رد شده"
        : "در انتظار",
    item.createdAt.toLocaleDateString("fa-IR")
  ]);
 
 
  const sheetData = [
 
    [
      "هیأت شطرنج شهرستان نیشابور"
    ],
 
    [
      "فرم ثبت نام مسابقات شطرنج"
    ],
 
    [
      "گزارش ثبت نام شرکت کنندگان"
    ],
 
    [],
 
    [
      "ردیف",
      "نام و نام خانوادگی",
      "آیدی فیده",
      "شماره تماس",
      "مسابقه",
      "مبلغ واریزی (تومان)",
      "وضعیت",
      "تاریخ ثبت"
    ],
 
    ...rows
 
  ];
 
 
  const worksheet =
    XLSX.utils.aoa_to_sheet(sheetData);
 
 
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
 
 
  worksheet["!merges"] = [
    {
      s:{r:0,c:0},
      e:{r:0,c:7}
    },
    {
      s:{r:1,c:0},
      e:{r:1,c:7}
    },
    {
      s:{r:2,c:0},
      e:{r:2,c:7}
    }
  ];
 
 
  const titleStyle = {
 
    fill:{
      fgColor:{
        rgb:"07192F"
      }
    },
 
    font:{
      bold:true,
      color:{
        rgb:"FFFFFF"
      },
      sz:16
    },
 
    alignment:{
      horizontal:"center",
      vertical:"center"
    }
 
  };
 
 
  const headerStyle = {
 
    fill:{
      fgColor:{
        rgb:"0B3B66"
      }
    },
 
    font:{
      bold:true,
      color:{
        rgb:"FFFFFF"
      }
    },
 
    alignment:{
      horizontal:"center",
      vertical:"center"
    }
 
  };
 
 
  const bodyStyle = {
 
    alignment:{
      horizontal:"center",
      vertical:"center"
    },
 
    border:{
      top:{
        style:"thin",
        color:{rgb:"CCCCCC"}
      },
      bottom:{
        style:"thin",
        color:{rgb:"CCCCCC"}
      },
      left:{
        style:"thin",
        color:{rgb:"CCCCCC"}
      },
      right:{
        style:"thin",
        color:{rgb:"CCCCCC"}
      }
    }
 
  };
 
 
  for(let c=0;c<8;c++){
 
    worksheet[
      XLSX.utils.encode_cell({
        r:0,
        c
      })
    ].s = titleStyle;
 
 
    worksheet[
      XLSX.utils.encode_cell({
        r:1,
        c
      })
    ].s = titleStyle;
 
 
    worksheet[
      XLSX.utils.encode_cell({
        r:2,
        c
      })
    ].s = titleStyle;
 
 
    worksheet[
      XLSX.utils.encode_cell({
        r:4,
        c
      })
    ].s = headerStyle;
 
  }
 
 
  const range =
    XLSX.utils.decode_range(
      worksheet["!ref"]!
    );
 
 
  for(
    let r=5;
    r<=range.e.r;
    r++
  ){
 
    for(
      let c=0;
      c<=7;
      c++
    ){
 
      const cell =
        XLSX.utils.encode_cell({
          r,
          c
        });
 
 
      if(worksheet[cell]){
        worksheet[cell].s = bodyStyle;
      }
 
    }
 
  }
 
 
  worksheet["!rows"]=[
    {hpt:35},
    {hpt:28},
    {hpt:25},
    {hpt:10},
    {hpt:30}
  ];
 
 
  worksheet["!autofilter"]={
    ref:`A5:H${range.e.r+1}`
  };
 
 
  const workbook =
    XLSX.utils.book_new();
 
 
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "ثبت نام مسابقات"
  );
 
 
  workbook.Workbook={
    Views:[
      {
        RTL:true
      }
    ]
  };
 
 
  const buffer =
    XLSX.write(
      workbook,
      {
        type:"buffer",
        bookType:"xlsx"
      }
    );
 
 
  return new NextResponse(
    buffer,
    {
      headers:{
        "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 
        "Content-Disposition":
        "attachment; filename=Neyshabur-Chess-Registrations.xlsx"
      }
    }
  );
 
}
 