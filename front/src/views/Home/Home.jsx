import React from 'react'
import { ImgText } from '../../components/ImgText/ImgText'
import imagen from '../../images/10643-cropped-img.jpg'
import imagen2 from '../../images/DSC_5625-scaled.jpg'
import imagen3 from '../../images/image-tool-lambda.webp'
import imagen4 from '../../images/images.jpg'
import styles from './Home.module.css'

export default function Home () {
  return (
    <div className={styles.contPrinc}>
      <ImgText src={imagen} />
      <ImgText src={imagen2}/>
      <ImgText src={imagen3}/>
      <ImgText src={imagen4}/>
    </div>
  )
}
