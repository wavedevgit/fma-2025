import styles from "./scroll-down.module.css";


const ScrollDown = ({
  className,
}:{
  className?: string,
}) => {
  return (
		<div className={`${styles.mouse} ${className}`}></div>
  )
}

export default ScrollDown
