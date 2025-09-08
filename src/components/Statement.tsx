import { User } from 'lucide-react'

function Statement() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gray-100">
      <div className="flex items-center gap-16 max-w-7xl w-full">


        {/* Text Section */}
        <div className="flex-1 pr-10">
          <div className="flex items-baseline gap-5 mb-10">
            <span className="text-5xl font-bold text-blue-800 leading-tight">كلمة سعادتها</span>
          </div>

          <div className="relative mb-10">
            <div className="text-8xl text-cyan-400 font-bold leading-none absolute -top-5 -right-2">"</div>
            <p className="text-xl text-gray-600 leading-relaxed px-10 py-5 font-normal text-justify">
              ستساهم المدينة غير الربحية الأولى من نوعها في تحقيق مستهدفات 
              مؤسسة محمد بن سلمان "مسك" في دعم الابتكار وريادة الأعمال وتأهيل 
              قيادات المستقبل وذلك من حيث ما ستوفره من فرص وبرامج تدريب 
              للشباب والشابات، كما ستضم جملة من الخدمات التي ستساهم في خلق 
              بيئة جاذبة للمستفيدين من أنشطة المدينة.
            </p>
            <div className="text-8xl text-cyan-400 font-bold leading-none absolute -bottom-10 left-5">"</div>
          </div>

          <div className="mt-8">
            <p className="text-2xl text-cyan-400 font-semibold mb-2">تحقيقًا لرؤية</p>
            <p className="text-3xl text-blue-800 font-bold leading-tight">صاحب السمو الملكي ولي العهد الأمير محمد</p>
            <p className="text-3xl text-blue-800 font-bold leading-tight">بن سلمان بن عبد العزيز.</p>
          </div>
        </div>

                {/* Image Section - Moved to Left */}
        <div className="flex-shrink-0">
          <div className="w-96 h-96 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 rounded-full relative flex items-center justify-center shadow-2xl shadow-blue-800/30">
            <div className="w-72 h-72 bg-white/10 border-[3px] border-dashed border-white/50 rounded-full flex flex-col items-center justify-center text-white text-center">
              <div className="mb-4 opacity-80">
                <User size={80} color="white" strokeWidth={1.5} />
              </div>
              <p className="text-lg font-medium opacity-90">صورة الشخص</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statement