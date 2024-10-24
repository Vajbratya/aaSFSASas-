'use client';

import { startTransition, useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/lib/auth';
import { updateAccount } from '@/app/(login)/actions';
import { ResendButton } from '@/components/ui/resend-button';

type ActionState = {
  error?: string;
  success?: string;
};

export default function GeneralPage() {
  const { user } = useUser();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    { error: '', success: '' }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  };

  return (
    <section className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#fafafa]">
          Configurações Gerais
        </h1>
      </div>

      <Card className="bg-[#000000] border border-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-[#fafafa]">Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-[#fafafa]">Nome</Label>
              <Input
                id="name"
                name="name"
                placeholder="Digite seu nome"
                defaultValue={user?.name || ''}
                required
                className="bg-[#1d1d1d] border-[#333333] text-[#fafafa] placeholder:text-[#666666] focus:border-[#333333] focus:ring-1 focus:ring-[#333333]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#fafafa]">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                defaultValue={user?.email || ''}
                required
                className="bg-[#1d1d1d] border-[#333333] text-[#fafafa] placeholder:text-[#666666] focus:border-[#333333] focus:ring-1 focus:ring-[#333333]"
              />
            </div>
            {state.error && (
              <p className="text-red-400 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-400 text-sm">{state.success}</p>
            )}
            <ResendButton
              type="submit"
              variant="default"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </ResendButton>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
