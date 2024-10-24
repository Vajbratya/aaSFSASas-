'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember } from '@/app/(login)/actions';
import { InviteTeamMember } from './invite-team';
import Link from 'next/link';
import { ResendButton } from '@/components/ui/resend-button';

type ActionState = {
  error?: string;
  success?: string;
};

export function Settings({ teamData }: { teamData: TeamDataWithMembers }) {
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, { error: '', success: '' });

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  return (
    <section className="flex-1 space-y-6">
      <h1 className="text-2xl font-semibold text-[#fafafa]">Configurações da Equipe</h1>
      
      <Card className="bg-[#000000] border border-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-[#fafafa]">Assinatura da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium text-[#fafafa]">
                  Plano Atual: {teamData.planName || 'Gratuito'}
                </p>
                <p className="text-sm text-[#888888]">
                  {teamData.subscriptionStatus === 'active'
                    ? 'Cobrança mensal'
                    : teamData.subscriptionStatus === 'trialing'
                      ? 'Período de teste'
                      : 'Sem assinatura ativa'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <ResendButton type="submit" variant="default">
                  Gerenciar Assinatura
                </ResendButton>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#000000] border border-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-[#fafafa]">Membros da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1d1d1d] border border-[#333333]">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`/api/avatar/${member.user.id}`}
                      alt={getUserDisplayName(member.user)}
                    />
                    <AvatarFallback className="bg-[#333333] text-[#fafafa]">
                      {getUserDisplayName(member.user)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#fafafa]">
                      {getUserDisplayName(member.user)}
                    </p>
                    <p className="text-sm text-[#888888] capitalize">
                      {member.role}
                    </p>
                  </div>
                </div>
                {index > 1 ? (
                  <form action={removeAction}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <ResendButton
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={isRemovePending}
                    >
                      {isRemovePending ? 'Removendo...' : 'Remover'}
                    </ResendButton>
                  </form>
                ) : null}
              </li>
            ))}
          </ul>
          {removeState?.error && (
            <p className="text-red-400 mt-4">{removeState.error}</p>
          )}
        </CardContent>
      </Card>

      <InviteTeamMember />

      <Card className="bg-[#000000] border border-[#1d1d1d]">
        <CardHeader>
          <CardTitle className="text-[#fafafa]">Gerador de Laudos</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href="/radiology-report-generator" passHref>
            <ResendButton variant="default">
              Ir para o Gerador de Laudos
            </ResendButton>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
