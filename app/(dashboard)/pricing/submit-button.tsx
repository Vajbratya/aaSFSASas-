'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ popular }: { popular?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`
        w-full py-6 rounded-xl font-semibold text-lg
        transition-all duration-500
        ${pending 
          ? 'bg-gray-700 text-gray-300' 
          : popular 
            ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white border border-blue-400/20'
            : 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white border border-gray-700'}
        shadow-[0_0_20px_rgba(59,130,246,0.15)]
        hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
        flex items-center justify-center
        group relative overflow-hidden
      `}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          Processando...
        </>
      ) : (
        <>
          {popular && <Sparkles className="absolute right-0 top-0 h-4 w-4 text-blue-200 opacity-50 animate-pulse" />}
          <span className="relative z-10 flex items-center gap-2">
            Começar agora
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </>
      )}
    </Button>
  );
}
