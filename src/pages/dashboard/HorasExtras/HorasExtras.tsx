
import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import FilterComponent from "./FilterComponent"; // El componente de filtros
import supabase from "@/supabase/supabase.config";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


import FilterComponent from "./Filtro";


// Tipos de datos
interface HorasExtrasPorMes {
    fontanero: string | null;
    mes: string | null;
    total_horas_extras: number | null;
}

interface ChartData {
    fontanero: string | null;
    horas_extras: number | null;
}

// Configuración del gráfico
const chartConfig = {
    desktop: {
        label: "Horas Extras",
        color: "hsl(var(--chart-1))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export function HorasExtras() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [filters, setFilters] = useState({ month: '', year: '' });

    useEffect(() => {
        const fetchFilteredData = async () => {
            const { month, year } = filters;
            if (month && year) {
                const formattedDate = `${year}-${month}-01`;

                const { data, error } = await supabase
                    .from('horas_extras_por_mes')
                    .select('*')
                    .eq('mes', formattedDate);

                if (error) {
                    console.error("Error fetching data:", error);
                } else if (data) {
                    const formattedData = data.map((entry: HorasExtrasPorMes) => ({
                        fontanero: entry.fontanero ?? 'Desconocido',
                        horas_extras: entry.total_horas_extras ?? 0,
                    }));
                    setChartData(formattedData);
                }
            }
        };
        fetchFilteredData();
    }, [filters]);

    return (
        <Card  >
            {/* <CardHeader className="flex   "> */}
            <div className=" flex justify-center items-center p-4  ">
                <CardTitle className="text-sm sm:text-xs md:text-lg lg:text-xl pr-2">
                    Horas Extras
                </CardTitle>
                {/* <CardDescription>Horas extras de fontaneros filtradas por mes y año</CardDescription> */}
                <FilterComponent onFilter={setFilters} />
            </div>
            {/* </CardHeader> */}
            <hr className="pb-11" />
            <CardContent className="" >
                <ChartContainer config={chartConfig} className="h-full">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ right: 14, left: -60 }} // Ajuste de márgenes
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="fontanero"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value?.slice(0, 6)}
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="horas_extras"
                            layout="vertical"
                            fill="var(--color-desktop)"
                            radius={5}
                        >
                            <LabelList
                                dataKey="fontanero"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="horas_extras"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Datos de horas extras <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando horas extras trabajadas por fontaneros para el mes filtrado
                </div>
            </CardFooter> */}
        </Card>
    );
}
