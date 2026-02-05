import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import ConfirmModal from '@/components/ConfirmModal';
import { Persona } from '@/types/models';

interface Props {
    persona: Persona | null;
    filters: {
        dni?: string;
    };
}

export default function Search({ persona, filters }: Props) {
    const { data, setData, get, processing, errors } = useForm({
        dni: filters.dni || '',
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/consultas/dni', {
            preserveState: true,
        });
    };

    const handleDelete = () => {
        if (!persona) return;
        
        setIsDeleting(true);
        router.delete(`/personas/${persona.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setIsDeleteModalOpen(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Consulta por DNI" />
            <div className="p-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Consulta de Personas</h2>
                    <p className="text-sm text-gray-500">Ingrese el número de DNI para obtener la información registrada.</p>
                </div>

                <div className="mb-8">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                maxLength={8}
                                placeholder="DNI (8 dígitos)"
                                className={`w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
                                    errors.dni ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                                }`}
                                value={data.dni}
                                onChange={(e) => setData('dni', e.target.value.replace(/\D/g, ''))}
                            />
                            {errors.dni && <p className="text-red-500 text-xs font-medium mt-1">{errors.dni}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={processing || data.dni.length !== 8}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {processing ? 'Buscando...' : 'Consultar'}
                        </button>
                    </form>
                </div>

                {persona ? (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Información Encontrada</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase">DNI</p>
                                    <p className="text-lg font-bold text-gray-900">{persona.dni}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase">Nombres Completos</p>
                                    <p className="text-lg font-bold text-gray-900">{persona.nombres}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase">Apellido Paterno</p>
                                    <p className="text-lg font-bold text-gray-900">{persona.apellido_paterno}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase">Apellido Materno</p>
                                    <p className="text-lg font-bold text-gray-900">{persona.apellido_materno}</p>
                                </div>
                            </div>
                            <div className="bg-blue-50/50 rounded-lg p-4 grid grid-cols-3 gap-4 border border-blue-100 mb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase">Departamento</p>
                                    <p className="text-sm font-semibold text-blue-900">{persona.distrito?.provincia?.departamento?.nombre}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase">Provincia</p>
                                    <p className="text-sm font-semibold text-blue-900">{persona.distrito?.provincia?.nombre}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase">Distrito</p>
                                    <p className="text-sm font-semibold text-blue-900">{persona.distrito?.nombre}</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-4">
                                <Link
                                    href={`/personas/${persona.id}/edit`}
                                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                                >

                                    Editar
                                </Link>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : filters.dni ? (
                    <div className="bg-red-50 border border-red-100 p-6 rounded-xl text-center animate-in zoom-in duration-300">
                        <p className="text-red-800 font-medium">No se encontró información para el DNI: <span className="font-bold">{filters.dni}</span></p>
                        <p className="text-red-500 text-sm mt-1">Verifique el número e intente nuevamente.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-xl">
                        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="font-medium">Esperando consulta...</p>
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Eliminar Registro"
                message="¿Estás seguro de que deseas eliminar a esta persona? Esta acción no se puede deshacer."
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                processing={isDeleting}
            />
        </AppLayout>
    );
}
