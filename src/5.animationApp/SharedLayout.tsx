import { animate, AnimatePresence, AnimationDefinition, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 34));
`
const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`

const AdvancedAnimation = () => {
  const [clicked, setClicked] = useState(false)
  const toggleClicked = () => setClicked((isClicked) => !isClicked)
  return (
    <Wrapper onClick={toggleClicked}>
      <Box>{!clicked ? <Circle layoutId='circle' style={{ borderRadius: 50 }} /> : null}</Box>
      <Box>
        {clicked ? <Circle layoutId='circle' style={{ borderRadius: 0, scale: 2 }} transition={{ duration: 1, ease: 'linear' }} /> : null}
      </Box>
    </Wrapper>
  )
}

export default AdvancedAnimation
