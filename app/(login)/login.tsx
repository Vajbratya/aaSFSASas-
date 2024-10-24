'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from 'components/ui/button'; // see below for file content
import { Input } from 'components/ui/input'; // see below for file content
import { Label } from 'components/ui/label'; // see below for file content
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from 'lib/auth/middleware'; // see below for file content

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#7CFFD4]/20 via-transparent to-orange-500/20 opacity-50 animate-gradient" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#7CFFD4]/30 rounded-full filter blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-orange-500/20 rounded-full filter blur-[128px] animate-pulse delay-1000" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex flex-col items-center">
          {/* Your animated SVG logo */}
          <div className="w-32 h-32 mb-8">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter drop-shadow-[0_0_8px_rgba(124,255,212,0.5)]"
            >
              <use href="/LOGOLAUDAI.svg#logo-clip" />
            </svg>
          </div>
          <h2 className="text-center text-4xl font-bold text-white mb-3 tracking-tight">
            {mode === 'signin' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>
          <p className="text-center text-gray-400 text-sm max-w-sm">
            {mode === 'signin' 
              ? 'Entre para continuar usando o Laudos.ai'
              : 'Comece a usar o Laudos.ai agora mesmo'}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-black/40 backdrop-blur-xl py-8 px-10 shadow-2xl ring-1 ring-white/10 rounded-2xl relative overflow-hidden group">
          {/* Animated border gradient */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#7CFFD4]/50 via-orange-500/50 to-[#7CFFD4]/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-[1px] bg-black/90 rounded-2xl z-0" />
          
          <form className="space-y-6 relative z-10" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            
            {mode === 'signup' && (
              <>
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-white/90">
                    Nome Completo
                  </Label>
                  <div className="mt-1 relative group">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                      placeholder="Dr. João Silva"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="crm" className="block text-sm font-medium text-white/90">
                    CRM
                  </Label>
                  <div className="mt-1 relative group">
                    <Input
                      id="crm"
                      name="crm"
                      type="text"
                      required
                      maxLength={20}
                      className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                      placeholder="12345-SP"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialty" className="block text-sm font-medium text-white/90">
                    Especialidade
                  </Label>
                  <div className="mt-1 relative group">
                    <select
                      id="specialty"
                      name="specialty"
                      required
                      className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                    >
                      <option value="" className="bg-black text-white">Selecione uma especialidade</option>
                      <option value="radiologia" className="bg-black text-white">Radiologia</option>
                      <option value="radiologia_intervencionista" className="bg-black text-white">Radiologia Intervencionista</option>
                      <option value="diagnostico_imagem" className="bg-black text-white">Diagnóstico por Imagem</option>
                      <option value="medicina_nuclear" className="bg-black text-white">Medicina Nuclear</option>
                      <option value="outro" className="bg-black text-white">Outro</option>
                    </select>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-white/90">
                    Telefone
                  </Label>
                  <div className="mt-1 relative group">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={20}
                      className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                      placeholder="(11) 99999-9999"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                E-mail
              </Label>
              <div className="mt-1 relative group">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={50}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                  placeholder="seu@email.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-white/90"
              >
                Senha
              </Label>
              <div className="mt-1 relative group">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  required
                  minLength={8}
                  maxLength={100}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                  placeholder="••••••••"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            {state?.error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {state.error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#7CFFD4] to-[#7CFFD4]/80 hover:from-[#7CFFD4]/90 hover:to-[#7CFFD4]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7CFFD4] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#7CFFD4]/20"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Carregando...
                </>
              ) : mode === 'signin' ? (
                'Entrar'
              ) : (
                'Criar conta'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">
                  {mode === 'signin' ? 'Novo no Laudos.ai?' : 'Já tem uma conta?'}
                </span>
              </div>
            </div>

            <Link
              href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                redirect ? `?redirect=${redirect}` : ''
              }${priceId ? `&priceId=${priceId}` : ''}`}
              className="w-full flex justify-center py-2.5 px-4 border border-[#7CFFD4]/20 rounded-xl text-sm font-medium text-white bg-[#7CFFD4]/5 hover:bg-[#7CFFD4]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7CFFD4] transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
            >
              <span className="relative z-10">
                {mode === 'signin' ? 'Criar uma nova conta' : 'Entrar com conta existente'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
