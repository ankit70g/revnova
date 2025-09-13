"use client"
import { Button } from "@/components/ui/button";
import { LightningIcon } from "@/icons/LightningIcon";
import { User } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import PurpleIcon from "../PurpleIcon";

type Props = { user: User }

//TODO: Stripe Subscription, Assistant, User
const Header = ({ user }: Props) => {
    const pathname = usePathname()
    const router = useRouter()


    return (
        <div className="w-full px-4 pt-10 sticky top-0 z-10 flex
        justify-between items-center flex-wrap gap-4 bg-background">
            {pathname.includes('pipeline') ? (
                <Button className="bg-primary/10 border border-border rounded-xl"
                    variant={'outline'}
                    onClick={() => router.push('/webinar')}
                >
                    <ArrowLeft />Back to Webinars
                </Button>
            ) : (
                <div className="px-4 py-2 flex justify-center text-bold items-center rounded-xl
                bg-background border border-border text-primary capitalize">
                    {pathname.split('/')[1]}
                </div>
            )}
            {/* TODO: Stripe subscription and create webinar */}
            <div className="flex gap-6 items-center flex-wrap">
                <PurpleIcon>
                    <LightningIcon />
                </PurpleIcon>
            </div>
        </div>
    )
}
export default Header