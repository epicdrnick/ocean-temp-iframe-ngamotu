import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Waves, MapPin, ThermometerSun } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TemperatureData {
  temperature: number;
  time: string;
}

const OceanDashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["oceanTemp"],
    queryFn: async () => {
      // This is a mock API call - replace with actual API endpoint
      const response = await fetch("https://api.example.com/ocean-temp");
      if (!response.ok) {
        throw new Error("Failed to fetch ocean temperature data");
      }
      return response.json();
    },
    retry: 2,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  // For demo purposes, generating mock data
  const mockData: TemperatureData[] = Array.from({ length: 24 }, (_, i) => ({
    temperature: 18 + Math.random() * 2,
    time: `${i}:00`,
  }));

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch ocean temperature data",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-ocean-100 p-4 sm:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 mb-8">
          <Waves className="w-8 h-8 text-ocean-600" />
          <h1 className="text-2xl font-bold text-ocean-900">Ngamotu Beach Ocean Monitor</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
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
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-ocean-600" />
              <h2 className="text-lg font-semibold text-ocean-900">Location Info</h2>
            </div>
            <div className="space-y-2 text-ocean-800">
              <p>Ngamotu Beach, New Plymouth</p>
              <p>Taranaki, New Zealand</p>
              <p className="text-sm text-ocean-600">39.0556° S, 174.0452° E</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
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
                  />
                  <YAxis 
                    stroke="#0c4a6e"
                    fontSize={12}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip />
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