import RegistrationForm from "@/components/RegistrationForm";
 
 
export default function Home() {
 
  return (
 
    <main className="min-h-screen bg-[#07192f] flex items-center justify-center p-5">
 
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,#38bdf8,transparent_40%)]" />
 
 
      <section className="relative w-full max-w-3xl">
 
        <div className="text-center mb-8 text-white">
 
 
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            ششمین و هفتمین دوره
            <br />
            مسابقات شطرنج جام قهرمانان نیشابور
          </h1>
 
 
          <p className="text-gray-300 text-lg">
            فرم رسمی ثبت نام مسابقات
            <br />
            هیأت شطرنج شهرستان نیشابور
          </p>
 
 
        </div>
 
 
 
        <div className="
          bg-white/95
          backdrop-blur
          rounded-3xl
          shadow-2xl
          p-6
          md:p-10
        ">
 
 
          <div className="mb-6 text-center">
 
 
            <h2 className="text-2xl font-bold text-[#07192f]">
              ثبت نام شرکت کننده
            </h2>
 
 
            <p className="text-gray-500 mt-2">
              لطفاً اطلاعات را دقیق وارد کنید
            </p>
 
 
          </div>
 
 
          <RegistrationForm />
 
 
        </div>
 
 
      </section>
 
 
    </main>
 
  );
}
 