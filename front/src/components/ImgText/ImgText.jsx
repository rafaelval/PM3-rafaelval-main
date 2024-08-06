import React from 'react'
import styles from './ImgText.module.css'

export const ImgText = ({src}) => {
  return (
    <div className={styles.imgtextContainer}>
      <img src={src} alt="" />
      {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit libero rerum excepturi ea beatae modi dolor sunt. Deleniti, sit provident aliquid qui laborum, eius illo hic praesentium molestiae a cupiditate?</p> */}
    </div>
  )
}
