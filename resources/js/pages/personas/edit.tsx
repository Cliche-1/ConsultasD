import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Persona, Departamento } from '@/types/models';

interface Props {
    persona: Persona;
    departamentos: Departamento[];
}

export default function Edit({ persona, departamentos }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        dni: persona.dni,
        nombres: persona.nombres,
        apellidoPaterno: persona.apellidoPaterno,
        apellidoMaterno: persona.apellidoMaterno,
        distrito_id: persona.distrito_id.toString(),
    });

    const [selectedDpto, setSelectedDpto] = useState(persona.departamento?.departamento || '');
    const [selectedProv, setSelectedProv] = useState(persona.departamento?.provincia || '');

    const uniqueDptos = useMemo(() => {
        return [...new Set(departamentos.map((d) => d.departamento))].sort();
    }, [departamentos]);

    const filteredProvs = useMemo(() => {
        if (!selectedDpto) return [];
        const provs = departamentos
            .filter((d) => d.departamento === selectedDpto)
            .map((d) => d.provincia);
        return [...new Set(provs)].sort();
    }, [selectedDpto, departamentos]);

    const filteredDistritos = useMemo(() => {
        if (!selectedProv) return [];
        return departamentos
            .filter((d) => d.departamento === selectedDpto && d.provincia === selectedProv)
            .sort((a, b) => a.distrito.localeCompare(b.distrito));
    }, [selectedProv, selectedDpto, departamentos]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/personas/${persona.id}`);
    };

    return (
        <AppLayout>
            <Head title="Editar Persona" />
            <div className="p-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Editar Registro</h2>
                        <p className="text-sm text-gray-500">Actualice la información de la persona seleccionada.</p>
                    </div>
                    <Link href="/personas" className="text-sm text-blue-600 hover:underline font-medium">
                        Cancelar y Volver
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">DNI</label>
                            <input
                                type="text"
                                maxLength={8}
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.dni ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.dni}
                                onChange={(e) => setData('dni', e.target.value.replace(/\D/g, ''))}
                            />
                            {errors.dni && <p className="text-red-500 text-xs font-medium">{errors.dni}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Nombres</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.nombres ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.nombres}
                                onChange={(e) => setData('nombres', e.target.value)}
                            />
                            {errors.nombres && <p className="text-red-500 text-xs font-medium">{errors.nombres}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Apellido Paterno</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.apellidoPaterno ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.apellidoPaterno}
                                onChange={(e) => setData('apellidoPaterno', e.target.value)}
                            />
                            {errors.apellidoPaterno && <p className="text-red-500 text-xs font-medium">{errors.apellidoPaterno}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Apellido Materno</label>
                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.apellidoMaterno ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.apellidoMaterno}
                                onChange={(e) => setData('apellidoMaterno', e.target.value)}
                            />
                            {errors.apellidoMaterno && <p className="text-red-500 text-xs font-medium">{errors.apellidoMaterno}</p>}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Ubicación Geográfica</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Departamento</label>
                                <select
                                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 outline-none"
                                    value={selectedDpto}
                                    onChange={(e) => {
                                        setSelectedDpto(e.target.value);
                                        setSelectedProv('');
                                        setData('distrito_id', '');
                                    }}
                                >
                                    <option value="">Seleccione</option>
                                    {uniqueDptos.map((dpto) => (
                                        <option key={dpto} value={dpto}>{dpto}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Provincia</label>
                                <select
                                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                    value={selectedProv}
                                    disabled={!selectedDpto}
                                    onChange={(e) => {
                                        setSelectedProv(e.target.value);
                                        setData('distrito_id', '');
                                    }}
                                >
                                    <option value="">Seleccione</option>
                                    {filteredProvs.map((prov) => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase">Distrito</label>
                                <select
                                    className={`w-full p-2.5 bg-white border rounded-lg shadow-sm focus:ring-2 outline-none disabled:bg-gray-100 disabled:text-gray-400 ${
                                        errors.distrito_id ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                    }`}
                                    value={data.distrito_id}
                                    disabled={!selectedProv}
                                    onChange={(e) => setData('distrito_id', e.target.value)}
                                >
                                    <option value="">Seleccione</option>
                                    {filteredDistritos.map((dist) => (
                                        <option key={dist.id} value={dist.id}>{dist.distrito}</option>
                                    ))}
                                </select>
                                {errors.distrito_id && <p className="text-red-500 text-[10px] font-medium">{errors.distrito_id}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Actualizando...' : 'Actualizar Información'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
