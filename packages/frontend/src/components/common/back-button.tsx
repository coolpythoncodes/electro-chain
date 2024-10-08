import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    onClick: () => void
}

const BackButton = ({ onClick }: Props) => {
    return (
        <Button onClick={onClick} variant="ghost" className="flex items-center gap-x-2  p-0">
            <div className="border border-[#D0D5DD] rounded-[5px] h-9 w-9 flex items-center justify-center">
                <ArrowLeft />
            </div>
            <p className="text-base leading-[19px] font-semibold text-[#1B1C1E]">Back</p>
        </Button>
    )
}

export default BackButton