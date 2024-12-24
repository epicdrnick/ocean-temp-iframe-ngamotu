import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ThermometerSun, MapPin, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface TemperatureData {
  temperature: number;
  time: string;
}

interface StormGlassResponse {
  hours: Array<{
    time: string;
    waterTemperature: {
      sg: number;
    };
  }>;
}

const STORMGLASS_ENDPOINT = 'https://api.stormglass.io/v2/weather/point';
const NGAMOTU_LAT = -39.0556;
const NGAMOTU_LONG = 174.0452;

const OceanDashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["oceanTemp"],
    queryFn: async () => {
      try {
        const response = await fetch('/api/temperature');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return response.json();
      } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
      }
    },
    refetchInterval: 1000 * 60 * 60 * 2.4, // Fetch every 2.4 hours (10 times per day)
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch ocean temperature data. Please check your configuration.",
      });
    }
  }, [error, toast]);

  const currentTemp = data?.current?.temperature || 20;
  const historyData = data?.history || Array.from({ length: 24 }, (_, i) => ({
    temperature: 20 + Math.random() * 2,
    time: `${i}:00`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-600 to-ocean-300 text-white p-4 sm:p-8 animate-fade-in">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">Ngamotu Beach</h1>
          </div>
          <Sun className="w-10 h-10 text-yellow-300 animate-pulse" />
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-xl border-0 shadow-lg relative overflow-hidden rounded-3xl hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <ThermometerSun className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Current Temperature</h2>
          </div>
          {isLoading ? (
            <Skeleton className="h-16 w-full bg-white/20" />
          ) : (
            <div className="space-y-4">
              <div className="text-6xl font-bold text-white">
                {currentTemp.toFixed(1)}°C
              </div>
              <p className="text-lg text-white/80">Perfect for a summer swim!</p>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-xl border-0 shadow-lg relative overflow-hidden rounded-3xl hover:bg-white/20 transition-all duration-300">
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

        <Card className="p-6 bg-white/10 backdrop-blur-xl border-0 shadow-lg relative overflow-hidden rounded-3xl hover:bg-white/20 transition-all duration-300">
          <h2 className="text-xl font-semibold text-white mb-6">24-Hour Trend</h2>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full bg-white/20" />
          ) : (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
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
      </div>
    </div>
  );
};

export default OceanDashboard;
