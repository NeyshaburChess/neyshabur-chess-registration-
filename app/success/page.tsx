import Link from "next/link";
 
 
export default function SuccessPage() {
 
  return (
 
    <main className="
      min-h-screen
      bg-[#07192f]
      flex
      items-center
      justify-center
      p-5
    ">
 
 
      <div className="
        bg-white
        rounded-3xl
        shadow-2xl
        max-w-md
        w-full
        p-8
        text-center
      ">
 
 
        <div className="
          w-20
          h-20
          mx-auto
          mb-6
          rounded-full
          bg-green-100
          flex
          items-center
          justify-center
        ">
 
          <span className="
            text-4xl
          ">
            ✓
          </span>
 
        </div>
 
 
 
        <h1 className="
          text-3xl
          font-bold
          text-[#07192f]
          mb-4
        ">
          ثبت نام موفق بود
        </h1>
 
 
 
        <p className="
          text-gray-600
          leading-8
          mb-8
        ">
          اطلاعات شما با موفقیت ثبت شد.
          <br />
          پس از بررسی فیش واریزی توسط هیأت شطرنج،
          نتیجه تایید اعلام خواهد شد.
        </p>
 
 
 
        <Link
          href="/"
          className="
            inline-block
            bg-blue-700
            text-white
            px-8
            py-3
            rounded-xl
            hover:bg-blue-800
            transition
          "
        >
          بازگشت به صفحه ثبت نام
        </Link>
 
 
      </div>
 
 
    </main>
 
  );
 
}
 