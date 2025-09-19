import { useWebinarStore } from "@/store/useWebinarStore";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createWebinar } from "@/actions/webinar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Step = {
    id: string
    title: string
    description: string
    component: React.ReactNode
}

type Props = {
    steps: Step[]
    onComplete: (id: string) => void
}

const MultiStepForm = ({ steps, onComplete }: Props) => {
    const {
        formData,
        validateStep,
        isSubmitting,
        setSubmitting,
        setModalOpen
    } = useWebinarStore()

    const router = useRouter()

    const [currentStepIndex, setcurrentStepIndex] = useState(0)
    const [completeSteps, setCompletedSteps] = useState<string[]>([])
    const [validationError, setvalidationError] = useState<string | null>(null)

    const currentStep = steps[currentStepIndex]
    const isFirstStep = currentStepIndex === 0
    const isLastStep = currentStepIndex === steps.length - 1

    const handleBack = () => {
        if (isFirstStep) {
            setModalOpen(false)
        } else {
            setcurrentStepIndex(currentStepIndex - 1)
            setvalidationError(null)
        }
    }

    const handleNext = async () => {
        setvalidationError(null)
        const isValid = validateStep(currentStep.id as keyof typeof formData)

        if (!isValid) {
            setvalidationError('Please fill in all required fields')
            return
        }
        if (!completeSteps.includes(currentStep.id)) {
            setCompletedSteps([...completeSteps, currentStep.id])
        }
        if (isLastStep) {
            try {
                setSubmitting(true)
                const result = await createWebinar(formData)
                if (result.status === 200 && result.webinarId) {
                    toast.success('Your webinar has been created successfully.')
                    onComplete(result.webinarId)
                } else {
                    toast.error(
                        result.message || 'Your webinar has not been created successfully'
                    )
                    setvalidationError(result.message)
                }
                router.refresh()
            } catch (error) {
                console.log('Error creating webinar:', error)
                toast.success('Failed to create webinar. Please try again.')
                setvalidationError('Failed to create webinar. Please try again.')
            } finally {
                setSubmitting(false)
            }
        } else {
            setcurrentStepIndex(currentStepIndex + 1)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center
        bg-[#27272A]/20 border border-border rounded-3xl overflow-hidden 
            w-full max-w-6xl mx-auto backdrop-blur-[106px]">
            {/* Parent flex container with min height */}
            <div className="flex items-center justify-start w-full min-h-[500px]">
                {/* Left panel */}
                <div className="w-full md:w-1/3 p-6 flex flex-col h-full overflow-hidden">
                    {/* Steps container: vertically centered */}
                    <div className="flex flex-col flex-grow justify-center space-y-6 overflow-hidden">
                        {steps.map((step, index) => {
                            const isCompleted = completeSteps.includes(step.id)
                            const isCurrent = index === currentStepIndex
                            const isPast = index < currentStepIndex
                            return (
                                <div key={step.id} className="relative">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-shrink-0">
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    backgroundColor:
                                                        isCurrent || isCompleted
                                                            ? 'rgb(147, 51, 234)'
                                                            : 'rgb(31, 41, 55)',
                                                    scale: [isCurrent && !isCompleted ? 0.8 : 1, 1],
                                                    transition: { duration: 0.3 },
                                                }}
                                                className="flex items-center justify-center w-8 h-8 rounded-full z-10"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isCompleted ? (
                                                        <motion.div
                                                            key="check"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Check className="w-5 h-5 text-white" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="number"
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.5 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-white"
                                                        >
                                                            <Check className="w-5 h-5 text-white/50" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                            {index < steps.length - 1 && (
                                                <div className="absolute top-8 left-4 w-0.5 h-16 bg-gray-700 overflow-hidden">
                                                    <motion.div
                                                        initial={{
                                                            height: isPast || isCompleted ? '100%' : '0%',
                                                        }}
                                                        animate={{
                                                            height: isPast || isCompleted ? '100%' : '0%',
                                                            backgroundColor: 'rgb(147, 51, 234)',
                                                        }}
                                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-1 flex-1 min-w-0 overflow-hidden">
                                            <motion.h3
                                                animate={{
                                                    color:
                                                        isCurrent || isCompleted ? 'rgb(255, 255, 255)' : 'rgb(156, 163, 175)',
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="font-medium truncate"
                                            >
                                                {step.title}
                                            </motion.h3>
                                            <p className="text-sm text-gray-500 break-words">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* Cancel / Back button wrapper to prevent stretching */}
                    <div className="mt-auto self-start">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className={cn(
                                'border-gray-700 text-white hover:bg-gray-800 w-auto',
                                isFirstStep && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            {isFirstStep ? 'Cancel' : 'Back'}
                        </Button>
                    </div>
                </div>

                {/* Separator */}
                <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-3/4 ml-6"
                />

                {/* Right panel */}
                <div className="w-full md:w-2/3 flex flex-col h-full p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col justify-center flex-grow pt-10 mb-6"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {currentStep.title}
                            </h2>
                            <p className="text-gray-400 mb-6">
                                {currentStep.description}
                            </p>
                            {/* Render the current step component */}
                            {currentStep.component}

                            {/* Validation error message */}
                            {validationError && (
                                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md flex items-start gap-2 text-red-300">
                                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <p>{validationError}</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    {/* Next / Complete button at bottom-right */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleNext}
                            disabled={isSubmitting}
                        >
                            {isLastStep ? (
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Complete'
                                )
                            ) : (
                                'Next'
                            )}
                            {!isLastStep && <ChevronRight className="ml-1 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiStepForm