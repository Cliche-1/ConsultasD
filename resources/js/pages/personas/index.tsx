import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import { Persona } from '@/types/models';

interface Props {
    personas: Persona[];
}

export default function Index({ personas }: Props) {
    return (
        <AppLayout>
            <Head title="Listado de Personas" />
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Listado General</h2>
                        <p className="text-sm text-gray-500">Gestión de todas las personas registradas en el sistema.</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">DNI</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombres</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Apellidos</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ubicación</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {personas.length > 0 ? (
                                personas.map((persona) => (
                                    <tr key={persona.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-gray-900">{persona.dni}</td>
                                        <td className="p-4 text-sm text-gray-600">{persona.nombres}</td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {persona.apellidoPaterno} {persona.apellidoMaterno}
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                                {persona.departamento?.distrito}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    href={`/personas/${persona.id}/edit`}
                                                    className="text-amber-600 hover:text-amber-700 text-sm font-bold transition-colors"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    href={`/personas/${persona.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-700 text-sm font-bold transition-colors"
                                                    onClick={() => confirm('¿Estás seguro de eliminar esta persona?')}
                                                >
                                                    Eliminar
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <p className="text-sm font-medium">No hay personas registradas aún.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
