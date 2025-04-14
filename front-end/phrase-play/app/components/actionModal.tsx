
import { Dispatch, SetStateAction } from "react";




const ActionModal = ({ children, isOpen, onOpenChange }: { onOpenChange: Dispatch<SetStateAction<boolean>>, isOpen: boolean, children: React.ReactNode }) => {

  return (
    <>
      <div onClick={() => onOpenChange(false)} className={`${!isOpen && "hidden"} bg-black/40 fixed h-screen w-screen left-0 top-0`}>

      </div>
      <div className={`${!isOpen && "hidden"} fixed z-50 p-4 bg-white w-full max-w-lg flex justify-between flex-col rounded-md h-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
        {children}
      </div>
    </>

  )
}

export default ActionModal