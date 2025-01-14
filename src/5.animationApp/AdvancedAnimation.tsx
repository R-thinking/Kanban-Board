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
  width: 100%;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`
const Grid = styled.div`
  display: grid;
  width: 50vw;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AdvancedAnimation = () => {
  const [id, setId] = useState<null | string>(null)

  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((num) => (
          <Box onClick={() => setId(String(num))} key={num} layoutId={String(num)} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          >
            <Box layoutId={id} style={{ width: 600, height: 400 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  )
}

export default AdvancedAnimation
