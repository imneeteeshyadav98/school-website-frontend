'use client';

type VisionMissionProps = {
  vision: string;
  mission: string;
};

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <div className="text-5xl mb-2">🎯</div>
        <h3 className="text-xl font-semibold mb-1">Vision</h3>
        <p className="text-gray-700 leading-relaxed">{vision}</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <div className="text-5xl mb-2">📖</div>
        <h3 className="text-xl font-semibold mb-1">Mission</h3>
        <p className="text-gray-700 leading-relaxed">{mission}</p>
      </div>
    </section>
  );
}
