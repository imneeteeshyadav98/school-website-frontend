'use client';

type CoreValue = {
  icon: string;
  title: string;
  subtitle?: string;
};

type CoreValuesGridProps = {
  values: CoreValue[];
};

export default function CoreValuesGrid({ values }: CoreValuesGridProps) {
  if (!values.length) return null;

  return (
    <section className="text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Core Values</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {values.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-5 hover:shadow-md transition flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-2">{item.icon}</div>
            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
            {item.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
