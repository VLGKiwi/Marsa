import type { Metadata } from 'next'
import { VacancyView } from '@views/vacancy'

export const metadata: Metadata = {
  title: 'Vacancy',
  description: 'Legion Next.js template'
}

export default function Vacancy() {
  return <VacancyView />
}
