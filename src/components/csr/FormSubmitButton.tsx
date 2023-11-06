"use client"
import { useFormStatus } from "react-dom"
import { ComponentProps } from "react"

type FormSubmitButtonProps = {
    children: React.ReactNode,classname?:string

} & ComponentProps<"button">
const FormSubmitButton = ({children,className,...props}:FormSubmitButtonProps) => {
    const {pending} = useFormStatus();
  return (
    <button {...props} disabled={pending} className={`btn btn-primary ${className}`} type="submit" >
        {pending && <span className="loading loading-dots loading-lg"/>}
        {children}</button>
  )
}

export default FormSubmitButton