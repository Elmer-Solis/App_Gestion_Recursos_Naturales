import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type FontaneroDetailItemProps = {
    label: string
    data: string
}


export default function FontaneroDetailItem({ label, data }: FontaneroDetailItemProps) {
    return (


        // <p className="font-bold mb-3 text-gray-700 uppercase">{label}:{''}
        <>

            <p className=" uppercase dark:text-white font-bold ">{label}:
                <span className="font-normal normal-case">{' '}{data}</span>
            </p>
            {/* </p> */}
        </>
    )
}
