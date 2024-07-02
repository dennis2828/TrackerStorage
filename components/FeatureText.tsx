import { CheckSquare } from "lucide-react"

const FeatureText = ({text}: {text: string}) => {
  return (
    <div className="flex items-center gap-1">
        <CheckSquare className="w-4 h-4 text-darkCyan" />
        <p className="font-semibold text-white text-sm text-nowrap">{text}</p>
    </div>
  )
}

export default FeatureText