import type { Metadata } from 'next'
import { VacancyView } from '@views/vacancy'

export const metadata: Metadata = {
  title: 'Marsa - Careers',
  description: 'Careers page'
}

export default function Vacancy() {
  return <VacancyView />
}
