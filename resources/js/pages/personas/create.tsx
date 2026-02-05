import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Departamento } from '@/types/models';

interface Props {
    departamentos: Departamento[];
}

export default function Create({ departamentos }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        dni: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        distrito_id: '',
    });

    const [selectedDpto, setSelectedDpto] = useState('');
    const [selectedProv, setSelectedProv] = useState('');

    const uniqueDptos = useMemo(() => {
        return departamentos.map(d => d.nombre).sort();
    }, [departamentos]);

    const filteredProvs = useMemo(() => {
        if (!selectedDpto) return [];
        const dpto = departamentos.find(d => d.nombre === selectedDpto);
        return dpto?.provincias?.map(p => p.nombre).sort() || [];
    }, [selectedDpto, departamentos]);

    const filteredDistritos = useMemo(() => {
        if (!selectedProv) return [];
        const dpto = departamentos.find(d => d.nombre === selectedDpto);
        const prov = dpto?.provincias?.find(p => p.nombre === selectedProv);
        return prov?.distritos?.sort((a, b) => a.nombre.localeCompare(b.nombre)) || [];
    }, [selectedProv, selectedDpto, departamentos]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/personas');
    };

    return (
        <AppLayout>
            <Head title="Registrar Persona" />
            <div className="p-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Ingreso de Datos</h2>
                    <p className="text-sm text-gray-500">Complete la información para registrar una nueva persona.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">DNI</label>
                            <input
                                type="text"
                                maxLength={8}
                                placeholder="8 dígitos"
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
                                placeholder="Nombres completos"
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
                                placeholder="Primer apellido"
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.apellido_paterno ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.apellido_paterno}
                                onChange={(e) => setData('apellido_paterno', e.target.value)}
                            />
                            {errors.apellido_paterno && <p className="text-red-500 text-xs font-medium">{errors.apellido_paterno}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Apellido Materno</label>
                            <input
                                type="text"
                                placeholder="Segundo apellido"
                                className={`w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.apellido_materno ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.apellido_materno}
                                onChange={(e) => setData('apellido_materno', e.target.value)}
                            />
                            {errors.apellido_materno && <p className="text-red-500 text-xs font-medium">{errors.apellido_materno}</p>}
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
                                    {uniqueDptos.map((nombre) => (
                                        <option key={nombre} value={nombre}>{nombre}</option>
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
                                    {filteredProvs.map((nombre) => (
                                        <option key={nombre} value={nombre}>{nombre}</option>
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
                                        <option key={dist.id} value={dist.id}>{dist.nombre}</option>
                                    ))}
                                </select>
                                {errors.distrito_id && <p className="text-red-500 text-[10px] font-medium">{errors.distrito_id}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? 'Registrando...' : 'Registrar Persona'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
