import { FC } from 'react'
import classNames from 'classnames'

import styles from './vacancy.module.scss'
import { VacancyProps } from './vacancy.types'
import { Folder } from '@/modules/folder'
import { Buildim } from '@/modules/buildim'


const Vacancy: FC<VacancyProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const text: Array<string> = ['Тут у нас всё просто и честно устроено: даёшь результат — растёшь и двигаешься вперёд. Никаких бюрократий и жёстких правил ради правил — важен только результат, а не время на часах. Команда — свои ребята, активные и независимые, с которыми приятно не только работать, но и двигаться к общим целям.', 'Если ты, как и я, хочешь быть не просто дизайнером, медиабайером или тимлидом, а частью чего-то значимого и настоящего, тогда тебе точно сюда. Здесь можно воплощать идеи, которые увидят тысячи людей, и делать что-то действительно стоящее, а не просто «заниматься чем-то».', 'Давай созвонимся и обсудим всё без лишних формальностей? Я уверен, ты сможешь добиться многого, и это место станет для тебя настоящей возможностью. Жду твоего ответа!']

  const ps: Array<string> = ['С теплом,', 'Твой будущий коллега']

  return (
    <main className={rootClassName}>
      <Buildim />
      <Folder
        title={'Привет от команды MARSA!'}
        text={text}
        ps={ps}
      />
    </main>
  )
}

export default Vacancy
