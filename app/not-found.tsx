import Link from 'next/link';
import { CircleIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-black text-white">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <CircleIcon className="size-12 text-orange-500" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Página Não Encontrada
        </h1>
        <p className="text-base text-gray-400">
          A página que você está procurando pode ter sido removida, teve seu
          nome alterado ou está temporariamente indisponível.
        </p>
        <Link
          href="/"
          className="max-w-48 mx-auto flex justify-center py-2 px-4 border border-white/10 rounded-full shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
