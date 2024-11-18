import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { useState } from 'react';


const FilterComponent = ({ onFilter }: { onFilter: (filters: { month: string, year: string }) => void }) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleFilter = () => {
        if (year.length === 4 && month) {
            onFilter({ month, year });
        } else {
            alert('Please enter a valid year (4 digits) and select a month');
        }
    };

    return (
        <div className="flex space-x-2 ">
            <Select onValueChange={setMonth}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                    {/* Opciones de mes */}
                    {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {new Date(0, i).toLocaleString('es', { month: 'long' })}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={setYear}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                    {/* Opciones de año de 2024 a 2030 */}
                    {Array.from({ length: 2 }, (_, i) => (
                        <SelectItem key={2024 + i} value={String(2024 + i)}>
                            {2024 + i}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button onClick={handleFilter}>Buscar</Button>
        </div>
    );
};

export default FilterComponent;