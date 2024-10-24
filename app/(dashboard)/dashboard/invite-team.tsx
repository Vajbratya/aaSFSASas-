'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { inviteTeamMember } from '@/app/(login)/actions';
import { useUser } from '@/lib/auth';

type ActionState = {
  error?: string;
  success?: string;
};

export function InviteTeamMember() {
  const { user } = useUser();
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, { error: '', success: '' });

  return (
    <Card className="bg-gray-900/50 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Convidar Membro</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite o email"
              required
              disabled={!isOwner}
              className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
          </div>
          <div>
            <Label className="text-white">Função</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member" className="text-gray-300">Membro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner" className="text-gray-300">Proprietário</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && (
            <p className="text-red-400 text-sm">{inviteState.error}</p>
          )}
          {inviteState?.success && (
            <p className="text-green-400 text-sm">{inviteState.success}</p>
          )}
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Convidando...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Convidar Membro
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-sm text-gray-400">
            Você precisa ser proprietário da equipe para convidar novos membros.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
