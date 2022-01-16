import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import type { Step } from '../api/Types'

interface LiveInstructionsProps {
    steps: Step[]
    isActive: boolean
    closeHandler: () => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const LiveInstructions: React.VFC<LiveInstructionsProps> = ({
    steps,
    isActive,
    closeHandler,
}) => {
    const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
    const [activeTimer, setActiveTimer] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number>(
        steps[0].duration ? steps[0].duration * 60 : 0
    )
    const isMobile = useMediaQuery('(max-width:600px)') // sm

    const getStep = (index: number) => steps[index].instruction

    const getPreviewStep = (index: number) => {
        return activeStepIndex + 1 === steps.length
            ? ''
            : `Volgende stap: ${getStep(index + 1)}`
    }

    const finishHandler = () => {
        setActiveStepIndex(0)
        closeHandler()
    }

    const proceedToNextStep = () => {
        const nextStepIndex = activeStepIndex + 1

        if (activeStepIndex + 1 === steps.length) {
            finishHandler()
        } else {
            setActiveStepIndex(nextStepIndex)

            if (steps[nextStepIndex].duration) {
                setCountdown(steps[nextStepIndex].duration * 60)
                setActiveTimer(true)
            } else {
                setActiveTimer(false)
            }
        }
    }

    const proceedToPreviousStep = () => {
        const prevStepIndex = activeStepIndex - 1

        if (steps[prevStepIndex]) {
            setActiveStepIndex(prevStepIndex)

            if (steps[prevStepIndex].duration) {
                setCountdown(steps[prevStepIndex].duration * 60)
                setActiveTimer(true)
            } else {
                setActiveTimer(false)
            }
        } else {
            finishHandler()
        }
    }

    return (
        <Dialog
            fullScreen
            open={isActive}
            onClose={closeHandler}
            TransitionComponent={Transition}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {!isMobile && (
                    <Box
                        sx={{
                            height: '100vh',
                            width: '30%',
                            backgroundColor: '#e9e9e9',
                            overflow: 'auto',
                        }}
                    >
                        <Timeline position="alternate">
                            {steps.map((step, i: number) => (
                                <TimelineItem key={i}>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            color={
                                                i === activeStepIndex
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                        />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        {step.instruction}
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Box>
                )}
                <Box
                    sx={{
                        height: '100vh',
                        minHeight: '-webkit-fill-available',
                        width: isMobile ? '100%' : '70%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '1',
                            fontSize: '2rem',
                            padding: '4rem',
                            textAlign: 'center',
                            fontFamily: ['Neuton', 'serif'].join(','),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {getStep(activeStepIndex)}
                        {activeTimer && (
                            <Box sx={{ mt: 5 }}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={countdown}
                                    colors={[
                                        '#004777',
                                        '#F7B801',
                                        '#A30000',
                                        '#A30000',
                                    ]}
                                    colorsTime={[7, 5, 2, 0]}
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            </Box>
                        )}
                    </Box>
                    {isMobile && activeStepIndex + 1 !== steps.length && (
                        <Box
                            sx={{
                                height: 'auto',
                                m: 2,
                                fontSize: '0.8rem',
                                lineHeight: '1rem',
                                display: 'flex',
                                alignItems: 'flex-end',
                            }}
                        >
                            {getPreviewStep(activeStepIndex)}
                        </Box>
                    )}
                    <Box
                        sx={{
                            height: isMobile ? '10vh' : '20vh',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Box
                            sx={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'solid 1px #666',
                                fontSize: '1.3rem',
                            }}
                            onClick={proceedToPreviousStep}
                        >
                            {activeStepIndex === 0 ? 'Sluiten' : 'Vorige Stap'}
                        </Box>

                        <Box
                            sx={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'solid 1px #666',
                                fontSize: '1.3rem',
                            }}
                            onClick={proceedToNextStep}
                        >
                            {activeStepIndex + 1 === steps.length
                                ? 'Sluiten'
                                : 'Volgende Stap'}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default LiveInstructions
