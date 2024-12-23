import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Waves, MapPin, ThermometerSun, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface TemperatureData {
  temperature: number;
  time: string;
}

const OceanDashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["oceanTemp"],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/ocean-temp");
      if (!response.ok) {
        throw new Error("Failed to fetch ocean temperature data");
      }
      return response.json();
    },
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch ocean temperature data",
      });
    }
  }, [error, toast]);

  const mockData: TemperatureData[] = Array.from({ length: 24 }, (_, i) => ({
    temperature: 18 + Math.random() * 2,
    time: `${i}:00`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF7CD] to-[#D3E4FD] p-4 sm:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Waves className="w-8 h-8 text-ocean-600" />
            <h1 className="text-2xl font-bold text-ocean-900">Ngamotu Beach Ocean Monitor</h1>
          </div>
          <Sun className="w-10 h-10 text-yellow-500 animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-ocean-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
              <ThermometerSun className="w-5 h-5 text-ocean-600" />
              <h2 className="text-lg font-semibold text-ocean-900">Current Temperature</h2>
            </div>
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <div className="text-4xl font-bold text-ocean-700">
                {mockData[mockData.length - 1].temperature.toFixed(1)}°C
              </div>
            )}
            <p className="mt-2 text-sm text-ocean-600">Perfect for a swim!</p>
          </Card>

          <Card className="p-6 bg-white/70 backdrop-blur-sm border-ocean-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-ocean-600" />
              <h2 className="text-lg font-semibold text-ocean-900">Location Info</h2>
            </div>
            <div className="space-y-2 text-ocean-800">
              <p className="font-medium">Ngamotu Beach, New Plymouth</p>
              <p>Taranaki, New Zealand</p>
              <p className="text-sm text-ocean-600">39.0556° S, 174.0452° E</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white/70 backdrop-blur-sm border-ocean-200 shadow-lg">
          <h2 className="text-lg font-semibold text-ocean-900 mb-4">24-Hour Temperature Trend</h2>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#0c4a6e"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#0c4a6e"
                    fontSize={12}
                    domain={['auto', 'auto']}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OceanDashboard;