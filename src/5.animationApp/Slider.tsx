import { AnimatePresence, AnimationDefinition, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 34));
`
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`

const boxVariant = {
  entry: (isBack: boolean) => {
    return {
      x: isBack ? -500 : 500,
      opacity: 0,
      scale: 0
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: (isBack: boolean) => {
    return {
      x: isBack ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.4
      }
    }
  }
}

const AdvancedAnimation = () => {
  const [visible, setVisible] = useState(1)
  const [back, setBack] = useState(false)
  const [isCompletion, setCompletion] = useState(true)
  const boxRef = useRef(null)

  const nextSlide = () => {
    if (!isCompletion) return
    setBack(false)
    setVisible((prev) => (prev === 10 ? 10 : prev + 1))
  }
  const prevSlide = () => {
    if (!isCompletion) return
    setBack(true)
    setVisible((prev) => (prev === 1 ? 1 : prev - 1))
  }

  const onCompletion = (def: AnimationDefinition) => {
    if (def !== 'exit') {
      setCompletion(true)
    } else {
      setCompletion(false)
    }
  }

  return (
    <Wrapper>
      <AnimatePresence mode='popLayout' custom={back}>
        <Box
          onAnimationComplete={onCompletion}
          ref={boxRef}
          custom={back}
          variants={boxVariant}
          initial='entry'
          animate='center'
          exit='exit'
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevSlide}>prev</button>
      <button onClick={nextSlide}>next</button>
    </Wrapper>
  )
}

export default AdvancedAnimation
