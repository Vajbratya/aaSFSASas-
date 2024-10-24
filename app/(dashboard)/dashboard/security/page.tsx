'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Trash2, Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';
import { updatePassword, deleteAccount } from '@/app/(login)/actions';

type ActionState = {
  error?: string;
  success?: string;
};

export default function SecurityPage() {
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    ActionState,
    FormData
  >(updatePassword, { error: '', success: '' });

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    ActionState,
    FormData
  >(deleteAccount, { error: '', success: '' });

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // If you call the Server Action directly, it will automatically
    // reset the form. We don't want that here, because we want to keep the
    // client-side values in the inputs. So instead, we use an event handler
    // which calls the action. You must wrap direct calls with startTranstion.
    // When you use the `action` prop it automatically handles that for you.
    // Another option here is to persist the values to local storage. I might
    // explore alternative options.
    startTransition(() => {
      passwordAction(new FormData(event.currentTarget));
    });
  };

  const handleDeleteSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    startTransition(() => {
      deleteAction(new FormData(event.currentTarget));
    });
  };

  return (
    <section className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Segurança
        </h1>
      </div>

      <Card className="bg-gray-900/50 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <Label htmlFor="current-password" className="text-white">Senha Atual</Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={100}
                className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-white">Nova Senha</Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-white">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                maxLength={100}
                className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>
            {passwordState.error && (
              <p className="text-red-400 text-sm">{passwordState.error}</p>
            )}
            {passwordState.success && (
              <p className="text-green-400 text-sm">{passwordState.success}</p>
            )}
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200"
              disabled={isPasswordPending}
            >
              {isPasswordPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Atualizar Senha
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Excluir Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-4">
            A exclusão da conta é irreversível. Por favor, proceda com cautela.
          </p>
          <form onSubmit={handleDeleteSubmit} className="space-y-4">
            <div>
              <Label htmlFor="delete-password" className="text-white">Confirmar Senha</Label>
              <Input
                id="delete-password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
            </div>
            {deleteState.error && (
              <p className="text-red-400 text-sm">{deleteState.error}</p>
            )}
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Conta
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
