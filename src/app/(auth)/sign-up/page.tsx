"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { z } from "zod";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })

    const onSubmit = ({
        email,
        password,
    }: TAuthCredentialsValidator) => {
        //send data to the server
    }

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20" />
                        <h1 className="text-2xl font-bold">
                            Crie sua conta
                        </h1>

                        <Link className={buttonVariants({
                            variant: "link",
                            className: "gap-1.5"
                        })}
                            href="/sign-in">
                            Já tem uma conta? Faça login
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        {...register("email")}
                                        className={cn({
                                            'focus-visible:ring-red-500': errors.email,
                                        })}
                                        placeholder="Digite seu email"
                                    />
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor='password'>Senha</Label>
                                    <Input
                                        {...register("password")}
                                        className={cn({
                                            'focus-visible:ring-red-500': errors.password,
                                        })}
                                        placeholder="Digite sua senha"
                                    />
                                </div>

                                <Button>Registre-se</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Page;

function useForm<T>(arg0: { resolver: any; }): { register: any; handleSubmit: any; formState: { errors: any; }; } {
    throw new Error("Function not implemented.");
}
function zodResolver(AuthCredentialsValidator: z.ZodObject<{ email: z.ZodString; password: z.ZodString; }, "strip", z.ZodTypeAny, { email: string; password: string; }, { email: string; password: string; }>): any {
    throw new Error("Function not implemented.");
}

