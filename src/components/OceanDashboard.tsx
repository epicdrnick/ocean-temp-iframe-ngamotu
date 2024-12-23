import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Waves, MapPin, ThermometerSun, Sun, Home, Search, User } from "lucide-react";
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
    <div 
      className="min-h-screen bg-gradient-to-b from-[#1B4D89] to-[#7C9CBF] text-white p-4 sm:p-8 animate-fade-in"
      style={{
        backgroundImage: `url('/lovable-uploads/7ba81a09-0a3f-4b98-bbfd-b4fc032b58d0.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlend: 'overlay'
      }}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">Ngamotu Beach</h1>
          </div>
          <Sun className="w-10 h-10 text-yellow-300 animate-pulse" />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-3xl" />
          <Card className="p-6 bg-white/10 border-0 shadow-2xl relative overflow-hidden rounded-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <ThermometerSun className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Current Temperature</h2>
            </div>
            {isLoading ? (
              <Skeleton className="h-16 w-full bg-white/20" />
            ) : (
              <div className="space-y-4">
                <div className="text-6xl font-bold text-white">
                  {mockData[mockData.length - 1].temperature.toFixed(1)}°C
                </div>
                <p className="text-lg text-white/80">Perfect for a summer swim!</p>
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6 bg-white/10 border-0 shadow-2xl relative overflow-hidden rounded-3xl backdrop-blur-xl">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Location</h2>
          </div>
          <div className="space-y-3 text-white/80">
            <p className="text-lg font-medium">Ngamotu Beach, New Plymouth</p>
            <p>Taranaki, New Zealand</p>
            <p className="text-sm">39.0556° S, 174.0452° E</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/10 border-0 shadow-2xl relative overflow-hidden rounded-3xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-6">24-Hour Trend</h2>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full bg-white/20" />
          ) : (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#ffffff80"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff80"
                    fontSize={12}
                    domain={['auto', 'auto']}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                      color: 'white'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-md mx-auto flex justify-around">
            <button className="flex flex-col items-center text-white/80 hover:text-white">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-white/80 hover:text-white">
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Search</span>
            </button>
            <button className="flex flex-col items-center text-white/80 hover:text-white">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OceanDashboard;