'use client';

export default function RevenueChart() {
  // بيانات تجريبية للرسم البياني
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
  const revenue = [8000, 9500, 7200, 11000, 10500, 12500];
  
  const maxRevenue = Math.max(...revenue);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">الإيرادات الشهرية</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {revenue.map((value, index) => {
            const height = (value / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative group">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                    {value.toLocaleString()} د.ك
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{months[index]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm">
        <div>
          <p className="text-gray-600">المجموع</p>
          <p className="text-xl font-bold text-gray-800">58,700 د.ك</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">المتوسط</p>
          <p className="text-xl font-bold text-gray-800">9,783 د.ك</p>
        </div>
      </div>
    </div>
  );
}
