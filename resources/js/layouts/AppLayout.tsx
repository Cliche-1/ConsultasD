import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {
    const { url } = usePage();

    const isTabActive = (path: string) => url.startsWith(path);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Tabs Header */}
                    <div className="flex border-b border-gray-200 bg-gray-50/50">
                        <Link
                            href="/consultas/dni"
                            className={`flex-1 text-center py-4 text-sm font-medium transition-colors ${
                                isTabActive('/consultas')
                                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Consultas
                        </Link>
                        <Link
                            href="/personas/create"
                            className={`flex-1 text-center py-4 text-sm font-medium transition-colors ${
                                isTabActive('/personas/create')
                                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Ingreso de Datos
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="p-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
