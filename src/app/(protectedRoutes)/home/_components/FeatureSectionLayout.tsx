import { RightIcon } from "@/icons/RightIcon"
import Link from "next/link"
import React from "react"

type Props = {
  children: React.ReactNode
  heading: string
  link: string
  className?: string
}

const FeatureSectionLayout = ({
  children,
  heading,
  link,
  className
}: Props) => {
  return (
    <div
      className={`p-6 sm:p-8 flex items-center justify-between flex-col gap-8 border rounded-2xl border-border bg-background-10 
      ${className}`}
    >
      {children}
      <div className="w-full justify-between items-center flex flex-wrap gap-6">
        <h3 className="sm:w-[70%] font-semibold text-xl sm:text-2xl text-primary">
          {heading}
        </h3>
        <Link
          href={link}
          className="text-primary font-medium text-base flex items-center justify-center rounded-md opacity-70 hover:opacity-100 transition"
        >
          View <RightIcon className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}
export default FeatureSectionLayout
