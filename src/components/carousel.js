import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'


const Carousel = ({images}) => {
  let [position, setPosition] = useState(0)
  let [dragging, setDragging] = useState(false)
  let [touchStart, setTouchStart] = useState(0)
  let ref = useRef(null)
  let dragPos = useRef(0)
  

  let carouselStyle = {
    transform: `translateX(${position*100}%)`,
    transition: "all 220ms ease-in-out"
  }

  const handleLeft = () => {
    if (position < 0){
      setPosition(prev => prev + 1)
    }else{
      setPosition((images.length * -1) +1 )
    }
  }

  const handleRight = () => {
    if (position -2 >= images.length * -1){
      setPosition(prev => prev - 1)
    }else{
      setPosition(0)
    }
  }

  const handleMouseDown = (e) => {
      setDragging(true);
      dragPos.current = 0;
      if (e.type === "touchstart") setTouchStart(e.changedTouches[0].screenX)
  }
  useEffect(() => {
    ref.current.addEventListener("mousedown", handleMouseDown)
    ref.current.addEventListener("touchstart", handleMouseDown, { passive: true })
    return () => {
      ref.current.removeEventListener("mousedown", handleMouseDown)
      ref.current.removeEventListener("touchstart", handleMouseDown)
    }
  }, [handleMouseDown])
  
  const handleMouseUp = (e) => {
    if(dragging){
      setDragging(false)
      ref.current.childNodes[1].style.transition = `all 220ms ease-in-out`
      if(dragPos.current < 0) handleRight()
      else if (dragPos.current > 0) handleLeft()
    }
  }
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchend", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseUp])

  const handleMouseMove = (e) => {
    let x;
    if(e.type === "mousemove") x = e.movementX
    else if (touchStart > e.changedTouches[0].screenX){
      setTouchStart(prev => prev - 1)
      x = -8
    }
    else if (touchStart < e.changedTouches[0].screenX){
      setTouchStart(prev => prev + 1)
      x = 8
    }
    if(dragging){
      dragPos.current += x
      ref.current.childNodes[1].style.transition = `none`
      ref.current.childNodes[1].style.transform = `translateX(${dragPos.current / 6 + position*100}%)`
    }
  }
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("touchmove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchmove", handleMouseMove)
    }
  }, [handleMouseMove])
  
  return(
    <div className="carousel"  ref={ref} >
      <div className="carousel-controls">
        <button onClick={handleLeft} >
          <span title="Previous image" role="img">
            <FontAwesomeIcon icon={faAngleLeft} className="carousel-icon" />
          </span>
        </button>
        <button onClick={handleRight}>
          <span aria-label="Next image" role="img">
            <FontAwesomeIcon icon={faAngleRight} className="carousel-icon"/>
          </span>
        </button>
      </div>
      <div id="carousel-image-wrapper" className="carousel-image-wrapper noselect" style={carouselStyle}>
        {images.map(item => {
          return(
          <img key={item[1]} className="carousel-image noselect" src={item[0]} alt={item[1]} draggable="false"/>
          )
        })}
        </div>
    </div>
  )
}
export default Carousel