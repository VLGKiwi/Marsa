'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './faq.module.scss'
import { FaqProps } from './faq.types'
import { Point, TitleGradient } from '@/ui'
import { PointMob, PointTab } from '@/components'

const Faq: FC<FaqProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className);

  if (window.innerWidth >= 1440) {
    return (
      <div className={rootClassName}>
          <Point title={'С какими источниками вы работаете?'} text={'Плотно работаем с FB, Google Ads (PPC, UAC, KMC), ASO'} leftP={'50%'} topP={'50%'} />
          <Point title={'Есть ли у вас дизайнеры, как быстро выдаются крео?'} text={'Есть команда штатных моушен-дизайнеров (4 человека), в зависимости от сложности готовые крео выдаются от пары часов до 2-х дней'} leftP={'15%'} topP={'0%'} />
          <Point title={'Кто ищет офферы?'} text={'В штате компании есть опытный Bizdev, который поможет найти любой оффер под ваши требования и даст свои рекомендации, на что стоит обратить внимание, а также сделает все возможное, чтоб достать unlimited капу и увеличить ставку по офферу'} leftP={'70%'} topP={'10%'} />
          <Point title={'Кто занимается техническим сопровождением?'} text={'У нас в штате есть опытный IT-интегратор, который сопровождает технический процесс запуска РК на всех этапах'} leftP={'30%'} topP={'35%'} />
          <Point title={'Кто руководит баингом?'} text={'В каждом источнике трафика, есть свой Head – опытный специалист, который координирует свои команды. В каждой команде есть свой Team lead, который помогает сориентироваться в поиске связок, в выборе продукта и технических особенностях'} leftP={'60%'} topP={'0%'} />
          <Point title={'Что необходимо, чтобы попасть к вам в команду?'} text={'Для начала напиши нашему HR Варваре @var_marsa. Тебя пригласят на собеседование, по итогам которого у тебя будет шанс прийти к нам на тестовый пролив. После теста мы принимаем решение о дальнейшем трудоустройстве'} leftP={'25%'} topP={'5%'} />
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  } else if (window.innerWidth < 768) {
    return (
      <div className={rootClassName}>
        <PointMob />
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  } else if (window.innerWidth < 1440) {
    return (
      <div className={rootClassName}>
        <PointTab />
        <h2>
          <TitleGradient text="FAQ" />
        </h2>
      </div>
    )
  }
}

export default Faq
