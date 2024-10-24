import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe'
import { SubmitButton } from './submit-button'
import { checkoutAction } from '@/lib/payments/actions'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ])

  const basePlan = products.find((product) => product.name === 'Base')
  const plusPlan = products.find((product) => product.name === 'Plus')

  const basePrice = prices.find((price) => price.productId === basePlan?.id)
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id)

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto relative">
        {/* Animated gradient orbs in the background */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="text-center mb-20 relative">
          <h2 className="text-sm font-semibold text-blue-400 tracking-wide uppercase mb-3 animate-fade-in">Premium Access</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text animate-gradient">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            7 dias grátis em qualquer plano. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
          <PricingCard
            name={basePlan?.name || 'Base'}
            price={basePrice?.unitAmount || 19900}
            interval={basePrice?.interval || 'month'}
            trialDays={basePrice?.trialPeriodDays || 7}
            features={[
              "Até 200 laudos por mês",
              "Todos os tipos de laudos",
              "Suporte prioritário",
              "Acesso à API",
              "Exportação em múltiplos formatos",
              "Integração com PACS",
              "Backup automático",
              "Personalização de templates"
            ]}
            priceId={basePrice?.id}
            description="Ideal para clínicas e radiologistas individuais"
          />
          <PricingCard
            name={plusPlan?.name || 'Plus'}
            price={plusPrice?.unitAmount || 39900}
            interval={plusPrice?.interval || 'month'}
            trialDays={plusPrice?.trialPeriodDays || 7}
            features={[
              "Laudos ilimitados",
              "1 usuário por conta",
              "Suporte 24/7",
              "API sem limites",
              "Todos os recursos Pro",
              "Prioridade máxima no suporte",
              "Treinamento personalizado",
              "Consultoria dedicada"
            ]}
            priceId={plusPrice?.id}
            description="Para radiologistas que precisam de recursos ilimitados"
            popular
          />
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <p className="text-gray-300 text-sm">
              Promoção por tempo limitado
            </p>
          </div>
          <p className="text-gray-400 text-lg mt-6">
            Precisa de um plano personalizado?{' '}
            <a href="mailto:contato@laudos.ai" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  description,
  popular = false,
}: {
  name: string
  price: number
  interval: string
  trialDays: number
  features: string[]
  priceId?: string
  description: string
  popular?: boolean
}) {
  return (
    <div className={`
      relative rounded-2xl p-8 
      backdrop-blur-sm
      ${popular 
        ? 'bg-gradient-to-b from-blue-900/90 to-gray-900/90 border-2 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]' 
        : 'bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50'}
      transition-all duration-500 hover:transform hover:scale-[1.02]
      hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]
      group
    `}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
          MAIS POPULAR
        </div>
      )}

      <div className="h-full flex flex-col">
        <div>
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-white text-transparent bg-clip-text">{name}</h3>
          <p className="text-gray-400 mb-6">{description}</p>
          <div className="flex items-baseline mb-6 group-hover:scale-105 transition-transform duration-300">
            <span className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
              R${price / 100}
            </span>
            <span className="text-gray-400 ml-2 text-xl">/mês</span>
          </div>
          <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-blue-400"></span>
            {trialDays} dias de teste grátis
          </div>
        </div>

        <div className="flex-grow">
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start group/item">
                <Check className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <form action={checkoutAction}>
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton popular={popular} />
        </form>
      </div>
    </div>
  )
}
